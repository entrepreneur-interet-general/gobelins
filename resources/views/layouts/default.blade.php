<!DOCTYPE html>
<html dir="ltr" lang="fr-FR" class="no-js @yield('html_classes')">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" type="text/css">
</head>
<body>
    @yield('content')
    
    <script src="{{ mix('/js/bootstrap.js') }}"></script>
</body>
</html>
