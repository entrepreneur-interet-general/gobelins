
@formField('medias', [
    'name' => 'media',
    'label' => 'Image',
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
