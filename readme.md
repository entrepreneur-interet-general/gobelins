## Gobelins

Gobelins is the main back-end application for the Gobelins project, an initiative to make accessible the
collections of the Mobilier National, as described <a href="https://entrepreneur-interet-general.etalab.gouv.fr/defi/2017/09/26/gobelins/">here</a>.

Documentation: coming soon :)

### Development setup
First get the source by executing the command which will clone the repository :
```shell
composer create-project entrepreneur-interet-general/gobelins gobelins "dev-master" --repository='{"type": "vcs", "url": "git@github.com:Novactive/MN-gobelins-laravel.git"}' 
```

Download the following DB dump and save it as `provisioning/dev/db/mn.lab.database.dump` directory : 
https://docs.google.com/uc?export=download&id=1sh233rN-12w5glQPcdoqGjQM8piaVKXJ

Run the following command to create the local development docker stack :
```shell
make create
```

Once done, the application should be accessible from the following urls :
* http://localhost:39080/ (dev mode with debug)  
* http://localhost:39081/ (prod mode)

### Importing products from the Gobelin-datasource API

```shell
php artisan gobelins:import -vvv
```

Interrupt process with `Ctrl-C`, it will gracefully exit.
You may then resume the import starting from a given page:

```shell
php artisan gobelins:import -vvv --from=58
```

### Re-indexing Elasticsearch:

```shell
php artisan scout:flush "App\Models\Product"
php artisan scout:import "App\Models\Product"
```

### Cache stategy

#### Image caching

The images should hardely ever change, so we set up a request cache at the HTTP server level,
so we only need to generate images once.
Nginx will cache whatever result is outputted from the Image controller.
For more configuration information, see the [gobelins-devops](https://github.com/entrepreneur-interet-general/gobelins-devops) repository.

#### Response cache

…TODO…

### Credits

- Laurie Chapotte, design
- Ned Baldessin, development

### License

The Gobelins application is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

Copyright © 2018 Ministère de la Culture et de la Communication
Mobilier national et manufactures des Gobelins, de Beauvais et de la Savonnerie.
