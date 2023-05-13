@extends('layouts.app', ['meta' => $meta, 'mainMenu' => $mainMenu])
@section('content')
    @include("components.jumbotron", [
        'heading' => 'CMS System',
        'imgUrl' => url('/img/avatar.jpg'),
    ])
    @include("components.page_content", [
        'menu' => $menu,
        'title' => $document->document_name,
        'content' => $document->document_content,
        'tree' => $tree,
        'parent' => NULL,
        'slug' => $slug,
    ])
@endsection()
