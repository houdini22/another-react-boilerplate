<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
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
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'related_model_name')) {
                    if (Arr::get($filters, 'related_model_name') === 'none') {
                        $query->whereNull('related_model_class_name');
                    } else {
                        $query->where('related_model_class_name', '=', Arr::get($filters, 'related_model_name'));
                    }
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

        DB::connection()->enableQueryLog();

        $filters = $request->get('filters');

        $users = Log::select(
            [
                DB::raw('l_parent.user_id as user_id'),
                DB::raw('users.name as name'),
                DB::raw('l_parent.model_class_name as model_class_name'),
                DB::raw('l_parent.type as type'),
                DB::raw('count(*) as count'),
                DB::raw('l_parent.related_model_class_name as related_model_class_name'),
            ]
        )->leftJoin('users', 'users.id', 'l_parent.user_id')->groupBy("user_id")
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'type')) {
                    $query->where('type', '=', Arr::get($filters, 'type'));
                }
                if (Arr::get($filters, 'model_name')) {
                    $query->where('model_class_name', '=', Arr::get($filters, 'model_name'));
                }
                if (Arr::get($filters, 'related_model_name')) {
                    if (Arr::get($filters, 'related_model_name') === 'none') {
                        $query->whereNull('related_model_class_name');
                    } else {
                        $query->where('related_model_class_name', '=', Arr::get($filters, 'related_model_name'));
                    }
                }
            })
            ->from('logs', 'l_parent')
            ->get();

        $models = Log::select(
            [
                DB::raw('l_parent.user_id as user_id'),
                DB::raw('users.name as name'),
                DB::raw('l_parent.model_class_name as model_class_name'),
                DB::raw('count(*) as count'),
                DB::raw('l_parent.related_model_class_name as related_model_class_name'),
            ]
        )->leftJoin('users', 'users.id', 'l_parent.user_id')->groupBy("model_class_name")
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'user') === "none") {
                    $query->where('user_id', '=', 0);
                } else if (Arr::get($filters, 'user') !== "all" && Arr::get($filters, 'user')) {
                    $query->where('user_id', '=', Arr::get($filters, 'user'));
                }
                if (Arr::get($filters, 'type')) {
                    $query->where('type', '=', Arr::get($filters, 'type'));
                }
                if (Arr::get($filters, 'related_model_name')) {
                    if (Arr::get($filters, 'related_model_name') === 'none') {
                        $query->whereNull('related_model_class_name');
                    } else {
                        $query->where('related_model_class_name', '=', Arr::get($filters, 'related_model_name'));
                    }
                }
            })
            ->from('logs', 'l_parent')
            ->get();

        $types = Log::select(
            [
                DB::raw('l_parent.user_id as user_id'),
                DB::raw('users.name as name'),
                DB::raw('l_parent.type as type'),
                DB::raw('count(*) as count'),
                DB::raw('l_parent.related_model_class_name as related_model_class_name'),
            ]
        )->leftJoin('users', 'users.id', 'l_parent.user_id')->groupBy("type")
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'user') === "none") {
                    $query->where('user_id', '=', 0);
                } else if (Arr::get($filters, 'user') !== "all" && Arr::get($filters, 'user')) {
                    $query->where('user_id', '=', Arr::get($filters, 'user'));
                }
                if (Arr::get($filters, 'related_model_name')) {
                    if (Arr::get($filters, 'related_model_name') === 'none') {
                        $query->whereNull('related_model_class_name');
                    } else {
                        $query->where('related_model_class_name', '=', Arr::get($filters, 'related_model_name'));
                    }
                }
                if (Arr::get($filters, 'model_name')) {
                    $query->where('model_class_name', '=', Arr::get($filters, 'model_name'));
                }
            })
            ->from('logs', 'l_parent')
            ->get();

        $related_models = Log::select(
            [
                DB::raw('l_parent.user_id as user_id'),
                DB::raw('users.name as name'),
                DB::raw('l_parent.related_model_class_name as related_model_class_name'),
                DB::raw('l_parent.related_model_id as related_model_id'),
                DB::raw('count(*) as count')
            ]
        )->leftJoin('users', 'users.id', 'l_parent.user_id')->groupBy("related_model_class_name")
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'user') === "none") {
                    $query->where('user_id', '=', 0);
                } else if (Arr::get($filters, 'user') !== "all" && Arr::get($filters, 'user')) {
                    $query->where('user_id', '=', Arr::get($filters, 'user'));
                }
                if (Arr::get($filters, 'type')) {
                    $query->where('type', '=', Arr::get($filters, 'type'));
                }
                if (Arr::get($filters, 'model_name')) {
                    $query->where('model_class_name', '=', Arr::get($filters, 'model_name'));
                }
            })
            ->from('logs', 'l_parent')
            ->get();

        return $this->responseOK([
            'data' => [
                'users' => $users->toArray(),
                'models' => $models->toArray(),
                'types' => $types->toArray(),
                'related_models' => $related_models->toArray(),
                'queries' => DB::getQueryLog()
            ]
        ]);
    }
}
