@extends('layouts.app', ['meta' => [
    'title' => '404 Not Found',
]])
@section('content')
@include("components.page_content", [
    'content' => '404 Page Not Found.',
    'slug' => ''
])
@endsection
