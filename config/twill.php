<?php

return [
    'locale' => 'fr',
    'fallback_locale' => 'en',
    'block_editor' => [
        'block_preview_render_childs' => false,
        'use_twill_blocks' => false,
        'blocks' => [
            'heading2' => [
                'title' => 'Intertitre',
                'icon' => 'text',
                'component' => 'a17-block-heading2',
            ],
            'single_col_text' => [
                'title' => 'Texte',
                'icon' => 'text',
                'component' => 'a17-block-single_col_text',
            ],
            'double_col_text' => [
                'title' => 'Texte sur 2 colonnes',
                'icon' => 'text-2col',
                'component' => 'a17-block-double_col_text',
            ],
            // 'centered_text' => [
            //     'title' => 'Texte centré',
            //     'icon' => 'quote',
            //     'component' => 'a17-block-centered_text',
            // ],
            'highlighted_text' => [
                'title' => 'Texte mis en exergue',
                'icon' => 'text',
                'component' => 'a17-block-highlighted_text',
            ],
            'text_image' => [
                'title' => 'Texte et image',
                'icon' => 'image-text',
                'component' => 'a17-block-text_image',
            ],
            'centered_image' => [
                'title' => 'Image centrée',
                'icon' => 'image',
                'component' => 'a17-block-centered_image',
            ],
            'product_grid' => [
                'title' => 'Grille d’objets',
                'icon' => 'flex-grid',
                'component' => 'a17-block-product_grid',
            ],
            'definition' => [
                'title' => 'Définition',
                'icon' => 'text',
                'component' => 'a17-block-definition',
            ],
            'generic_grid' => [
                'title' => 'Grille',
                'icon' => 'fix-grid',
                'component' => 'a17-block-generic_grid',
            ],
            'embed' => [
                'title' => 'Code (embed video…)',
                'icon' => 'text',
                'component' => 'a17-block-embed',
            ],
        ],
        'crops' => [
            'side_images' => [
                'default' => [
                    [
                        'name' => 'default',
                        // 'ratio' => 16 / 9,
                        'minValues' => [
                            'width' => 100,
                            'height' => 100,
                        ],
                    ],
                ],
            ],
            'generic_grid_image' => [
                'default' => [
                    [
                        'name' => 'default',
                        // 'ratio' => 1,
                        'minValues' => [
                            'width' => 100,
                            'height' => 100,
                        ],
                    ],
                ],
            ],
            'centered_image' => [
                'desktop' => [
                    [
                        'name' => 'desktop',
                        // 'ratio' => 16 / 9,
                        'minValues' => [
                            'width' => 100,
                            'height' => 100,
                        ],
                    ],
                ],
                'tablet' => [
                    [
                        'name' => 'tablet',
                        // 'ratio' => 4 / 3,
                        'minValues' => [
                            'width' => 100,
                            'height' => 100,
                        ],
                    ],
                ],
                'mobile' => [
                    [
                        'name' => 'mobile',
                        // 'ratio' => 1,
                        'minValues' => [
                            'width' => 100,
                            'height' => 100,
                        ],
                    ],
                ],
            ],
        ],
        'repeaters' => [
            'generic_grid_item' => [
                'title' => 'Bloc',
                'icon' => 'image-text',
                'trigger' => 'Ajouter un bloc',
                'component' => 'a17-block-generic_grid_item',
            ],
        ],
        'browser_route_prefixes' => [
            'products' => 'collection',
        ],
    ],
    'media_library' => [
        'extra_metadatas_fields' => [
            [
                'name' => 'credit',
                'label' => 'Crédits photo',
                'type' => 'text',
            ],
        ],
    ],
    'enabled' => [
        'buckets' => true,
    ],
    // 'bucketsRoutes' => [
    //     'homepage' => 'encyclopedie',
    // ],
    'buckets' => [
        'homepage' => [
            'name' => 'Accueil',
            'buckets' => [
                'home_primary_features' => [
                    'name' => 'À la une',
                    'bucketables' => [
                        [
                            'module' => 'articles',
                            'name' => 'Articles',
                            'scopes' => ['published' => true],
                        ],
                    ],
                    'max_items' => 3,
                ],
                'home_secondary_features' => [
                    'name' => 'Six premiers',
                    'bucketables' => [
                        [
                            'module' => 'articles',
                            'name' => 'Articles',
                            'scopes' => ['published' => true],
                        ],
                    ],
                    'max_items' => 6,
                ],
            ],
        ],
    ],

    // 'glide' => [
    //     'default_params' => [

    //     ]
    // ]

];
