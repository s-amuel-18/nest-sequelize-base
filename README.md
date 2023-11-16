<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
  Proyecto base en Nest.js y sequelize
</p>
    <!-- <p align="center"> -->

## Descripción

Proyecto base en Nest.js, TypeScript e integrado con sequelize.

## Dependencias del proyecto

1. [Node.js](https://nodejs.org/en/download) (Versión LTS)
2. [Doker](https://www.docker.com/products/docker-desktop/)

## Instalación

```bash
$ npm install
```

## Configuración principal

1. Copiar archivo `.env.template` y renombrar por `.env`

## Ejecución de la aplicación

```bash
# Instalación de imágenes correspondientes y subida de contenedores
$ docker-compose up -d

# Ejecución de aplicación en modo watch
$ npm run start:dev

# Ejecución de migraciones para la creación de tablas
$ npx sequelize db:migrate

# Ejecución de seeders para la creación de data necesaria
$ npx sequelize db:seed
```

## Documentación de la API

El proyecto está documentado con [Swagger](https://swagger.io/docs/) siguiendo las practicas de OpenApi, la documentación de los endpoint se encuentra en la ruta.

Ruta de documentación: `/api`

## Base de datos y creación de tablas

El proyecto implementa [Sequelize](https://sequelize.org/) como ORM y [Sequelize CLI](https://sequelize.org/docs/v7/cli/) para el control y gestión de migraciones.

### Comandos básicos

```bash
# creación de migración
$ npx sequelize migration:generate --name create_NOMBRE_TABLA_table

# Alteración de campos de una tabla
$ npx sequelize migration:generate --name alter_NOMBRE_TABLA_table

# creación de seeder
$ npx sequelize seed:generate --name seed_NOMBRE_SEEDER

# Ejecución de migraciones
$ npx sequelize db:migrate

# Ejecución de seeders
$ npx sequelize db:seed
```
