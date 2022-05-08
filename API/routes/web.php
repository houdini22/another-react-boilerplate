<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {
    Route::post('auth/login', '\App\Http\Controllers\AuthController@postLogin');
    Route::post('auth/logout', '\App\Http\Controllers\AuthController@postLogout');
    Route::post('/dummy-url', function() {
        sleep(2);
        abort(404);
    });

    Route::prefix('cms')->group(function () {
        Route::get('pages', '\App\Http\Controllers\CmsPagesController@getPages');
        Route::get('pages/fetchParentCategorySelectOptions', '\App\Http\Controllers\CmsPagesController@getParentCategorySelectOptions');
        Route::post('pages/addCategory', '\App\Http\Controllers\CmsPagesController@postAddCategory');
    });
});

Route::get('/', function () {
    return view('welcome');
});
