<?php

namespace App\Models;

use A17\Twill\Models\Model;
use App\Models\Traits\Mappable;

class Style extends Model
{
    use Mappable;

    protected $fillable = [
        'name',
        'legacy_id',
    ];

    protected $touches = ['products'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['illustration_paths'];

    /* Relations */

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function getIllustrationPathsAttribute()
    {
        $paths = [];
        $dir_path = public_path('/media/_images-didactiques/styles/' . $this->name);
        if (file_exists($dir_path)) {
            for ($i = 1; $i < 4; $i++) {
                $name = rawurlencode($this->name);
                $paths[] = "/media/_images-didactiques/styles/$name/$i.jpg";
            }
        }
        return $paths;
    }

    /**
     * To store in Elasticsearch.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}
