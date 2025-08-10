import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS } from './constantes';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //obtiene la configuracion de variables de entorno y accede al puerto
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe({ //convierte automaticamente de cadena a numero o de cadena a boolean
    transformOptions: {
      enableImplicitConversion: true,
      /*ver si agregamos :
      whitelist: true,
      forbidNonwhitelisted: true,
      transform:true, */
    },
  }));

  app.enableCors(CORS);

  //establece un prefijo para toda la aplicacion y evita que se mezclen rutas de be y fe
  app.setGlobalPrefix('apiFtx');

  await app.listen(port);
}
bootstrap();
