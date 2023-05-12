@extends('layouts.app', ['meta' => $meta])

@section("content")
<div class="flex">
    <div>
        <form class="form-signin" method="post">
            @if(isset($error['message']) && $error['message'] === 'WRONG_EMAIL_OR_PASSWORD')
                <div class="alert alert-danger" role="alert">
                    Wrong email or password.
                </div>
            @endif
            <div class="row">
                <div class="col-sm-12 col">
                    <input name="email" type="email" class="form-control" placeholder="Email address" required autofocus>
                </div>
                <div class="col-sm-12 col">
                    <input name="password" type="password" class="form-control" placeholder="Password" required>
                </div>
            </div>
            <div class="text-center">
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </div>
        </form>
    </div>
</div>
@endsection
