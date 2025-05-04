#!/bin/bash

# Instalar el paquete JWT Auth
composer require php-open-source-saver/jwt-auth

# Publicar la configuración
php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"

# Generar el secret key para JWT
php artisan jwt:secret

# Ejecutar migraciones
php artisan migrate
