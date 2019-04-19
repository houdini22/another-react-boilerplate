<?php

Route::prefix('api/v1')->group(function () {
    Route::post('auth/login', 'AuthController@postLogin');
    Route::post('auth/logout', 'AuthController@postLogout');
    Route::post('/dummy-url', function() {
        sleep(2);
        abort(404);
    });
});

Route::get('/', function () {
    return view('welcome');
});
