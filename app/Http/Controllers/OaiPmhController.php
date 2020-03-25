<?php

namespace App\Http\Controllers;

use Psr\Http\Message\ServerRequestInterface;

use App\Repositories\Product;

class OaiPmhController extends Controller
{
    public function index(ServerRequestInterface $request)
    {
        $repository = new Product();
        // $provider = new \Picturae\OaiPmh\Provider($repository);
        $provider = new \Picturae\OaiPmh\Provider($repository, $request);
        $response = $provider->getResponse();

        return $response;
    }
}
