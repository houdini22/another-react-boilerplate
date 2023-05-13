<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    @if(isset($meta))
        <title>{{\Illuminate\Support\Arr::get($meta, 'title')}}</title>
        <meta name="description" content="{{\Illuminate\Support\Arr::get($meta, 'description')}}">
        <meta name="keywords" content="{{\Illuminate\Support\Arr::get($meta, 'keywords')}}">
        <meta name="robots" content="{{\Illuminate\Support\Arr::get($meta, 'robots')}}">
    @endif

    <link rel="stylesheet" href="{{ asset('build/assets/app.css') }}">
    <script src="{{ asset('build/assets/app.js') }}" defer></script>
</head>
<body class="d-flex flex-column h-100">
<header>
    <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
            @include('layouts._app_main_menu', ['mainMenu' => $mainMenu, 'slug' => $slug])
            @guest
                <a class="btn btn-outline-light me-2" href="{{url('/login')}}">Log in</a>
                <a class="btn btn-warning" href="{{url('/register')}}">Register</a>
            @else
                <a class="btn btn-outline-light me-2" href="{{url('/logout')}}">Log out</a>
            @endif
        </div>
    </div>
</header>
<header class="py-3 mb-4 border-bottom">
    <div class="container d-flex flex-wrap justify-content-center">
        @include('layouts._app_name_logo', ['app' => $app])
        <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
        </form>
    </div>
</header>
<main class="container">
    @if (session('message'))
        @if (\Illuminate\Support\Arr::get(session('message'), 'type') === 'success')
            <div class="alert alert-success" role="alert">
                {{\Illuminate\Support\Arr::get(session('message'), 'message')}}
            </div>
        @endif
        @if (\Illuminate\Support\Arr::get(session('message'), 'type') === 'warning')
            <div class="alert alert-warning" role="alert">
                {{\Illuminate\Support\Arr::get(session('message'), 'message')}}
            </div>
        @endif
    @endif
    @yield('content')
</main>
<footer class="footer mt-auto py-3 bg-light">
    <div class="container">
        <span class="text-muted">Copyright © Michał Baniowski</span>
    </div>
</footer>
</body>
</html>
