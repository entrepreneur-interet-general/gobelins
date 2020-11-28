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
    ->name('product_zoom')
    ->where('inventory_id', '.*');

Route::get('/objet/{inventory_id}', 'SearchController@index')
    ->name('product')
    ->where('inventory_id', '.*');

/* Selections routes */
Route::get('/selections', 'SearchController@index')
    ->name('selections');

Route::get('/selections/{id}', 'SelectionsController@show')
    ->name('selection_detail')
    ->where('id', '[0-9]+');

Route::get('/selections/sitemap', 'SelectionsController@sitemap')
    ->name('selections_sitemap');

Route::get('/selections/{selection_id}/invitation', 'SelectionsController@invitation')
    ->name('invitation_landing')
    ->where('selection_id', '[0-9]+')
    ->middleware('auth');

Route::get('/invitations/{token}', 'InvitationController@accept')->name('invitation');

Route::get('/encyclopedie/{slug}', 'ArticleController@show')
    ->name('article.show')
    ->where('slug', '.*');

/* Internal routes */
Route::get('/ui', 'SearchController@index')
    ->name('ui');

/* Static pages routes */
Route::get('/info', 'HomeController@info');

Auth::routes(['verify' => true]);
