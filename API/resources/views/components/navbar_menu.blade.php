@if (isset($menu))
    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 component-navbar-menu">
        @foreach ($menu as $item)
            @if (!empty($item->link->linkCategory))
                <li>
                    @if (!$item->link->link_display_children)
                        <a class="component-navbar-menu__menu-item nav-link px-2 {{$item->link->linkCategory->category->category_url === $slug ? "text-secondary" : "text-white"}}"
                           href="{{$item->link->linkCategory->category->category_url}}">
                            @if (!empty($item->link->iconFile))
                                <img class="bi d-block mx-auto mb-1"
                                     src="{{url("/files/preview/{$item->link->iconFile->id}/{$item->link->iconFile->name}")}}"
                                     alt="{{$item->link->iconFile->alt}}"/>
                            @endif
                            {{$item->link->link_name}}
                        </a>
                    @endif
                    @if (!!$item->link->link_display_children && !empty($item->link->linkCategory->children))
                        <div class="dropdown">
                            <a class="component-navbar-menu__menu-item nav-link px-2 dropdown-toggle {{$item->link->linkCategory->category->category_url === $slug ? "text-secondary" : "text-white"}}"
                               data-bs-toggle="dropdown" aria-expanded="false"
                            >
                                @if (!empty($item->link->iconFile))
                                    <img class="bi d-block mx-auto mb-1"
                                         src="{{url("/files/preview/{$item->link->iconFile->id}/{$item->link->iconFile->name}")}}"
                                         alt="{{$item->link->iconFile->alt}}"/>
                                @endif
                                {{$item->link->link_name}}
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark gap-1 p-2 rounded-3 mx-0 border-0 shadow w-220px">
                                @foreach($item->link->linkCategory->children as $child)
                                    @if ($child->tree_object_type === "document" && $child->tree_class !== "index_page")
                                        <li>
                                            <a class="dropdown-item rounded-2"
                                               href="{{$child->document->document_url}}">{{$child->document->document_name}}</a>
                                        </li>
                                    @elseif ($child->tree_object_type === "category")
                                        <li>
                                            <a class="dropdown-item rounded-2"
                                               href="{{$child->category->category_url}}">{{$child->category->category_name}}</a>
                                        </li>
                                    @elseif ($child->tree_object_type === "link")
                                        <li>
                                            <a class="dropdown-item rounded-2"
                                               href="{{$child->link->link_url}}"
                                                target="{{$child->link->link_target}}"
                                            >{{$child->link->link_name}}</a>
                                        </li>
                                    @endif
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </li>
            @elseif (!empty($item->link->linkDocument))
                <li>
                    <a class="component-navbar-menu__menu-item nav-link px-2 {{$item->link->linkDocument->document->document_url === $slug ? "text-secondary" : "text-white"}}"
                       href="{{$item->link->linkDocument->document->document_url}}">
                        @if (!empty($item->link->iconFile))
                            <img class="bi d-block mx-auto mb-1"
                                 src="{{url("/files/preview/{$item->link->iconFile->id}/{$item->link->iconFile->name}")}}"
                                 alt="{{$item->link->iconFile->alt}}"/>
                        @endif
                        {{$item->link->link_name}}
                    </a>
                </li>
            @elseif (!empty($item->link) && !empty($item->link->link_url))
                <li>
                    <a class="component-navbar-menu__menu-item nav-link px-2 {{$item->link->link_url === $slug ? "text-secondary" : "text-white"}}"
                       href="{{$item->link->link_url}}">
                        @if (!empty($item->link->iconFile))
                            <img class="bi d-block mx-auto mb-1"
                                 src="{{url("/files/preview/{$item->link->iconFile->id}/{$item->link->iconFile->name}")}}"
                                 alt="{{$item->link->iconFile->alt}}"/>
                        @endif
                        {{$item->link->link_name}}
                    </a>
                </li>
            @endif
        @endforeach
    </ul>
@endif
