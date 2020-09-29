@extends('twill::layouts.form', [
    'contentFieldsetLabel' => 'Couverture',
    'additionalFieldsets' => [
        ['fieldset' => 'body', 'label' => 'Corps de page'],
        ['fieldset' => 'footer', 'label' => 'Pied de page'],
    ]
])

@section('contentFields')

    @formField('input', [
        'name' => 'subtitle',
        'label' => 'Sous-titre',
    ])

    @formField('input', [
        'name' => 'byline',
        'label' => 'Auteur(s)',
        'note' => 'Par X, Y, & Z',
    ])

    @formField('tags', [
        'label' => "Étiquettes"
    ])

    @formField('select', [
        'name' => 'section_id',
        'label' => 'Rubrique',
        'unpack' => true,
        'options' => $sections,
    ])

    @formField('wysiwyg', [
        'name' => 'lead',
        'label' => 'Introduction',
        'toolbarOptions' => [
            'bold',
            'italic',
            ["script" => "super"],
            ["script" => "sub"],
            ['list' => 'ordered'],
            ['list' => 'bullet'],
            ['indent' => '-1'],
            ['indent' => '+1'],
            ["align" => []],
            ["direction" => "rtl"],
            'link',
            "clean",
        ],
    ])

@stop

@section('fieldsets')

    @formFieldset(['id' => 'body', 'title' => 'Corps de page'])

        @formField('block_editor')

    @endformFieldset


    @formFieldset(['id' => 'footer', 'title' => 'Pied de page'])

        @formField('wysiwyg', [
            'name' => 'footnotes',
            'label' => 'Notes de pied de page',
            'toolbarOptions' => [
                'bold',
                'italic',
                ["script" => "super"],
                ["script" => "sub"],
                'link',
                "clean",
            ],
        ])

        @formField('wysiwyg', [
            'name' => 'bibliography',
            'label' => 'Bibliographie',
            'toolbarOptions' => [
                'bold',
                'italic',
                ["script" => "super"],
                ["script" => "sub"],
                'link',
                "clean",
            ],
        ])

    @endformFieldset

@stop
