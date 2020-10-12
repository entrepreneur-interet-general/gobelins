<!DOCTYPE html>
<html dir="ltr" lang="fr-FR" class="no-js BlocksLayout @yield('html_classes')">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ mix('css/blocks.css') }}" rel="stylesheet" type="text/css">
</head>

<body>
    @yield('content')
</body>

</html>