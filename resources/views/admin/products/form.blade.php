@extends('twill::layouts.form', ['contentFieldsetLabel' => 'Données SCOM'])

@section('contentFields')
@formField('input', [
'name' => 'category',
'label' => 'Catégorie',
//'readonly' => true,
])
@formField('input', [
'name' => 'denomination',
'label' => 'Dénomination',
//'readonly' => true,
])
@formField('input', [
'name' => 'title_or_designation',
'label' => 'Titre ou désignation',
//'readonly' => true,
])
@formField('input', [
'name' => 'height_or_thickness',
'label' => 'Hauteur ou épaisseur',
'note' => 'en mètres',
//'readonly' => true,
])
@formField('input', [
'name' => 'length_or_diameter',
'label' => 'Longeur ou diamètre',
'note' => 'en mètres',
//'readonly' => true,
])
@formField('input', [
'name' => 'depth_or_width',
'label' => 'Profondeur ou largeur',
'note' => 'en mètres',
//'readonly' => true,
])
@formField('input', [
'name' => 'description',
'label' => 'Description',
'type' => 'textarea',
'rows' => 7,
//'readonly' => true,
])
@formField('input', [
'name' => 'conception_year',
'label' => 'Année de conception',
//'readonly' => true,
])
@formField('input', [
'name' => 'acquisition_origin',
'label' => 'Acquisition',
//'readonly' => true,
])
@formField('date_picker', [
'name' => 'acquisition_date',
'label' => 'Date d’acquisition',
'altFormat' => 'j F Y',
'translated' => false,
'withTime' => false,
//'readonly' => true,
])
@formField('checkbox', [
'name' => 'listed_as_historic_monument',
'label' => 'Classé monument historique',
//'readonly' => true,
])
@formField('date_picker', [
'name' => 'listed_on',
'label' => 'Date de classement MH',
//'readonly' => true,
])
@formField('select', [
'name' => 'period_id',
'label' => 'Époque',
// 'unpack' => true,
//'readonly' => true,
'options' => $periods,
])
@formField('select', [
'name' => 'product_type_id',
'label' => 'Type',
// 'unpack' => true,
//'readonly' => true,
'options' => $product_types,
])
@formField('select', [
'name' => 'style_id',
'label' => 'Style',
// 'unpack' => true,
//'readonly' => true,
'options' => $styles,
])
@formField('select', [
'name' => 'production_origin_id',
'label' => 'Manufacture et atelier',
// 'unpack' => true,
//'readonly' => true,
'options' => $production_origins,
])
@formField('select', [
'name' => 'entry_mode_id',
'label' => 'Mode d’acquisition',
// 'unpack' => true,
//'readonly' => true,
'options' => $entry_modes,
])
@formField('input', [
'name' => 'bibliography',
'label' => 'Bibliographie',
'type' => 'textarea',
'rows' => 7,
//'readonly' => true,
])
@stop