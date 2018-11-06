let mix = require("laravel-mix");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

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

mix
  .react("resources/assets/js/app.jsx", "public/js")
  .sass("resources/assets/sass/app.scss", "public/css");
// .webpackConfig({
//   plugins: [
//     new BundleAnalyzerPlugin({
//       analyzerMode: "static",
//       reportFilename: "../storage/app/public/report.html",
//       generateStatsFile: true,
//       statsFilename: "../storage/app/public/stats.json"
//     })
//   ]
// });
// .options({
//   hmrOptions: {
//     host: "gobelins.test",
//     port: 8080
//   }
// });
