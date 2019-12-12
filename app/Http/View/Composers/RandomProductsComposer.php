<?php

namespace App\Http\View\Composers;

use Illuminate\View\View;
use App\Models\Product;
use ES;

class RandomProductsComposer
{
    public $products;

    public function __construct()
    {
        $body["query"] = [
            "function_score"=> [
                "functions" => [
                    ["random_score"=> ["seed"=> time()]]
                ]
            ]
        ];
        $body["sort"] = [['image_quality_score' => 'desc'], '_score'];
        
        $query = ES::type("products");
        
        $this->products = $query->body($body)->take(20)->get()->toArray();
    }

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('random_products', $this->products);
    }
}
