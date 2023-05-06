<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class LogsController extends Controller
{
    public function getList(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $filters = $request->get('filters');

        $query = Log::with('user')
            ->where(function ($query) use ($filters) {
                if (!empty($filters['user'])) {
                    if ($filters['user'] !== 'none') {
                        $query->where('user_id', '=', $filters['user']);
                    } else {
                        $query->where('user_id', '=', 0);
                    }
                }
            })
            ->where(function ($query) use ($filters) {
                if (!empty($filters['model_name'])) {
                    if ($filters['model_name'] === "none") {
                        $query->whereNull('model_class_name');
                    } else {
                        $query->where('model_class_name', '=', $filters['model_name']);
                    }
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
        $user = $this->getUserFromRequest($request);

        $users = Log::with('user')->select(
            [
                DB::raw('(SELECT COUNT(*) as count FROM logs as l WHERE l.user_id = logs.user_id) as count'),
                'logs.user_id'
            ]
        )
            ->distinct()
            ->get();

        $models = Log::select(
            [
                DB::raw('(SELECT COUNT(*) as count FROM logs as l WHERE
                IF(
                    ISNULL(logs.model_class_name), ISNULL(l.model_class_name), l.model_class_name = logs.model_class_name)
                ) as count'),
                'logs.model_class_name'
            ]
        )
            ->distinct()
            ->orderBy('logs.model_class_name')
            ->get();


        $types = Log::select(
            [DB::raw('(SELECT COUNT(*) as count FROM logs as l WHERE l.type = logs.type) as count'), 'logs.type']
        )
            ->orderBy('logs.type', 'ASC')
            ->distinct()
            ->get();

        return $this->responseOK([
            'data' => [
                'users' => $users->toArray(),
                'models' => $models->toArray(),
                'types' => $types->toArray(),
            ]
        ]);
    }
}
