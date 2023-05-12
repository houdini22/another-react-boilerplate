<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

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
                if (!empty($filters['model'])) {
                    if ($filters['model'] === "none") {
                        $query->whereNull('model_class_name');
                    } else {
                        $query->where('model_class_name', '=', $filters['model']);
                    }
                }
            })
            ->where(function ($query) use ($filters) {
                if (!empty($filters['type'])) {
                    $query->where('type', '=', $filters['type']);
                }
            })
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'related_model')) {
                    if (Arr::get($filters, 'related_model') === 'none') {
                        $query->whereNull('related_model_class_name');
                    } else {
                        $query->where('related_model_class_name', '=', Arr::get($filters, 'related_model'));
                    }
                }
            })
            ->orderBy(empty($filters['order_by']) ? 'id' : $filters['order_by'], empty($filters['order_direction']) ? 'desc' : $filters['order_direction']);

        $logs = $query->paginate(empty($filters['items_per_page']) ? 10000 : $filters['items_per_page']);

        return $this->responseOK([
            'logs' => $logs
        ]);
    }

    public function getFiltersData(Request $request)
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
                if (Arr::get($filters, 'model')) {
                    if (Arr::get($filters, 'model') === 'none') {
                        $query->whereNull('model_class_name');
                    } else {
                        $query->where('model_class_name', '=', Arr::get($filters, 'model'));
                    }
                }
                if (Arr::get($filters, 'related_model')) {
                    if (Arr::get($filters, 'related_model') === 'none') {
                        $query->whereNull('related_model_class_name');
                    } else {
                        $query->where('related_model_class_name', '=', Arr::get($filters, 'related_model'));
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
                } elseif (Arr::get($filters, 'user') !== "all" && Arr::get($filters, 'user')) {
                    $query->where('user_id', '=', Arr::get($filters, 'user'));
                }
                if (Arr::get($filters, 'type')) {
                    $query->where('type', '=', Arr::get($filters, 'type'));
                }
                if (Arr::get($filters, 'related_model')) {
                    if (Arr::get($filters, 'related_model') === 'none') {
                        $query->whereNull('related_model_class_name');
                    } else {
                        $query->where('related_model_class_name', '=', Arr::get($filters, 'related_model'));
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
                } elseif (Arr::get($filters, 'user') !== "all" && Arr::get($filters, 'user')) {
                    $query->where('user_id', '=', Arr::get($filters, 'user'));
                }
                if (Arr::get($filters, 'related_model')) {
                    if (Arr::get($filters, 'related_model') === 'none') {
                        $query->whereNull('related_model_class_name');
                    } else {
                        $query->where('related_model_class_name', '=', Arr::get($filters, 'related_model'));
                    }
                }
                if (Arr::get($filters, 'model')) {
                    if (Arr::get($filters, 'model') === 'none') {
                        $query->whereNull('model_class_name');
                    } else {
                        $query->where('model_class_name', '=', Arr::get($filters, 'model'));
                    }
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
                } elseif (Arr::get($filters, 'user') !== "all" && Arr::get($filters, 'user')) {
                    $query->where('user_id', '=', Arr::get($filters, 'user'));
                }
                if (Arr::get($filters, 'type')) {
                    $query->where('type', '=', Arr::get($filters, 'type'));
                }
                if (Arr::get($filters, 'model')) {
                    if (Arr::get($filters, 'model') === 'none') {
                        $query->whereNull('model_class_name');
                    } else {
                        $query->where('model_class_name', '=', Arr::get($filters, 'model'));
                    }
                }
            })
            ->from('logs', 'l_parent')
            ->get();

        return $this->responseOK([
            'user' => [
                'count' => $users->count(),
                'data' => $users->toArray()
            ],
            'model' => [
                'count' => $models->count(),
                'data' => $models->toArray()
            ],
            'type' => [
                'count' => $types->count(),
                'data' => $types->toArray(),
            ],
            'related_model' => [
                'count' => $related_models->count(),
                'data' => $related_models->toArray()
            ],
        ]);
    }
}
