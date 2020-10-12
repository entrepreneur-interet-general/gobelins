@formField('radios', [
    'name' => 'columns',
    'label' => 'Colonnage',
    'default' => 3,
    'inline' => true,
    'options' => [
        [
            'value' => 2,
            'label' => '2 colonnes'
        ],
        [
            'value' => 3,
            'label' => '3 colonnes'
        ],
    ]
])

@formField('repeater', [
    'type' => 'generic_grid_item',
    'label' => 'Colonnes',
])

@formField('checkbox', [
    'name' => 'dark_bg',
    'label' => 'Fond noir'
])
