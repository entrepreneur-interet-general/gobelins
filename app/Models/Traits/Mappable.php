<?php

namespace App\Models\Traits;

trait Mappable
{
    private static $mappings = [];

    private static function mappings()
    {
        if (sizeof(self::$mappings) > 0) {
            return self::$mappings;
        }
        $filename = snake_case(str_plural((new \ReflectionClass(self::class))->getShortName()));
        $sheet = file(base_path() . '/database/mappings/' . $filename . '.tsv', FILE_IGNORE_NEW_LINES);
        $mappings = collect($sheet)->mapWithKeys(function ($line) {
            list($key, $val) = explode("\t", $line);
            return [$key => $val];
        })->filter(function ($val, $key) {
            return $val !== '';
        })->toArray();
        self::$mappings = $mappings;
        return $mappings;
    }
    
    public static function mappingFrom($legacyName)
    {
        self::mappings();
        return array_key_exists($legacyName, self::$mappings) ? self::$mappings[$legacyName] : null;
    }

    public function scopeMappedFrom($query, $legacyName)
    {
        $mapping_key = self::mappingFrom($legacyName);
        return $query->where('mapping_key', $mapping_key);
    }
}
