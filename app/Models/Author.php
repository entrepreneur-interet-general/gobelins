<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = [
        'legacy_id',
        'name',
        'first_name',
        'last_name',
        'date_of_birth',
        'year_of_birth',
        'date_of_death',
        'year_of_death',
        'occupation',
        'birthplace',
        'deathplace',
        'isni_uri',
    ];

    protected $touches = ['products'];

    public function authorships()
    {
        return $this->hasMany(Authorship::class);
    }
    
    public function products()
    {
        return $this->belongsToMany(Product::class, 'authorships')->using(Authorship::class);
    }

    /**
     * Data to store in Elasticsearch.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
        ];
    }

    /**
     * Legacy name attribute, with biographical infomation removed.
     *
     * @return string
     */
    public function getRawFullNameAttribute()
    {
        // Remove all biographical information,
        // by convention between parentesis.
        if (strpos($this->name, '(') !== false) {
            $truncated = trim(substr($this->name, 0, strpos($this->name, '(')));
        } else {
            $truncated = trim($this->name);
        }
        return $truncated;
    }

    /**
     * Parse the rawFullName into an array of [firstName, lastName]
     *
     * @return array
     */
    private function splitNameSegments()
    {
        $matches = [];
        if (preg_match('/^([- A-Z]+)\b((?:[A-Z](?:\p{L}|-| )+)*)$/u', $this->rawFullName, $matches) === 1) {
            return [
                trim($matches[2]),
                trim($matches[1])
            ];
        } else {
            return [
                '',
                $this->rawFullName,
            ];
        }
    }
    
    public function getCompositeFirstNameAttribute()
    {
        return $this->splitNameSegments()[0];
    }
        
    public function getCompositeLastNameAttribute()
    {
        return $this->splitNameSegments()[1];
    }
}
