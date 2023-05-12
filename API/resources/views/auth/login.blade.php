@extends('layouts.app', ['meta' => isset($meta) ?? $meta])

@section("content")
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ __('Log In') }}</div>

                    <div class="card-body">
                        @if(isset($error) && \Illuminate\Support\Arr::get($error, 'message') === 'WRONG_EMAIL_OR_PASSWORD')
                            <div class="alert alert-danger" role="alert">
                                Wrong email or password.
                            </div>
                        @endif
                        @if(isset($error) && \Illuminate\Support\Arr::get($error, 'message') === 'ACCOUNT_NOT_ACTIVE')
                            <div class="alert alert-danger" role="alert">
                                Your account is not active.
                            </div>
                        @endif
                        @if(isset($error) && \Illuminate\Support\Arr::get($error, 'message') === 'EMAIL_NOT_VERIFIED')
                            <div class="alert alert-danger" role="alert">
                                Your email is not verified.
                            </div>
                        @endif
                        <form method="POST" action="{{ route('login') }}">
                            @csrf

                            <div class="row mb-3">
                                <label for="email"
                                       class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>

                                <div class="col-md-6">
                                    <input id="email" type="email"
                                           class="form-control @error('email') is-invalid @enderror" name="email" placeholder="{{ __('Email Address') }}"
                                           value="{{ old('email') }}" required autocomplete="email">

                                    @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="password"
                                       class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>

                                <div class="col-md-6">
                                    <input name="password" type="password" class="form-control" placeholder="Password" required>

                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        {{ __('Login') }}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
