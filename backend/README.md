## Participante
Obed Gonzalez Hernandez

## Despliegue
Para desplegar este proyecto, debes clonar este repositorio:
``` bash
git clone https://github.com/monkho/Gobierno-Digital.git
```
Una vez clonado, navega dentro de la carpeta y ejecuta el comando: 
``` bash
composer install
```
Este comando inicializa el proyecto e instala sus dependencias. 

Despues cambiar la variable de entorno donde se ubica la base de datos por lo siguiente, (deberas crear un archivo .env en la raiz del proyecto, en caso de que no exista):
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gobierno_digital
DB_USERNAME=root
DB_PASSWORD=
```
Ejecutar el comando:
``` bash
php artisan migrate
```
Y aceptar la creación de la base de datos.
una vez terminado este proceso ejecuta el siguiente comando:
``` bash
composer run dev
```
> [!NOTE]
> Cabe aclarar que es necesario tener instalado **composer**, **laravel**, **artisan**, **xampp** (para MySQL) y **Postman** para hacer las consultas. Asi como el servicio de MySQL ejecutando en Xampp

Lo que va a iniciar un servidor en `localhost:8000` 
## Observaciones generales
Considero que la propuesta de base de datos contiene una tabla innecesaria, pues la relación entre las tablas `user` y `role` es una relación M-1, es decir, que la tabla `user` debe contener la llave foránea para el rol que se desee asignar. \
Estoy consciente que aún me falta mucho camino por recorrer, y con un poco más de background dentro de Laravel, pude haber realizado de la mejor manera esta prueba.

Lamentablemente, no logre hacer una funcionalidad completa, es decir, el proyecto esta bastante roto :').
