<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/', 'HomeController@index')->name('home');

Route::get('/', function () {
    return redirect()->route('search');
});


// Route::get('/rechercher', 'SearchController@search')->name('search_endpoint');

Route::get('/recherche', 'SearchController@index')->name('search');
Route::get('/objet/{inventory_id}/zoom', 'SearchController@index')->where('inventory_id', '.*');
Route::get('/objet/{inventory_id}', 'SearchController@index')->name('product')->where('inventory_id', '.*');

Route::get('/image/{path}', 'ImageController@show')->where('path', '.*');
