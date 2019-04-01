<?php

return [
    'meta'      => [
        /*
         * The default configurations to be used by the meta generator.
         */
        'defaults'       => [
            'title'        => "Collection du Mobilier national", // set false to total remove
            'description'  => 'Collection des meubles, tapis et tapisseries du Mobilier national et manufactures des Gobelins, de Beauvais et de la Savonnerie.', // set false to total remove
            'separator'    => ' — ',
            'keywords'     => [],
            'canonical'    => false, // Set null for using Url::current(), set false to total remove
            'robots'       => false, // Set to 'all', 'none' or any combination of index/noindex and follow/nofollow
        ],

        /*
         * Webmaster tags are always added.
         */
        'webmaster_tags' => [
            'google'    => null,
            'bing'      => null,
            'alexa'     => null,
            'pinterest' => null,
            'yandex'    => null,
        ],
    ],
    'opengraph' => [
        /*
         * The default configurations to be used by the opengraph generator.
         */
        'defaults' => [
            'title'       => 'Collection du Mobilier national', // set false to total remove
            'description' => 'Collection des meubles, tapis et tapisseries du Mobilier national et manufactures des Gobelins, de Beauvais et de la Savonnerie.', // set false to total remove
            'url'         => false, // Set null for using Url::current(), set false to total remove
            'type'        => 'website',
            'site_name'   => 'Collection du Mobilier national',
            'images'      => [
                env('APP_URL').'/images/sharing/mobilier_campagne_napoleon.jpg',
                env('APP_URL').'/images/sharing/mobilier_national-gobelins.jpg',
                env('APP_URL').'/images/sharing/tissage_mobilier_national.jpg',
            ],
            'locale'      => 'fr_FR',
        ],
    ],
    'twitter' => [
        /*
         * The default values to be used by the twitter cards generator.
         */
        'defaults' => [
          'card'        => 'summary_large_image',
          'site'        => '@MNGBS',
        ],
    ],
];
