<div class="alert
{{\Illuminate\Support\Arr::get(session('message'), 'type') === 'success' ? "alert-success" : ""}}
{{\Illuminate\Support\Arr::get(session('message'), 'type') === 'warning' ? 'alert-warning' : ''}}
" role="alert">
    {{\Illuminate\Support\Arr::get(session('message'), 'message')}}
</div>
