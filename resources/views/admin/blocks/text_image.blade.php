@formField('wysiwyg', [
    'name' => 'body',
    'label' => 'Texte',
    'toolbarOptions' => [
        'bold',
        'italic',
        ["color" => "#7c7c7c"],
        ["script" => "super"],
        ["script" => "sub"],
        "blockquote",
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
    'name' => 'side_images',
    'label' => 'Images',
    'max' => 6,
])

@formField('checkbox', [
    'name' => 'dark_bg',
    'label' => 'Fond noir'
])
