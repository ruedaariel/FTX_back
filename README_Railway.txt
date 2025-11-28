markdown
#  Despliegue de Backend NestJS en Railway

Este documento describe cómo preparar, configurar y validar el despliegue del backend NestJS en Railway, incluyendo conexión a base de datos, variables de entorno, y solución de errores comunes.

---

##  Requisitos previos

- Proyecto NestJS con TypeORM y MySQL.
- Base de datos Railway creada y poblada (dump importado).
- Repositorio conectado a Railway vía GitHub.

---

## ⚙️ Configuración del proyecto

### 1. `AppModule` sin `envFilePath`

```ts
ConfigModule.forRoot({
  isGlobal: true,
});
Railway inyecta las variables directamente en el entorno, no usa archivos .env.

2. DatabaseModule con migraciones desactivadas
ts
TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get('DB_HOST'),
    port: +config.get('DB_PORT'),
    username: config.get('DB_USER'),
    password: config.get('DB_PASS'),
    database: config.get('DB_NAME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    namingStrategy: new SnakeNamingStrategy(),
  }),
})
3. Fix para crypto.randomUUID() en Node 22
En main.ts, antes de bootstrap():

ts
import * as nodeCrypto from 'crypto';

if (!(global as any).crypto?.randomUUID) {
  (global as any).crypto.randomUUID = nodeCrypto.randomUUID;
}
 Configuración en Railway
Variables de entorno en la pestaña Variables:
env
PORT=8000

DB_HOST=interchange.proxy.rlwy.net
DB_PORT=47529
DB_USER=root
DB_PASS=tu_clave
DB_NAME=railway
DB_MIGRATIONS_RUN=false

MERCADOPAGO_CLIENT_ID=...
MERCADOPAGO_ACCESS_TOKEN=...
Dominio público
Ir a pestaña Networking → Generate Domain

Railway asigna una URL como:

Código
https://ftx-back-production.up.railway.app
 Validaciones post-deploy
1. Logs en Railway
Confirmar conexión:

Código
Conectando a DB: { host: ..., db: 'railway' }
Sin errores de crypto ni migraciones.

2. Swagger
Acceder a:

Código
https://ftx-back-production.up.railway.app/docs
3. Endpoint funcional
http
GET https://ftx-back-production.up.railway.app/apiFtx/plan
4. Insertar registro desde Postman
http
POST /apiFtx/datospersonales
json
{
  "id": 999,
  "plan": "pro",
  "nombre": "Test",
  "apellido": "Usuario",
  "dni": "12345678",
  "phone": "1122334455",
  "genero": "otro",
  "imagen_perfil": null
}
5. Verificar en Workbench
Confirmar que el registro aparece en la tabla datospersonales.

 Buenas prácticas
synchronize: false 

migrationsRun: false 

Variables cargadas desde Railway (no hardcodeadas en .env) 

Dominio público generado y accesible 

Fix aplicado para crypto.randomUUID() en Node 22 