@formField('wysiwyg', [
    'name' => 'body',
    'label' => 'Texte',
    'toolbarOptions' => [
        'bold',
        'italic',
        ["script" => "super"],
        ["script" => "sub"],
        'link',
        "clean",
    ],
])

@formField('radios', [
    'name' => 'image_alignment',
    'label' => 'Alignement image',
    'default' => 'right',
    'inline' => true,
    'options' => [
        [
            'value' => 'right',
            'label' => 'droite'
        ],
        [
            'value' => 'left',
            'label' => 'Gauche'
        ],
    ]
])

@formField('medias', [
    'name' => 'media',
    'label' => 'Images',
    'max' => 6,
])
