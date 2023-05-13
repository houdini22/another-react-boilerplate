<a href="{{url('/')}}" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
    @if (\Illuminate\Support\Arr::get($logo, 'logo.url'))
        <img src="{{\Illuminate\Support\Arr::get($app, 'logo.url')}}" alt="" class="header-logo"/>
    @endif
    <strong>{{\Illuminate\Support\Arr::get($logo, 'name')}}</strong>
</a>
