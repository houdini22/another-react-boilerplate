<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{{\Illuminate\Support\Arr::get($meta, 'title')}}</title>
    <meta name="description" content="{{\Illuminate\Support\Arr::get($meta, 'description')}}">
    <meta name="keywords" content="{{\Illuminate\Support\Arr::get($meta, 'keywords')}}">
    <meta name="robots" content="{{\Illuminate\Support\Arr::get($meta, 'robots')}}">
    <link rel="stylesheet" href="{{ asset('build/assets/app.css') }}">
    <script src="{{ asset('build/assets/app.js') }}" defer></script>
</head>
<body class="d-flex flex-column h-100">
<header>
    <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
            <a href="{{url('/')}}" class="navbar-brand d-flex align-items-center">
                <img src="{{url('/img/avatar.jpg')}}" alt="" class="header-logo"/>
                <strong>CMS System</strong>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
                 aria-labelledby="offcanvasDarkNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{url('/register')}}">Register</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{url('/login')}}">Log in</a>
                            </li>
                        @else
                            <li class="nav-item">
                                <a class="nav-link" href="{{url('/logout')}}">Log out</a>
                            </li>
                        @endif
                    </ul>
                    <form class="d-flex mt-3" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
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
