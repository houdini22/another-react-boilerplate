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

    Route::prefix('users')->group(function() {
        Route::get('list', '\App\Http\Controllers\UsersController@getList');
        Route::post('send_activation_email', '\App\Http\Controllers\UsersController@postSendActivationEmail');
        Route::get('get/{id}', '\App\Http\Controllers\UsersController@getGet');
        Route::delete('delete/{id}', '\App\Http\Controllers\UsersController@deleteDeleteUser');
        Route::put('edit', '\App\Http\Controllers\UsersController@postEdit');
        Route::post('add', '\App\Http\Controllers\UsersController@postAdd');

        Route::prefix('roles')->group(function() {
            Route::delete('delete/{user_id}/{role_id}', '\App\Http\Controllers\UsersController@deleteDeleteUserRole');
            Route::post('add/{user_id}/{role_id}', '\App\Http\Controllers\UsersController@postAddUserRole');
        });
    });

    Route::prefix('roles')->group(function() {
        Route::get('list', '\App\Http\Controllers\RolesController@getList');
        Route::get('get/{id}', '\App\Http\Controllers\RolesController@getGet');
        Route::delete('delete/{id}', '\App\Http\Controllers\RolesController@deleteDeleteRole');
        Route::post('edit', '\App\Http\Controllers\RolesController@postEdit');
        Route::post('add', '\App\Http\Controllers\RolesController@postAdd');

        Route::prefix('permissions')->group(function() {
            Route::get('list', '\App\Http\Controllers\RolesController@getPermissionList');
            Route::post('{role_id}/add', '\App\Http\Controllers\RolesController@postPermissionAdd');
            Route::delete('delete/{role_id}/{permission_id}', '\App\Http\Controllers\RolesController@deleteDeleteUserPermission');
            Route::delete('delete/{permission_id}', '\App\Http\Controllers\RolesController@deleteDeletePermission');
        });
    });
});

Route::get('/', function () {
    return view('welcome');
});

Route::get('/users/activate/{email_verified_token}', '\App\Http\Controllers\UsersController@getActivate');
