<?php

namespace App\Models\Traits;

/**
 * Handle mappings between legacy taxonomies and local ones.
 *
 * Requirements :
 * - The model must have a "mapping_key" attribute, typically stored
 * in the DB.
 * - A mapping file, in tab separated vales format (.tsv). The first
 * column will be the legacy name, the second column contains the
 * mapping key.
 * File naming convention:
 *   <pluralized model name>_<source name>.tsv
 *
 * A model might have multiple sources of mapping.
 */
trait Mappable
{
    /**
     * Memoized associative array of mappings
     * <source name> => <model mapping_key>
     *
     * @var array
     */
    public static $mappings = [];

    /**
     * Memoize the mappings for a given source
     *
     * @param string $legacySource
     * @return array
     */
    private static function buildMappings(string $legacySource)
    {
        if (array_key_exists($legacySource, self::$mappings) && sizeof(self::$mappings[$legacySource]) > 0) {
            return self::$mappings[$legacySource];
        }
        $filename = snake_case(str_plural((new \ReflectionClass(self::class))->getShortName()));
        $sheet = file(base_path() . '/database/mappings/' . $filename . '_' . $legacySource . '.tsv', FILE_IGNORE_NEW_LINES);
        $mappings = collect($sheet)->mapWithKeys(function ($line) {
            list($key, $val) = explode("\t", $line);
            return [$key => $val];
        })->filter(function ($val, $key) {
            return $val !== '';
        })->toArray();
        self::$mappings[$legacySource] = $mappings;
        return $mappings;
    }
    
    /**
     * Get the mapping key for a given legacy source and item.
     * The mapping key of the Mappable model is stored in the DB.
     *
     * @param string $legacySource
     * @param string $legacyName
     * @return string
     */
    public static function mappingKeyFor(string $legacySource, string $legacyName)
    {
        self::buildMappings($legacySource);
        return array_key_exists($legacyName, self::$mappings[$legacySource]) ? self::$mappings[$legacySource][$legacyName] : null;
    }

    /**
     * Eloquent query scope to fetch a model from a mapping.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeMappedFrom($query, $legacySource, $legacyName)
    {
        $mapping_key = self::mappingKeyFor($legacySource, $legacyName);
        return $query->where('mapping_key', $mapping_key);
    }
}
