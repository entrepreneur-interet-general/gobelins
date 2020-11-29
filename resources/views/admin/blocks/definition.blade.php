@formField('input', [
    'name' => 'term',
    'label' => 'Terme à définir',
])

@formField('input', [
    'name' => 'description',
    'label' => 'Définition',
    'type' => 'textarea',
    'rows' => 2,
])

@formField('checkbox', [
    'name' => 'dark_bg',
    'label' => 'Fond noir'
])
