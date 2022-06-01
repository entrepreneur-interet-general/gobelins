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

    @formField('medias', [
        'name' => 'cover',
        'label' => 'Image de couverture',
        'note' => 'Aussi utilisé dans les pages de rubrique',
    ])


    @formField('tags', [
        'label' => "Étiquettes",
        'note' => "Mettre une majuscule au premier mot, rester concis.",
    ])

    @formField('select', [
        'name' => 'section_id',
        'label' => 'Rubrique',
        'unpack' => true,
        'options' => $sections,
    ])

    @formField('input', [
        'name' => 'reading_time',
        'label' => 'Temps de lecture',
        'type' => 'number',
        'note' => 'Estimez le temps que prendrait la lecture de cet article, en minutes.'
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

        @formField('block_editor', [
            'withoutSeparator' => true,
        ])

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

        @formField('browser', [
            'routePrefix' => 'encyclopedie',
            'moduleName' => 'articles',
            'name' => 'related',
            'label' => 'Mises en avant',
            'max' => 3,
            'note' => 'Ajoutez jusqu’a 3 articles',
            'fieldNote' => 'Par défaut, 3 articles de la même rubrique seront mis en avant'
        ])

    @endformFieldset

@stop
