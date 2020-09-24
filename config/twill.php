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
        ],
        'repeaters' => [
        ],
        'browser_route_prefixes' => [
            'products' => 'collection',
        ],
    ],

];
