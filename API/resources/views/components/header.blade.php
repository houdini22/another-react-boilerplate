<header class="{{!!$marginBottom ? "mb-4" : ""}} border-bottom">
    <div class="navbar box-shadow {{(isset($color) && $color === "dark") ? "navbar-dark bg-dark" : ""}}">
        <div class="container d-flex justify-content-between">
            @if (isset($logo))
                @include('components.app_logo', ['logo' => $logo])
            @endif
            @include('components.navbar_menu', ['menu' => $menu, 'slug' => $slug ?? NULL])
            @if (isset($actions) && is_array($actions))
                @foreach($actions as $action)
                    <a class="btn {{\Illuminate\Support\Arr::get($action, 'color') === "warning" ? "btn-warning" : "btn-outline-light me-2"}}"
                       href="{{$action['href']}}">{{$action['label']}}</a>
                @endforeach
            @endif
            @if (isset($searchForm) && !!$searchForm)
                @include("components.header_search_form")
            @endif
        </div>
    </div>
</header>
