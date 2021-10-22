@formField('wysiwyg', [
    'name' => 'body',
    'label' => 'Exergue',
    'toolbarOptions' => [
        'bold',
        'italic',
        ["color" => "#7c7c7c"],
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
