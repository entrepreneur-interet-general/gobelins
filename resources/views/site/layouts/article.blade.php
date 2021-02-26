<!DOCTYPE html>
<html dir="ltr" lang="fr-FR" class="no-js ArticleLayout @yield('html_classes')">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ mix('css/article.css') }}" rel="stylesheet" type="text/css">
</head>

<body>
    @yield('content')

    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/article.js') }}"></script>

</body>

</html>