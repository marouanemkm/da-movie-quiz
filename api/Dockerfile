# syntax=docker/dockerfile:1

FROM dunglas/frankenphp:1-php8.4

WORKDIR /app

# Dépendances système nécessaires
RUN apt-get update && apt-get install --no-install-recommends -y \
    acl \
    file \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Extensions PHP nécessaires
RUN install-php-extensions \
    @composer \
    intl \
    opcache \
    zip \
    redis \
    pdo_pgsql

# Copie des fichiers d'app (avant install)
COPY --link . ./

# Config PHP/Caddy
COPY --link frankenphp/conf.d/app.ini $PHP_INI_DIR/conf.d/
COPY --link --chmod=755 frankenphp/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
COPY --link frankenphp/Caddyfile /etc/caddy/Caddyfile

# Installation des dépendances Symfony
RUN composer install --prefer-dist --no-progress --no-scripts

# Gérer le cache Symfony (safe car bin/console est là)
RUN mkdir -p var/cache var/log && chmod -R 777 var && \
    composer run-script post-install-cmd || true

ENTRYPOINT ["docker-entrypoint"]

HEALTHCHECK --start-period=60s CMD curl -f http://localhost:2019/metrics || exit 1

CMD [ "frankenphp", "run", "--config", "/etc/caddy/Caddyfile", "--watch" ]
