## Gobelins

Gobelins is the main back-end application for the Gobelins project, an initiative to make accessible the
collections of the Mobilier National, as described <a href="https://entrepreneur-interet-general.etalab.gouv.fr/defi/2017/09/26/gobelins/">here</a>.

Documentation: coming soon :)

### Development setup
```shell
$ php artisan migrate
$ php artisan db:seed --class=ProductTypeSeeder
$ php artisan es:indices:create
```

Importing products from the Gobelin-datasource API
```shell
$ php artisan gobelins:import -vvv
```
Interrupt process with `Ctrl-C`, it will gracefully exit.
You may then resume the import starting from a given page:
```shell
$ php artisan gobelins:import -vvv --from=58
```

To re-index Elasticsearch:
```shell
php artisan scout:flush "App\Models\Product"
php artisan scout:import "App\Models\Product"
```
#### Credits

- Laurie Chapotte, design
- Ned Baldessin, development

### License

The Gobelins application is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

Copyright © 2018 Ministère de la Culture et de la Communication
Mobilier national et manufactures des Gobelins, de Beauvais et de la Savonnerie.
