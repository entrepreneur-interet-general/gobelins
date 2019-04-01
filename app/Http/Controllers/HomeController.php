<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SEO;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        return view('site.home', [
        ]);
    }

    public function info(Request $request)
    {
        return view('site.info');
    }
}
