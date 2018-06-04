<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = [
        'legacy_id',
        'name',
    ];

    public function authorships()
    {
        return $this->hasMany(Authorship::class);
    }
    
    public function products()
    {
        return $this->belongsToMany(Product::class, 'authorships')->using(Authorship::class);
    }

    public function getFullNameAttribute()
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

    private function splitNameSegments()
    {
        $matches = [];
        if (preg_match('/^([- A-Z]+)\b((?:[A-Z](?:\p{L}|-| )+)*)$/u', $this->fullName, $matches) === 1) {
            $this->attributes['first_name'] = trim($matches[2]);
            $this->attributes['last_name'] = trim($matches[1]);
        } else {
            $this->attributes['first_name'] = '';
            $this->attributes['last_name'] = $this->fullName;
        }
    }
    
    public function getFirstNameAttribute()
    {
        $this->splitNameSegments();
        return $this->attributes['first_name'];
    }
        
    public function getLastNameAttribute()
    {
        $this->splitNameSegments();
        return $this->attributes['last_name'];
    }
}
