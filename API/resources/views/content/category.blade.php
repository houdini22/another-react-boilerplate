@extends('layouts.app', ['meta' => $meta, 'mainMenu' => $mainMenu, 'slug' => $slug, 'headerActions' => $headerActions])
@section('content')
    @include("components.page_content", [
        'menu' => $menu,
        'title' => !empty($document) ? $document->document_name : NULL,
        'content' => !empty($document) ? $document->document_content : NULL,
        'tree' => $tree,
        'parent' => $parent,
        'slug' => $slug,
    ])
@endsection
