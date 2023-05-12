@extends('layouts.app', ['meta' => $meta, 'mainMenu' => $mainMenu, 'slug' => $slug])
@section('content')
    <div>
        <div class="row">
            <div class="col-md-8">
                @if($document)
                    <h3 class="pb-3 mb-4 font-italic border-bottom document-header">
                        {{$document->document_name}}
                    </h3>

                    <div class="document-content">
                        {{$document->document_content}}
                    </div><!-- /.blog-post -->
                @endif
            </div><!-- /.blog-main -->

            <aside class="col-md-4">
                <div class="p-3 menu">
                    <h4 class="font-italic">Menu</h4>
                    <ul class="nav flex-column">
                        @if(
                                (
                                    $tree->tree_object_type === "document"
                                    && $tree->depth > 1
                                    && !!$parent->category->category_url
                                    && $parent->category->category_url !== $tree->documentCategory->category->category_url
                                )
                            ||
                                (
                                    $tree->tree_object_type === "category"
                                    && $tree->depth > 1
                                    && $parent->category->category_url !== $tree->category->category_url
                                ))
                            <li class="nav-item">
                                @if($tree->tree_object_type === "category")
                                    <a href="{{$parent->category->category_url}}">
                                        <span>Go up</span>
                                    </a>
                                @endif
                                @if($tree->tree_object_type === "document")
                                    <a class="nav-link" href="{{$parent->category->category_url}}">
                                        <span>Go up</span>
                                    </a>
                                @endif
                            </li>
                        @endif
                        @foreach($menu as $m)
                            <li class="nav-item">
                                @if ($m->tree_object_type === 'document')
                                    <a href="{{$m->document->document_url}}"
                                       class="nav-link {{$m->document->document_url === $slug ? "active" : ""}}">
                                        <span>{{$m->document->document_name}}</span>
                                    </a>
                                @endif
                                @if ($m->tree_object_type === 'category')
                                    <a href="{{$m->category->category_url}}"
                                       class="nav-link {{$m->category->category_url === $slug ? "active" : ""}}">
                                        <span>{{$m->category->category_name}}</span>
                                    </a>
                                @endif
                                @if ($m->tree_object_type === 'link')
                                    @if(!!$m->link->linkDocument && !!$m->link->linkDocument->document)
                                        <a href="{{$m->link->linkDocument->document->document_url}}"
                                           class="nav-link {{$m->link->linkDocument->document->document_url === $slug ? "active" : ""}}"
                                           target="{{$m->link->link_target}}">
                                            <span>{{$m->link->linkDocument->document->document_name}}</span>
                                        </a>
                                    @elseif(!!$m->link->linkCategory && !!$m->link->linkCategory->category)
                                        <a href="{{$m->link->linkCategory->category->category_url}}"
                                           class="nav-link {{$m->link->linkCategory->category->category_url === $slug ? "active" : ""}}"
                                           target="{{$m->link->link_target}}">
                                            <span>{{$m->link->linkCategory->category->category_name}}</span>
                                        </a>
                                    @else
                                        <a href="{{$m->link->link_url}}"
                                           class="nav-link {{$m->link->link_url === $slug ? "active" : ""}}"
                                           target="{{$m->link->link_target}}">
                                            <span>{{$m->link->link_name}}</span>
                                        </a>
                                    @endif
                                @endif
                            </li>
                        @endforeach
                    </ul>
                </div>
            </aside><!-- /.blog-sidebar -->
        </div><!-- /.row -->
    </div>
@endsection
