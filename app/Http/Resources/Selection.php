<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

use App\Http\Resources\User as UserResource;

class Selection extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $canUpdateThis = $request->user('api') && $request->user('api')->can('update', $this->resource);
        
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
            'products' => $this->products->map(function ($p) {
                return $p->toSearchableArray();
                // return [
                //     'title_or_designation' => $p->title_or_designation,
                //     'denomination' => $p->denomination,
                //     'inventory_id' => $p->inventory_id,
                //     'product_types' => $p->searchableProductTypes,
                //     'authors' => $p->searchableAuthors,
                //     'images' => $p->searchableImages,
                // ];
            })->all()
        ];
    }
}
