
@formField('medias', [
    'name' => 'generic_grid_image',
    'label' => 'Image',
    'withVideoUrl' => false,
])

@formField('checkbox', [
    'name' => 'circled_image',
    'label' => 'Image ronde'
])

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
