<?php

namespace App\Models;

use A17\Twill\Models\Model;

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
     * @param string $name
     * @return string
     */
    public static function extractFullName($name)
    {
        // Remove all biographical information,
        // by convention between parentesis.
        if (strpos($name, '(') !== false) {
            $truncated = trim(substr($name, 0, strpos($name, '(')));
        } else {
            $truncated = trim($name);
        }
        return $truncated;
    }

    /**
     * Parse the legacy raw full name into an array of [firstName, lastName]
     *
     * @param string $nameField
     * @return array
     */
    private static function splitNameSegments($nameField)
    {
        $matches = [];
        $fullName = self::extractFullName($nameField);
        if (preg_match('/^([- A-Z]+)\b((?:[A-Z](?:\p{L}|-| )+)*)$/u', $fullName, $matches) === 1) {
            return [
                trim($matches[2]),
                trim($matches[1]),
            ];
        } else {
            return [
                '',
                $fullName,
            ];
        }
    }

    /**
     * Extract a lastName from the legacy (datasource) 'name' attribute
     *
     * @param string $name
     * @return string
     */
    public static function extractLastName($name)
    {
        $first_last = self::splitNameSegments($name);
        return $first_last[1];
    }

    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}
