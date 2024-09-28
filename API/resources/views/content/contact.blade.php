<div class="row justify-content-center">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">{{ __('Send me email') }}</div>

            <div class="card-body">
                <form method="POST" action="{{ route('contact') }}">
                    @csrf

                    <div class="row mb-3">
                        <label for="email"
                               class="col-md-4 col-form-label text-md-end">{{ __('Your Email Address') }}</label>

                        <div class="col-md-6">
                            <input id="email" type="email"
                                   class="form-control @error('email') is-invalid @enderror" name="email"
                                   placeholder="{{ __('Your Email Address') }}"
                                   value="{{ old('email') }}" required autocomplete="email">

                            @error('email')
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                            @enderror
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="content"
                               class="col-md-4 col-form-label text-md-end">{{ __('Message Content') }}</label>

                        <div class="col-md-6">
                                <textarea name="message" class="form-control" placeholder="Message Content"
                                          required>{{ old('message') }}</textarea>

                            @error('content')
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                            @enderror
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="captcha"
                               class="col-md-4 col-form-label text-md-end">{{ __('Captcha') }}</label>

                        <div class="col-md-6">
                            <div class="row captcha-container text-center">
                                <div class="col-md-12">
                                    {!! captcha_img('math') !!}
                                </div>
                            </div>
                            <input id="captcha" type="text" class="form-control @error('captcha') is-invalid @enderror"
                                   name="captcha" autocomplete="off" placeholder="Captcha">

                            @error('captcha')
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                            @enderror
                        </div>
                    </div>

                    <div class="row mb-0">
                        <div class="col-md-6 offset-md-4">
                            <button type="submit" class="btn btn-primary">
                                {{ __('Send') }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
