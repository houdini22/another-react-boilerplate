@include('layouts._header')
<body>
{{--<div class="container">
<div class="nav-scroller py-1 mb-2">
      <nav class="nav d-flex justify-content-between">
          <a class="p-2 text-muted" href="#">World</a>
          <a class="p-2 text-muted" href="#">U.S.</a>
          <a class="p-2 text-muted" href="#">Technology</a>
          <a class="p-2 text-muted" href="#">Design</a>
          <a class="p-2 text-muted" href="#">Culture</a>
          <a class="p-2 text-muted" href="#">Business</a>
          <a class="p-2 text-muted" href="#">Politics</a>
          <a class="p-2 text-muted" href="#">Opinion</a>
          <a class="p-2 text-muted" href="#">Science</a>
          <a class="p-2 text-muted" href="#">Health</a>
          <a class="p-2 text-muted" href="#">Style</a>
          <a class="p-2 text-muted" href="#">Travel</a>
      </nav>
  </div>
</div>--}}
@include("content/_header")
@include("content/_jumbotron")
<main role="main" class="container">
    <div class="row">
        <div class="col-md-8">
            <h3 class="pb-3 mb-4 font-italic border-bottom">
                {{$document->document_name}}
            </h3>

            <div class="">
                {{$document->document_content}}
            </div><!-- /.blog-post -->
        </div><!-- /.blog-main -->

        <aside class="col-md-4">
            <div class="p-3 menu">
                <h4 class="font-italic">Menu</h4>
                <ol class="list-unstyled mb-0">
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
                                <a href="{{$m->link->link_url}}" target="{{$m->link->link_target}}">
                                    <span>{{$m->link->link_name}}</span>
                                </a>
                            @endif
                        </li>
                    @endforeach
                </ol>
            </div>
        </aside><!-- /.blog-sidebar -->
    </div><!-- /.row -->
    <footer>
        <p>Copyright Michał Baniowski</p>
    </footer>
</main><!-- /.container -->
</body>
@include('layouts._footer')
