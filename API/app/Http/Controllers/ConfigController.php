<?php

namespace App\Http\Controllers;

use App\Events\ConfigChanged;
use App\Models\Config;
use App\Models\Log;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ConfigController extends Controller
{
    public function getGet(Request $request) {
        $user = User::getFromRequest($request);

        $configs = Config::orderBy('key', 'asc')->get();

        return $this->responseOK($configs);
    }
    public function postEdit(Request $request) {
        $user = User::getFromRequest($request);

        $config = $request->post('config');

        foreach ($config as $c) {
            $model = Config::where('key', '=', $c['key'])->first();
            if ($model) {
                $model->value = $c['value'];
                $model->save();

                Log::add($user, 'cms.settings.edit', [
                    'request' => $request,
                    'model' => $model
                ]);
            }
        }

        broadcast(new ConfigChanged($config));

        return $this->responseOK([
            'config' => $config
        ]);
    }
}
