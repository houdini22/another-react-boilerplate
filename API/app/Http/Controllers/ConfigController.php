<?php

namespace App\Http\Controllers;

use App\Models\Config;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ConfigController extends Controller
{
    public function getGet(Request $request) {
        $user = User::getFromRequest($request);

        $configs = Config::orderBy('key', 'asc')->get();
        $result = [];

        foreach ($configs as $c) {
            $value = NULL;
            switch ($c->type) {
                case 'number':
                    $value = NAN;
                    break;

                case 'string':
                    $value = "";
                    break;

                case "object":
                case "array":
                    $value = [];

                default:
                    break;
            }
            if ($c->value) {
                $value = $c->value;
            }
            Arr::set($result, $c->key, $value);
        }

        return $this->responseOK($result);
    }
}
