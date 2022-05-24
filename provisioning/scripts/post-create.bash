#!/usr/bin/env bash
cd project
composer install
curl -XPUT -H "Content-Type: application/json" http://es:9200/_all/_settings -d '{"index.blocks.read_only_allow_delete": null}'
php artisan scout:flush "App\Models\Product"
php artisan scout:import "App\Models\Product"
yarn
yarn run production
