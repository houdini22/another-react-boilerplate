<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {
    Route::post('auth/login', '\App\Http\Controllers\AuthController@postLogin');
    Route::post('auth/logout', '\App\Http\Controllers\AuthController@postLogout');
    Route::post('/dummy-url', function() {
        sleep(2);
        abort(404);
    });
    Route::get('/captcha', '\App\Http\Controllers\CaptchaServiceController@getCaptcha');
    Route::post('/contact', '\App\Http\Controllers\ContactController@postIndex');
});

Route::get('/', function () {
    return view('welcome');
});
