<?php

if (! function_exists('encodeURIComponent')) {
    function encodeURIComponent($str)
    {
        $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')', '%2F' => '/');
        return strtr(rawurlencode($str), $revert);
    }
}

// Ripped from https://github.com/folkloreinc/laravel-image/blob/v1.1/src/Folklore/Image/helpers.php

if (! function_exists('image_url')) {
    /**
     * Generate an image url
     *
     * @param  string     $src
     * @param  string  $message
     * @param  array   $headers
     * @return string $url
     */
    function image_url($src, $width = null, $height = null, $options = [])
    {
        return app('image')->url($src, $width, $height, $options);
    }
}
