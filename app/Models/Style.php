<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Style extends Model
{
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
        $dir_path = storage_path(env('MEDIA_STORAGE_PATH') . '/_images-didactiques/styles/' . $this->name);
        if (file_exists($dir_path)) {
            for ($i=1; $i < 4; $i++) {
                $name = rawurlencode($this->name);
                $paths[] = "/image/_images-didactiques/styles/$name/$i.jpg?q=40&cache=1";
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
