<div class="d-flex">
    <div class="col-md-{{(isset($menu) && count($menu)) ? 8 : 12}}">
        @if(isset($title))
            <h3 class="pb-3 mb-4 font-italic border-bottom">
                {{$title}}
            </h3>
        @endif
        @if(isset($content))
            <div>
                {!! $content !!}
            </div>
            @if($tree->tree_alias === "contact")
                <div>
                    @include("content.contact")
                </div>
            @endif
        @endif
    </div>
    @if (isset($menu) && count($menu))
        <div class="col-md-4">
            @include('components.page_content_menu', ['tree' => $tree, 'parent' => $parent, 'menu' => $menu, 'slug' => $slug])
        </div>
    @endif
</div>
