<?php

return [
    'locale' => 'fr',
    'fallback_locale' => 'en',
    'block_editor' => [
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
        ],
        'repeaters' => [
        ],
        'browser_route_prefixes' => [
            'products' => 'collection',
        ],
    ],

];
