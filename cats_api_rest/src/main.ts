import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Crear una instancia de la aplicación
  const app = await NestFactory.create(AppModule);

  // Establecer un prefijo global para todas las rutas de la aplicación
  app.setGlobalPrefix("api/v1");

  // Configuración de un pipe de validación global para todas las rutas
  app.useGlobalPipes(
    new ValidationPipe({
      // Habilita la lista blanca para filtrar propiedades no deseadas
      whitelist: true,
      // Arroja un error si se encuentran propiedades no permitidas
      forbidNonWhitelisted: true,
      // Habilita la transformación automática de datos
      transform: true,
    })
  );

  // Iniciamos la aplicación y la escuchamos en el puerto 3000
  await app.listen(3000);
}
bootstrap();
