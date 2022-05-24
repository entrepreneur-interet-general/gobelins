#!/usr/bin/env bash

ORIGPASSWD=$(cat /etc/passwd | grep www-data)
ORIG_UID=$(echo "$ORIGPASSWD" | cut -f3 -d:)
ORIG_GID=$(echo "$ORIGPASSWD" | cut -f4 -d:)
ORIG_HOME=$(echo "$ORIGPASSWD" | cut -f6 -d:)
DEV_UID=${DEV_UID:=$ORIG_UID}
DEV_GID=${DEV_GID:=$ORIG_GID}

if [ "$DEV_UID" -ne "$ORIG_UID" ] || [ "$DEV_GID" -ne "$ORIG_GID" ]; then
    groupmod -g "$DEV_GID" www-data
    usermod -u "$DEV_UID" -g "$DEV_GID" www-data
fi

# Create .composer in advance and set the permissions
mkdir -p /var/www/.ssh && chown www-data:www-data /var/www/.ssh
mkdir -p /var/www/.composer && chown www-data:www-data /var/www/.composer
mkdir -p /var/www/.cache && chown www-data:www-data /var/www/.cache
mkdir -p /var/www/.npm && chown www-data:www-data /var/www/.npm
touch /var/www/.yarnrc && chown www-data:www-data /var/www/.yarnrc
touch /var/www/.babel.json && chown www-data:www-data /var/www/.babel.json
chown www-data:www-data /var/www/html/project

# give the good permissions to www-data in the container and remove the cache on start
chown -R www-data:www-data /var/www/html/project/bootstrap/cache
chown -R www-data:www-data /var/www/html/project/storage
chown -R www-data:www-data /var/www/html/project/public

exec "$@"
