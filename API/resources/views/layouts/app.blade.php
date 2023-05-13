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
@guest
    @include('components.header', [
        'color' => 'dark',
        'actions' => $headerActions ?? null,
        'menu' => ($mainMenu ?? null),
        'marginBottom' => false,
    ])
@else
    @include('components.header', [
        'color' => 'dark',
        'actions' => $headerActions ?? null,
        'menu' => ($mainMenu ?? null),
        'marginBottom' => false,
    ])
@endif
@include('components.header', ['logo' => $app, 'menu' => NULL, 'marginBottom' => true, 'searchForm' => true])
<main class="container">
    @if (session('message'))
        @include('components.alert', [
            'message' => session('message')
        ])
    @endif
    @yield('content')
</main>
@include('components.footer')
</body>
</html>
