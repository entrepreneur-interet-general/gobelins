<?php

namespace App\Http\Controllers;

use Psr\Http\Message\ServerRequestInterface;

use App\Http\OaiPmh\Repository;

class OaiPmhController extends Controller
{
    public function index(ServerRequestInterface $request)
    {
        $repository = new Repository();

        $provider = new \Picturae\OaiPmh\Provider($repository, $request);

        $response = $provider->getResponse();

        return $response;
    }
}
