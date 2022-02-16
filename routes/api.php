<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Route::get('/api/search', 'SearchController@search')->name('search_endpoint');

Route::get('/search', [
    'as' => 'search_endpoint', 'uses' => 'SearchController@search',
]);

Route::get('/product/{inventory_id}', [
    'as' => 'product_endpoint', 'uses' => 'ProductController@show',
]);

Route::get('selections', [
    'as' => 'api.selections', 'uses' => 'SelectionsController@index',
]);

Route::get('selections/{id}', 'SelectionsController@show')
    ->where(['id' => '[0-9]+'])
    ->middleware('api');

// Route::get('selections/list', ['uses' => 'SelectionsController@list']);
Route::get('selections/mobnat', [
    'as' => 'api.mobNatSelections',
    'uses' => 'SelectionsController@listMobNatSelections',
]);
Route::get('selections/user', [
    'as' => 'api.userSelections',
    'uses' => 'SelectionsController@listUserSelections',
]);

Route::any('oai-pmh', [
    'as' => 'api.oai-pmh',
    'uses' => 'OaiPmhController@index',
]);

Route::middleware('auth:api', 'throttle:60,1')->group(function () {
    Route::get('/user/me', 'UserController@me');
    Route::patch('/user/me', 'UserController@update');
    Route::delete('/user/me', 'UserController@destroy');

    // Route::get('selections/mine', [
    //     'as' => 'mySelections', 'uses' => 'SelectionsController@mine'
    // ]);
    Route::get('selections/mine', [
        'as' => 'api.mySelections',
        'uses' => 'SelectionsController@listMySelections',
    ]);

    Route::get('selections/mine-short', 'SelectionsController@mineShort');

    Route::get('selections/{selection_id}/add/{product_id}', 'SelectionsController@add')->where([
        'selection_id' => '[0-9]+',
        'product_id' => '[0-9]+',
    ]);

    Route::delete('selections/{selection_id}/products/{inventory_id}', 'SelectionsController@removeProduct')->where([
        'selection_id' => '[0-9]+',
        'inventory_id' => '.+',
    ]);

    Route::post('selections', 'SelectionsController@create');

    Route::patch('selections/{selection_id}', 'SelectionsController@update')->where('selection_id', '[0-9]+');

    Route::delete('selections/{selection_id}', 'SelectionsController@destroy')->where('selection_id', '[0-9]+');

    Route::post('selections/{selection_id}/invitations', 'InvitationController@create')->where('selection_id', '[0-9]+');

    Route::delete('selections/{selection_id}/invitations/{invitation_id}', 'InvitationController@destroy');

    Route::delete('selections/{selection_id}/users/{user_id}', 'SelectionsController@detachUser');
});
