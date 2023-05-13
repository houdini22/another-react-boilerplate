@extends('layouts.app', ['meta' => $meta, 'mainMenu' => $mainMenu, 'slug' => $slug])
@section('content')
    @include("components.page_content", [
        'menu' => $menu,
        'title' => $document->document_name,
        'content' => $document->document_content,
        'tree' => $tree,
        'parent' => $parent,
        'slug' => $slug,
    ])
@endsection
