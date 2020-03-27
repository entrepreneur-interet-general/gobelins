# Journal de mise en production

## En attente

0. Deploy gobelins, comme d'habiture.

1. Deploy gobelins-datasource :
   `$ ansible-playbook --vault-password-file=vault_password -i inventory/<production> deploy-datasource.yml --limit=production`

---

2. Sur serveur de prod, copier le dump fourni, et écraser la base :

```
$ scp ned@51.15.165.39:/home/ned/datasource_2020-03-26.dump .
$ sudo su postgres
$ pg_restore -d datastore datastore_2020-03-26.dump
```

---

ou

---

2. Sur le serveur de prod, supprimer manuellement la base utilisée par datasource ("postgres"), et la recréer.

```
$ cd /var/www/datasource/shared/storage/app/scom_latest
$ sudo su -l postgres
$ dropdb postgres
$ createdb postgres -T template1
$ exit
$ cd /var/www/datasource/current
$
```

2. (bis) Lancer l'import sur datasource (sudo pour écrire dans le fichier log) :

```
$ cd /var/www/datasource/current
$ sudo php artisan gobelins:import_scom
```

---

3. Sur prod :

```
$ cd /var/www/gobelins/current
$ php artisan migrate
$ php artisan gobelins:import
$ php artisan gobelins:refresh-selections
$ php artisan es:indices:drop
$ php artisan es:indices:create
$ php artisan scout:import "\App\Models\Product"
```

## Effectué le 2020-02-24

1. Jouer le playbook site.yml (pour les modifs sur la config nginx)

   ```
   $ git pull
   $ ansible-playbook --vault-password-file=vault_password -i inventory/production site.yml --limit=production -K
   ```

2. Créer manuellement le répertoire /var/www/gobelins/shared/sitemaps

   ```
   $ cd /var/www/gobelins
   $ sudo mkdir shared/public/sitemaps
   $ sudo chown nginx:nginx shared/public/sitemaps
   ```

3. Jouer le playbook deploy-gobelins.yml (pour déployer le code)

4. Regénérer les sitemaps

   ```
   $ cd /var/www/gobelins/current
   $ sudo -u nginx
   $ php -d memory_limit:1024M artisan generate:sitemaps
   ```

## Effectué le 2020-02-13

1. Installer un plugin Elasticsearch

   Relancer le playbook Ansible (dans le répertoire `gobelins-devops`) :

   `$ ansible-playbook --vault-password-file=vault_password -i inventory/online elasticsearchservers.yml --limit=staging -K`

   …soit, au besoin, installer manuellement :

   `$ sudo /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-icu`

   …et redémarrer le service Elasticsearch pour prendre en compte le nouveau plugin.

2. Déployer le site

   `$ ansible-playbook --vault-password-file=vault_password -i inventory/online deploy-gobelins.yml --limit=staging -K`

3. Mettre le site en maintenance

   ```
   $ cd /var/www/gobelins/current
   $ php artisan down
   ```

4. Rafraîchir les images de listing des sélections :

   ```
   $ cd /var/www/gobelins/current
   $ php artisan gobelins:refresh-selections
   ```

5. Re-indexer le contenu

   ```
    $ cd /var/www/gobelins/current
    $ php artisan es:indices:drop
    $ php artisan es:indices:create
    $ php artisan scout:import "\App\Models\Product"
   ```

   … cette opération peut prendre approximativement 20-30 minutes.

## Effectué le 2019-12-17

Procédure déployement "Sélections".

1. Configurer de l’envoi des emails (SMTP partagé ? sendmail local ? problèmes de délivrabilité, passage par le proxy… ?)

   → Sur le poste de déployement Ansible :

   → renseigner le fichier template .env pour la prod:
   `gobelins_devops/dotenv_templates/eig-<...>.culture.fr.gobelins.j2`

   → Commit & push

2. Déployer les changements sur le ficher .env

   → Sur le poste de déployement Ansible :

   `$ ansible-playbook --vault-password-file=vault_password -i inventory/production site.yml --limit=production -K`

3. Copier les fichiers CSV de migration sur le serveur de prod

   → copier et décompresser migrate_staging.tgz dans :

   `/var/www/gobelins/shared/migrations`

4. Mettre le site en maintenance

   → Executer sur le serveur de prod :
   `$ cd /var/www/gobelins/current`

   `$ php artisan down`

5. Déployer le code

   → Sur le poste de déployement Ansible :

   `$ ansible-playbook --vault-password-file=vault_password -i inventory/production deploy-gobelins.yml --limit=production -K`

6. Lancer les migrations de BDD

   → Executer sur le serveur de prod :

   `$ cd /var/www/gobelins/current`

   `$ php artisan migrate`

7. Importer les données

   → Sur le serveur de production, éditer les chemins vers les fichiers CSV, et executer le SQL suivant :

   ```sql

    COPY users FROM '/var/www/gobelins/shared/migrations/users.csv' DELIMITER ',' CSV HEADER;

    COPY selections FROM '/var/www/gobelins/shared/migrations/selections.csv' DELIMITER ',' CSV HEADER;

    COPY selection_user FROM '/var/www/gobelins/shared/migrations/selection_user.csv' DELIMITER ',' CSV HEADER;

    COPY product_selection FROM '/var/www/gobelins/shared/migrations/product_selection.csv' DELIMITER ',' CSV HEADER;

    COPY image_selection FROM '/var/www/gobelins/shared/migrations/image_selection.csv' DELIMITER ',' CSV HEADER;

    SELECT setval('selections_id_seq', ( SELECT GREATEST(MAX(id)+1, nextval('selections_id_seq'))-1 FROM selections ));

    SELECT setval('users_id_seq', ( SELECT GREATEST(MAX(id)+1, nextval('users_id_seq'))-1 FROM users ));

   ```
