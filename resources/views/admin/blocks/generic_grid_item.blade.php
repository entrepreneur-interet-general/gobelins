
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
        ["header"=> "3" ],
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
