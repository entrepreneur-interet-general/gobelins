@extends('twill::layouts.form', ['contentFieldsetLabel' => 'Données SCOM'])

@section('contentFields')
@formField('input', [
'name' => 'first_name',
'label' => 'Prénom',
'placeholder' => 'Jean',
])
@formField('input', [
'name' => 'last_name',
'label' => 'Nom',
'placeholder' => 'Dupond',
])
@formField('date_picker', [
'name' => 'date_of_birth',
'label' => 'Date de naissance',
'translated' => false,
'withTime' => false,
'altFormat' => 'j F Y',
])
@formField('date_picker', [
'name' => 'date_of_death',
'label' => 'Date de mort',
'translated' => false,
'withTime' => false,
'altFormat' => 'j F Y',
])
@formField('input', [
'name' => 'birthplace',
'label' => 'Lieu de naissance',
])
@formField('input', [
'name' => 'deathplace',
'label' => 'Lieu de mort',
])
@formField('input', [
'name' => 'isni_uri',
'label' => 'ISNI',
'note' => 'Lien complet vers la ressource',
'placeholder' => 'Exemple : http://isni.org/isni/0000000140350521',
])
@stop