@include('layouts._header', ['meta' => $meta])
<body>
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

    </div>
</main>
</body>
@include('layouts._footer')
