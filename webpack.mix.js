let mix = require("laravel-mix");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const webpackPlugins = [new LodashModuleReplacementPlugin()];

if (process.env.MIX_ENABLE_BUNDLE_ANALYZER) {
  webpackPlugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "../storage/app/public/report.html",
      generateStatsFile: true,
      openAnalyzer: false,
      statsFilename: "../storage/app/public/stats.json"
    })
  );
}

mix
  .react("resources/assets/js/bootstrap.js", "public/js")
  .sass("resources/assets/sass/app.scss", "public/css")
  .webpackConfig({
    plugins: webpackPlugins
  })
  .options({
    processCssUrls: false,
    hmrOptions: {
      // host: "gobelins.test",
      host: "127.0.0.1",
      port: 8080
    }
  })
  .extract(); // Auto-magically split out vendor JS.

if (mix.inProduction()) {
  mix.version();
}
