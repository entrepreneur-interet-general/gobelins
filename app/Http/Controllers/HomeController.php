<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the homepage.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('site.home');
    }

    /**
     * Show the information page.
     *
     * @return \Illuminate\Http\Response
     */
    public function info()
    {
        return view('site.info');
    }
}
