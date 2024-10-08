@extends('layouts.app', ['meta' => $meta, 'mainMenu' => $mainMenu, 'headerActions' => $headerActions])
@section('content')
    @include("components.jumbotron", [
        'heading' => 'hud',
        'imgUrl' => url('/img/avatar.jpg'),
    ])
    @include("components.page_content", [
        'menu' => $menu,
        'title' => $document->document_name,
        'content' => $document->document_content,
        'tree' => $tree,
        'parent' => $parent ?? NULL,
        'slug' => $slug,
    ])
@endsection()
