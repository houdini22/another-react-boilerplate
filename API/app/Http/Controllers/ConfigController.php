<?php

namespace App\Http\Controllers;

use App\Events\ConfigChanged;
use App\Models\Config;
use App\Models\File;
use App\Models\Log;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ConfigController extends Controller
{
    public function getGet(Request $request)
    {
        $user = User::getFromRequest($request);

        $result = [];
        $configs = Config::orderBy('key', 'asc')
            ->with('file')
            ->get();

        foreach ($configs as $config) {
            $result[] = $config->toArray();
        }

        return $this->responseOK($result);
    }
    public function postEdit(Request $request)
    {
        $user = User::getFromRequest($request);

        $config = $request->post('config');

        $result = [];

        foreach ($config as $c) {
            $model = Config::where('key', '=', $c['key'])
                ->with('file')
                ->first();
            if ($model) {
                $model->value = $c['value'];
                $model->model_type = Arr::get($c, 'model_type');
                $model->save();

                Log::add($user, 'cms.settings.edit', [
                    'request' => $request,
                    'model' => $model
                ]);

                $arr = $model->toArray();

                if (Arr::get($c, 'model_type') === 'file') {
                    $arr['value'] = File::find($c['value'])->toArray();
                }

                $result[] = $arr;
            }
        }

        broadcast(new ConfigChanged($result));

        return $this->responseOK($result);
    }
}
