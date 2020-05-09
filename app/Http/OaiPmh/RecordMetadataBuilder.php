<?php

namespace App\Http\OaiPmh;

class RecordMetadataBuider
{
    /**
     * @var string
     */
    private $metadataPrefix;

    /**
     * @var string
     */
    private $recordId;

    public function __construct($metadataPrefix, $recordId)
    {
        $this->metadataPrefix = $metadataPrefix;
        $this->recordId = $recordId;
    }

    public static function build()
    {
    }
}
