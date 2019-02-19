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
                'analysis' => [
                    'analyzer' => [
                        'author_name_analyzer' => [
                            'type'=> 'standard',
                            'stopwords'=> ['de', 'du', 'le', 'la', 'et', 'da', 'l', 'd', 'van', 'von', 'der']
                        ]
                    ]
                ],
            ],

            'mappings' => [
                'products' => [
                    'properties' => [
                        'title_or_designation' => [
                            'type' => 'text',
                            'analyzer' => 'french',
                        ],
                        'denomination' => [
                            'type' => 'text',
                            'analyzer' => 'french',
                        ],
                        'description' => [
                            'type' => 'text',
                            'analyzer' => 'french',
                        ],
                        'bibliography' => [
                            'type' => 'text',
                            'analyzer' => 'french',
                        ],
                        'acquisition_origin' => [
                            'type' => 'text',
                            'analyzer' => 'french',
                        ],
                        'acquisition_date' => [
                            'type' => 'text',
                            'analyzer' => 'standard',
                        ],
                        'inventory_id' => [
                            'type' => 'text',
                            'analyzer' => 'standard',
                        ],
                        'inventory_id_as_keyword' => [
                            'type' => 'keyword',
                        ],
                        'legacy_inventory_number' => [
                            'type' => 'text',
                            'analyzer' => 'standard',
                        ],
                        'product_types' => [
                            'type' => 'object',
                            'properties' => [
                                'id' => [
                                    'type' => 'long',
                                ],
                                'name' => [
                                    'type' => 'text',
                                    'analyzer' => 'french',
                                ],
                                'mapping_key' => [
                                    'type' => 'text',
                                    'index' => false,
                                ],
                                'is_leaf' => [
                                    'type' => 'boolean',
                                    'index' => false,
                                ],
                            ]
                        ],
                        'authors' => [
                            'type' => 'object',
                            'properties' =>  [
                                'id' => [
                                    'type' => 'long',
                                ],
                                'first_name' => [
                                    'type' => 'text',
                                    'analyzer' => 'author_name_analyzer',
                                ],
                                'last_name' => [
                                    'type' => 'text',
                                    'analyzer' => 'author_name_analyzer',
                                ],
                            ],
                        ],
                        'period_name' => [
                            'type' => 'text',
                            'analyzer' => 'standard',
                        ],
                        'period_start_year' => [
                            'type' => 'short',
                        ],
                        'period_end_year' => [
                            'type' => 'short',
                        ],
                        'conception_year' => [
                            'type' => 'short',
                        ],
                        'conception_year_as_text' => [
                            'type' => 'text',
                            'analyzer' => 'standard',
                        ],
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
                                'photographer' => [
                                    'type' => 'text',
                                    'index' => false,
                                ],
                                'is_prime_quality' => [
                                    'type' => 'boolean',
                                ],
                                'is_documentation_quality' => [
                                    'type' => 'boolean',
                                ],
                                'has_marking' => [
                                    'type' => 'boolean',
                                ],
                                'license' => [
                                    'type' => 'text',
                                    'index' => false,
                                ],
                            ]
                        ],
                        'image_quality_score' => [
                            'type' => 'integer',
                        ],
                        'style' => [
                            'type' => 'object',
                            'properties' => [
                                'id' => [
                                    'type' => 'long',
                                ],
                                'name' => [
                                    'type' => 'text',
                                    'analyzer' => 'french',
                                ],
                            ],
                        ],
                        'materials' => [
                            'type' => 'object',
                            'properties' =>  [
                                'id' => [
                                    'type' => 'integer',
                                ],
                                'name' => [
                                    'type' => 'text',
                                    'analyzer' => 'french',
                                ],
                                'mapping_key' => [
                                    'type' => 'text',
                                    'index' => false,
                                ],
                                'is_leaf' => [
                                    'type' => 'boolean',
                                    'index' => false,
                                ],
                            ]
                        ],
                        'production_origin' => [
                            'type' => 'object',
                            'properties' => [
                                'id' => [
                                    'type' => 'long',
                                ],
                                'name' => [
                                    'type' => 'text',
                                    'analyzer' => 'french',
                                ],
                                'label' => [
                                    'type' => 'text',
                                    'index' => false,
                                ],
                            ],
                        ],
                        'length_or_diameter' => [
                            'type' => 'scaled_float',
                            'scaling_factor' => 1000,
                        ],
                        'depth_or_width' => [
                            'type' => 'scaled_float',
                            'scaling_factor' => 1000,
                        ],
                        'height_or_thickness' => [
                            'type' => 'scaled_float',
                            'scaling_factor' => 1000,
                        ],
                        
                        // ALIASES
                        'titre' => [
                            'type' => 'alias',
                            'path' => 'title_or_designation'
                        ],
                        'bibliographie' => [
                            'type' => 'alias',
                            'path' => 'bibliography'
                        ],
                        'biblio' => [
                            'type' => 'alias',
                            'path' => 'bibliography'
                        ],
                        'acquisition' => [
                            'type' => 'alias',
                            'path' => 'acquisition_origin'
                        ],
                        'date_acquisition' => [
                            'type' => 'alias',
                            'path' => 'acquisition_date'
                        ],
                        'inventaire' => [
                            'type' => 'alias',
                            'path' => 'inventory_id'
                        ],
                        'ancien_inventaire' => [
                            'type' => 'alias',
                            'path' => 'legacy_inventory_number'
                        ],
                        'auteur' => [
                            'type' => 'alias',
                            'path' => 'authors.last_name'
                        ],
                        'période' => [
                            'type' => 'alias',
                            'path' => 'period_name'
                        ],
                        'année' => [
                            'type' => 'alias',
                            'path' => 'conception_year'
                        ],
                        'matériaux' => [
                            'type' => 'alias',
                            'path' => 'materials.name'
                        ],
                        'type' => [
                            'type' => 'alias',
                            'path' => 'product_types.name'
                        ],
                    ]
                ]
            ]

        ]

    ]

];
