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
