<?php

if (! function_exists('encodeURIComponent')) {
    function encodeURIComponent($str)
    {
        $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')', '%2F' => '/');
        return strtr(rawurlencode($str), $revert);
    }
}
