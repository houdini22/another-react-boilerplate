@extends('layouts.app', ['meta' => $meta ?? [], 'headerActions' => $headerActions, 'mainMenu' => $mainMenu])
@section('content')
@include("components.page_content", [
    'content' => $treeDocument->document->document_content,
    'title' => $treeDocument->document->document_name,
    'slug' => ''
])
@endsection
