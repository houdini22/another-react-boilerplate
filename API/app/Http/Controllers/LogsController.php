<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LogsController extends Controller
{
    public function getList(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $filters = $request->get('filters');

        $query = Log::with('user')
            ->where(function ($query) use ($filters) {
                if (!empty($filters['user'])) {
                    if ($filters['user'] !== 'none') {
                        $query->whereHas('user', function($query) use ($filters) {
                            $query->where('name', '=', $filters['user']);
                        });
                    } else {
                        $query->whereDoesntHave('user');
                    }
                }
            })
            ->where(function ($query) use ($filters) {
                if (!empty($filters['model_name'])) {
                    $query->where('model_class_name', '=', $filters['model_name']);
                }
            })
            ->where(function ($query) use ($filters) {
                if (!empty($filters['type'])) {
                    $query->where('type', '=', $filters['type']);
                }
            })
            ->orderBy(empty($filters['order_by']) ? 'id' : $filters['order_by'], empty($filters['order_direction']) ? 'desc' : $filters['order_direction']);

        /*if (!empty($filters['roles'])) {
            $query = $query->whereHas('roles', function ($query) use ($filters) {
                if (!empty($filters['roles'])) {
                    $query->whereIn('id', $filters['roles']);
                }
            });
        }

        if (!empty($filters['has_users'])) {
            if ($filters['has_users'] === 'yes') {
                $query = $query->whereHas('users');
            } else if ($filters['has_users'] === 'no') {
                $query = $query->whereDoesntHave('users');
            }
        }

        if (!empty($filters['has_roles'])) {
            if ($filters['has_roles'] === 'yes') {
                $query = $query->whereHas('roles');
            } else if ($filters['has_roles'] === 'no') {
                $query = $query->whereDoesntHave('roles');
            }
        }

        if (!empty($filters['user'])) {
            $query = $query->whereHas('users', function ($query) use ($filters) {
                if (!empty($filters['user'])) {
                    $query->where('name', '=', $filters['user']);
                }
            });
        }*/

        $logs = $query->paginate(empty($filters['items_per_page']) ? 10000 : $filters['items_per_page']);

        return response()->json([
            'data' => $logs->toArray(),
        ]);
    }

    public function getData(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }


        $users = collect(Log::with('user')->whereHas('user')->get()->toArray())->groupBy('user.name');

        $models = collect(Log::whereNotNull('model_class_name')->orderBy('model_class_name', 'asc')->get()->toArray())->groupBy('model_class_name');

        $types = collect(Log::whereNotNull('type')->orderBy('type', 'asc')->get()->toArray())->unique('type')->groupBy('type');

        return $this->responseOK([
            'data' => [
                'users' => $users->toArray(),
                'models' => $models->toArray(),
                'types' => $types->toArray(),
            ]
        ]);
    }
}
