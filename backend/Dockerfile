FROM php:8.2-fpm

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev

# Instalar extensiones PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Instalar extensión para JWT
RUN pecl install -o -f redis \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

# Copiar script de instalación JWT
COPY docker/jwt-setup.sh /usr/local/bin/jwt-setup.sh
RUN chmod +x /usr/local/bin/jwt-setup.sh

# Instalar dependencias del proyecto
RUN composer install

# Permisos para storage y bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 8000

# Ejecutar script de instalación JWT y luego iniciar el servidor
CMD /usr/local/bin/jwt-setup.sh && php artisan serve --host=0.0.0.0 --port=8000
