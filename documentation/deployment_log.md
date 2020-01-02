# Journal de mise en production

## _En attente_

1. Rafraîchir les images de listing des sélections :

   `$ php artisan gobelins:refresh-selections`

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
