@extends('twill::layouts.form')

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

@formField('tags',
[
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

@formField('block_editor')

@stop