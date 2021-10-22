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

@formField('checkbox', [
    'name' => 'dark_bg',
    'label' => 'Fond noir'
])
