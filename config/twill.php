<?php

return [
    'locale' => 'fr',
    'fallback_locale' => 'en',
    'block_editor' => [
        'block_preview_render_childs' => false,
        'blocks' => [
            'heading2' => [
                'title' => 'Intertitre',
                'icon' => 'text',
                'component' => 'a17-block-heading2',
            ],
            'product_grid' => [
                'title' => 'Grille d’objets',
                'icon' => 'flex-grid',
                'component' => 'a17-block-product_grid',
            ],
            'centered_text' => [
                'title' => 'Texte centré',
                'icon' => 'quote',
                'component' => 'a17-block-centered_text',
            ],
            'centered_image' => [
                'title' => 'Image centrée',
                'icon' => 'image',
                'component' => 'a17-block-centered_image',
            ],
            'double_col_text' => [
                'title' => 'Texte sur 2 colonnes',
                'icon' => 'text-2col',
                'component' => 'a17-block-double_col_text',
            ],
            'definition' => [
                'title' => 'Définition',
                'icon' => 'text',
                'component' => 'a17-block-definition',
            ],
            'text_image' => [
                'title' => 'Texte et image',
                'icon' => 'image-text',
                'component' => 'a17-block-text_image',
            ],
            'generic_grid' => [
                'title' => 'Grille',
                'icon' => 'fix-grid',
                'component' => 'a17-block-generic_grid',
            ],
            'embed' => [
                'title' => 'Code',
                'icon' => 'text',
                'component' => 'a17-block-embed',
            ],
            'highlighted_text' => [
                'title' => 'Texte mis en exergue',
                'icon' => 'text',
                'component' => 'a17-block-highlighted_text',
            ],
        ],
        'crops' => [
            'side_images' => [
                'default' => [
                    [
                        'name' => 'default',
                        'ratio' => 16 / 9,
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

];
