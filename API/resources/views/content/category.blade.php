@extends('layouts.app', ['meta' => $meta, 'mainMenu' => $mainMenu, 'slug' => $slug])
@section('content')
    <div>
        <div class="row">
            <div class="col-md-{{count($menu) ? 8 : 12}}">
                @if($document)
                    <h3 class="pb-3 mb-4 font-italic border-bottom document-header">
                        {{$document->document_name}}
                    </h3>

                    <div class="document-content">
                        {{$document->document_content}}
                    </div>
                @endif
            </div>
            @if (count($menu))
                @include('content._menu', ['tree' => $tree, 'parent' => $parent, 'menu' => $menu, 'slug' => $slug])
            @endif
        </div>
    </div>
@endsection
