<ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
    @foreach ($mainMenu as $item)
        @if (!empty($item->link->linkCategory))
            <li><a class="nav-link px-2 {{$item->link->linkCategory->category->category_url === $slug ? "text-secondary" : "text-white"}}"
                   href="{{$item->link->linkCategory->category->category_url}}">{{$item->link->link_name}}</a>
            </li>
        @elseif (!empty($item->link->linkDocument))
            <li><a class="nav-link px-2 {{$item->link->linkDocument->document->document_url === $slug ? "text-secondary" : "text-white"}}"
                   href="{{$item->link->linkDocument->document->document_url}}">{{$item->link->link_name}}</a>
            </li>
        @elseif (!empty($item->link) && !empty($item->link->link_url))
            <li><a class="nav-link px-2 {{$item->link->link_url === $slug ? "text-secondary" : "text-white"}}"
                   href="{{$item->link->link_url}}">{{$item->link->link_name}}</a>
            </li>
        @endif
    @endforeach
</ul>
