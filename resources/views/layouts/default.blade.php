<!DOCTYPE html>
<html dir="ltr" lang="fr-FR" class="no-js @yield('html_classes')">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <title>Collection du Mobilier national</title>

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ff4747">
    <meta name="theme-color" content="#ffffff">

    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" type="text/css">
</head>
<body>
    @yield('content')
    
    <script src="{{ mix('/js/bootstrap.js') }}"></script>

    @if (true || app()->environment('production'))
        <!-- Matomo -->
        <script type="text/javascript">
            var _paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
                var u="//gobelins-stats.eig-apps.org/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '2']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
        </script>

        <script>
            var currentUrl = location.href;
            window.document.documentElement.addEventListener('gobelins_analytics_pagechange', function() {
                console.log('Event gobelins_analytics_pagechange');   
                
                // _paq.push(['setReferrerUrl', currentUrl]);
                // currentUrl = '' + window.location.href;
                // _paq.push(['setCustomUrl', currentUrl]);
                // _paq.push(['setDocumentTitle', window.document.title]);

                // // remove all previously assigned custom variables, requires Matomo (formerly Piwik) 3.0.2
                // // _paq.push(['deleteCustomVariables', 'page']);
                // _paq.push(['setGenerationTimeMs', 0]);
                // _paq.push(['trackPageView']);

                // // make Matomo aware of newly added content
                // _paq.push(['enableLinkTracking']);
            });
        </script>
        <!-- End Matomo Code -->
    @endif

</body>
</html>
