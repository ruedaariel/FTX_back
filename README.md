# FTX-FitnessTrainingExperience
Diseño de web para trabajo Final OFS

Nuestro desarrollo se centra en la gestión de un emprendimiento de personal trainer. 
Éste no sólo optimiza el trabajo, sino que también abre nuevas oportunidades para generar ingresos. 
La plataforma permitiría ofrecer suscripciones premium con acceso exclusivo a rutinas avanzadas, 
dietas personalizadas y reportes detallados de progreso. Además, se podrían implementar servicios adicionales, 
como asesorías en línea o contenido educativo exclusivo, que serían monetizados.


***************************************************************************************
Integrantes:

Leandro Rueda  --  Gladys Herrera  --  Ariel Rueda

***************************************************************************************

***************************************************************************************
link a drive del proyectoFTX

https://drive.google.com/drive/folders/1IIcywfQIcg7TSjvEWzooir0hSReSqH9t?usp=drive_link
***************************************************************************************

***************************************************************************************
link a figma del proyectoFTX

https://www.figma.com/design/zwNBf6TDoWaksKI3M2e3kZ/FTX?node-id=91-524&t=CgLWjRqYg9zsOKI2-0
***************************************************************************************

***************************************************************************************
link a Trello del proyectoFTX

https://trello.com/b/6YUu1pyr/ftx
***************************************************************************************

***************************************************************************************
link a Carpeta avances Sprint 

https://drive.google.com/drive/folders/15KrbbVwYZnNYGT89tFmmdOzP_D8HUAJw

***************************************************************************************


# FTX:back

Backend para la plataforma FTX, orientada a la gestión integral de entrenadores personales y sus clientes.

---

##  Descripción

Este backend desarrollado con NestJS sirve como motor de operaciones para una plataforma frontend, realizando peticiones sobre una base de datos MySQL. Permite gestionar usuarios, rutinas, planes, pagos y autenticación, ofreciendo una API robusta para aplicaciones web y móviles.

---

##  Tecnologías utilizadas

- NestJS
- TypeORM
- MySQL
- JWT (autenticación)
- Swagger (documentación de API)
- Nodemailer
- Multer
- ESLint + Prettier


##  Requisitos previos

- Node.js (v18+)
- MySQL (local o remoto)
- Railway (para despliegue)
- Editor compatible con TypeScript (VSCode recomendado)

---

##  Instalación local

> El proyecto ya está desplegado en Railway, pero para correrlo localmente:

1. Clonar el repositorio:
   
   git clone https://github.com/ruedaariel/FTX-back.git
   cd FTX-back

##  Instalar dependencias

    npm install

##  Configurar variables de entorno en un archivo .env

    PORT=8000
    HOST=localhost
    BACKEND_URL=http://localhost:8000
    API_BASE_URL=/interchange.proxy.rlwy.net/apiFtx

    DB_HOST=interchange.proxy.rlwy.net
    DB_PORT=47529
    DB_USER=root
    DB_PASS=
    DB_NAME=railway
    DB_MIGRATIONS_RUN=false

##  Ejecutar el servidor

    npm run start:dev

##  Autenticacion

    El sistema utiliza JWT para login y protección de rutas privadas. Los tokens se generan al iniciar sesión y se validan en cada petición protegida.
    la seguridad se maneja con JWT + Guards por rol/nivel, y el proyecto se apoya en Express para la capa HTTP y middlewares.

##  Base de Datos

    Motor: MySQL

    ORM: TypeORM

    Migraciones: habilitadas con scripts personalizados: npm run migration:generate
    npm run migration:run

##  Endpoints principales

    ## Usuario
    POST /apiFtx/usuario/register
    GET /apiFtx/usuario/all
    PATCH /apiFtx/usuario/update/{id}
    DELETE /apiFtx/usuario/delete/{id}

    ## Planes
    POST /apiFtx/plan/register
    GET /apiFtx/plan/all
    PATCH /apiFtx/plan/update/{id}

    ## Rutinas
    POST /apiFtx/rutina/register
    GET /apiFtx/rutina/all
    PUT /apiFtx/rutina/update/{id}
    DELETE /apiFtx/rutina/delete/{id}

    ## Pagos
    POST /apiFtx/pagos/manual
    GET /apiFtx/pagos
    GET /apiFtx/pagos/impagos

    ##Autenticación
    POST /apiFtx/auth/login
    POST /apiFtx/auth/reset

    También se incluyen DTOs para validación y estructuras de datos como CreateUsuarioDto, UpdatePlanDto, CreateRutinaDto, entre otros.

##  Despliegue

    El backend está desplegado en Railway, con conexión directa a una base de datos MySQL gestionada en la misma plataforma. Las variables de entorno están configuradas para producción


##  Autores

    Gladys Herrera
    Leandro Rueda
    Ariel Rueda