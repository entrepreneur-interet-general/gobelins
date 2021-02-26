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

@formField('checkbox', [
    'name' => 'dark_bg',
    'label' => 'Fond noir'
])
