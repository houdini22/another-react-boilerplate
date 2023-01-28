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

    Route::prefix('cms')->group(function () {
        Route::get('pages', '\App\Http\Controllers\CmsPagesController@getPages');
        Route::get('pages/fetchParentCategorySelectOptions', '\App\Http\Controllers\CmsPagesController@getParentCategorySelectOptions');
        Route::post('pages/addCategory', '\App\Http\Controllers\CmsPagesController@postAddCategory');
        Route::post('pages/publish', '\App\Http\Controllers\CmsPagesController@postPublish');
        Route::post('pages/unpublish', '\App\Http\Controllers\CmsPagesController@postUnpublish');
        Route::delete('pages/deleteNode', '\App\Http\Controllers\CmsPagesController@deleteDeleteNode');
        Route::post('pages/addDocument', '\App\Http\Controllers\CmsPagesController@postAddDocument');
        Route::post('pages/addLink', '\App\Http\Controllers\CmsPagesController@postAddLink');
    });
});

Route::get('/', function () {
    return view('welcome');
});
