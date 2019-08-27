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

Route::redirect('/', '/recherche', 302);

/* Products routes */
Route::get('/recherche', 'SearchController@index')
        ->name('search');

Route::get('/objet/{inventory_id}/zoom', 'SearchController@index')
        ->where('inventory_id', '.*');

Route::get('/objet/{inventory_id}', 'SearchController@index')
        ->name('product')
        ->where('inventory_id', '.*');


/* Selections routes */
Route::get('/selections', 'SearchController@index')
        ->name('selections');

/* Selections routes */
Route::get('/selections', 'SearchController@index')
        ->name('selections');

        Route::get('/selections/{selection_id}', 'SearchController@index')
        ->name('selection_detail')
        ->where('selection_id', '[0-9]+');
        
/* Internal routes */
Route::get('/ui', 'SearchController@index')
        ->name('ui');
        
        
/* Static pages routes */
Route::get('/info', 'HomeController@info');

Auth::routes();
