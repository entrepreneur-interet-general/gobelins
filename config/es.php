<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Elasticsearch Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the Elasticsearch connections below you wish
    | to use as your default connection for all work. Of course.
    |
    */

    'default' => env('ELASTIC_CONNECTION', 'default'),

    /*
    |--------------------------------------------------------------------------
    | Elasticsearch Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the Elasticsearch connections setup for your application.
    | Of course, examples of configuring each Elasticsearch platform.
    |
    */

    'connections' => [

        'default' => [

            'servers' => [

                [
                    'host' => env('ELASTIC_HOST', '127.0.0.1'),
                    'port' => env('ELASTIC_PORT', 9200),
                    'user' => env('ELASTIC_USER', ''),
                    'pass' => env('ELASTIC_PASS', ''),
                    'scheme' => env('ELASTIC_SCHEME', 'http'),
                ]

            ],

            'index' => env('ELASTIC_INDEX', 'gobelins_search'),

            // Elasticsearch handlers
            // 'handler' => new MyCustomHandler(),
        ]
    ],

    /*
    |--------------------------------------------------------------------------
    | Elasticsearch Indices
    |--------------------------------------------------------------------------
    |
    | Here you can define your indices, with separate settings and mappings.
    | Edit settings and mappings and run 'php artisan es:index:update' to update
    | indices on elasticsearch server.
    |
    | 'my_index' is just for test. Replace it with a real index name.
    |
    */

    'indices' => [

        'gobelins_search_1' => [

            'aliases' => [
                'gobelins_search'
            ],

            'settings' => [
                'number_of_shards' => 1,
                'number_of_replicas' => 0,
            ],

            'mappings' => [
                'products' => [
                    'properties' => [
                        'title_or_designation' => [
                            'type' => 'text',
                            'analyzer' => 'french',
                        ],
                        'description' => [
                            'type' => 'text',
                            'analyzer' => 'french',
                        ],
                        'inventory_id' => [
                            'type' => 'text',
                            'analyzer' => 'standard',
                        ],
                        'product_type_ids' => [
                            'type' => 'long',
                        ],
                        'author_ids' => [
                            'type' => 'long',
                        ],
                        'period_start_year' => [
                            'type' => 'short',
                        ],
                        'period_end_year' => [
                            'type' => 'short',
                        ],
                        'conception_year' => [
                            'type' => 'text',
                            'analyzer' => 'standard',
                        ],
                        # We only store images here for retreival perf reasons.
                        'images' => [
                            'type' => 'object',
                            'properties' =>  [
                                'path' => [
                                    'type' => 'text',
                                    'index' => false,
                                ],
                                'width' => [
                                    'type' => 'integer',
                                    'index' => false,
                                ],
                                'height' => [
                                    'type' => 'integer',
                                    'index' => false,
                                ],
                            ]
                        ]
                    ]
                ]
            ]

        ]

    ]

];
