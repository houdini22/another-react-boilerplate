@extends('layouts.app', ['meta' => $meta])
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
                @if (count($menu) > 0)
                    <div class="p-3 menu">
                        <h4 class="font-italic">Menu</h4>
                        <ol class="list-unstyled mb-0">
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
                                <li>
                                    @if($tree->tree_object_type === "category")
                                        <a href="{{$parent->category->category_url}}">
                                            <span>Go up</span>
                                        </a>
                                    @endif
                                    @if($tree->tree_object_type === "document")
                                        <a href="{{$parent->category->category_url}}">
                                            <span>Go up</span>
                                        </a>
                                    @endif
                                </li>
                            @endif
                            @foreach($menu as $m)
                                <li>
                                    @if ($m->tree_object_type === 'document')
                                        <a href="{{$m->document->document_url}}">
                                            <span>{{$m->document->document_name}}</span>
                                        </a>
                                    @endif
                                    @if ($m->tree_object_type === 'category')
                                        <a href="{{$m->category->category_url}}">
                                            <span>{{$m->category->category_name}}</span>
                                        </a>
                                    @endif
                                    @if ($m->tree_object_type === 'link')
                                        @if(!!$m->link->linkDocument && !!$m->link->linkDocument->document)
                                            <a href="{{$m->link->linkDocument->document->document_url}}"
                                               target="{{$m->link->link_target}}">
                                                <span>{{$m->link->linkDocument->document->document_name}}</span>
                                            </a>
                                        @elseif(!!$m->link->linkCategory && !!$m->link->linkCategory->category)
                                            <a href="{{$m->link->linkCategory->category->category_url}}"
                                               target="{{$m->link->link_target}}">
                                                <span>{{$m->link->linkCategory->category->category_name}}</span>
                                            </a>
                                        @else
                                            <a href="{{$m->link->link_url}}"
                                               target="{{$m->link->link_target}}">
                                                <span>{{$m->link->link_name}}</span>
                                            </a>
                                        @endif
                                    @endif
                                </li>
                            @endforeach
                        </ol>
                    </div>
                @endif
            </aside><!-- /.blog-sidebar -->
        </div><!-- /.row -->
    </div>
@endsection
