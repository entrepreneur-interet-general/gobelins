<?php

use Illuminate\Http\Request;

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
    'as' => 'search_endpoint', 'uses' => 'SearchController@search'
]);

Route::get('/product/{inventory_id}', [
    'as' => 'product_endpoint', 'uses' => 'ProductController@show'
]);

Route::get('selections', [
    'as' => 'selections', 'uses' => 'SelectionsController@index'
]);


Route::middleware('auth:api', 'throttle:60,1')->group(function () {
    Route::get('/user/profile', function (Request $request) {
        return $request->user();
    });

    Route::get('selections/mine', [
        'as' => 'mySelections', 'uses' => 'SelectionsController@mine'
    ]);

    Route::get('selections/{selection_id}/add/{product_id}', 'SelectionsController@add')->where([
        'selection_id' => '[0-9]+',
        'product_id' => '[0-9]+',
    ]);
    
    Route::post('selections', 'SelectionsController@create');
});
