import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

// Función asincrónica para inicializar la aplicación
async function bootstrap() {
  // Crea una instancia de la aplicación NestJS
  const app = await NestFactory.create(AppModule);

  // Obtiene el adaptador HTTP de la aplicación
  const { httpAdapter } = app.get(HttpAdapterHost);

  // Registra un filtro global de excepciones para manejar todas las excepciones no controladas
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Habilita la política CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde cualquier origen
  app.enableCors();

  // Establece un prefijo global para todas las rutas de la aplicación
  app.setGlobalPrefix('api');

  // Escucha las solicitudes entrantes en el puerto 3000
  await app.listen(3000);
}

// Inicia la aplicación llamando a la función bootstrap
bootstrap();
