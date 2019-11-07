<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

use App\Http\Resources\User as UserResource;
use Elasticsearch\ClientBuilder;

class Selection extends JsonResource
{
    private $client;

    public function __construct($r)
    {
        parent::__construct($r);
        $this->client = ClientBuilder::create()->build();
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $canUpdateThis = $request->user('api') && $request->user('api')->can('update', $this->resource);


        $product_ids = $this->resource->products()->allRelatedIds();
        if (sizeof($product_ids)) {
            $es = $this->client->mget([
                "index" => "gobelins_search",
                "type" => "products",
                "body" => ["ids" => $this->resource->products()->allRelatedIds()]
            ]);
            $products = collect($es['docs'])->pluck('_source')->all();
        } else {
            $products = [];
        }
        
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'public' => $this->public,
            'users' => $this->users->map(function ($u) use ($request, $canUpdateThis) {
                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    $this->mergeWhen($canUpdateThis, [
                        'email' => $u->email,
                    ]),
                ];
            })->filter()->all(),
            $this->mergeWhen($canUpdateThis, [
                'invitations' => $this->invitations,
            ]),
            // 'products' => $this->products->map(function ($p) {
            //     // return $p->toSearchableArray();
            //     return [
            //         'title_or_designation' => $p->title_or_designation,
            //         'denomination' => $p->denomination,
            //         'inventory_id' => $p->inventory_id,
            //         'product_types' => $p->searchableProductTypes,
            //         'authors' => $p->searchableAuthors,
            //         'images' => $p->searchableImages,
            //         'partiallyLoaded' => true,
            //     ];
            // })->all()
            'products' => $products,
        ];
    }
}
