import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { APP_GUARD } from '@nestjs/core'
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    // Importando los siguientes módulos para este módulo que es el principal
    UsersModule, 
    DatabaseModule, 
    EmployeesModule, 
    ThrottlerModule.forRoot([ // Importa y configura el módulo ThrottlerModule para controlar la velocidad de las solicitudes.
      {
        name: 'short', // Define un nombre para este límite de velocidad.
        ttl: 1000, // Define el tiempo de vida del límite de velocidad en milisegundos (en este caso, 1 segundo).
        limit: 3, // Define el límite máximo de solicitudes dentro del período de tiempo especificado.
      },
      {
        name: 'long', // Define un nombre para este otro límite de velocidad.
        ttl: 60000, // Define el tiempo de vida del límite de velocidad en milisegundos (en este caso, 1 minuto).
        limit: 100, // Define el límite máximo de solicitudes dentro del período de tiempo especificado.
      }
    ]),
    MyLoggerModule
  ],
  controllers: [AppController], // Declara los controladores que pertenecen a este módulo principal.
  providers: [AppService, { // Declara los proveedores de servicios que pertenecen a este módulo principal.
    provide: APP_GUARD, // Indica que se está proporcionando un guardia a nivel de aplicación.
    useClass: ThrottlerGuard, // Utiliza la clase ThrottlerGuard como guardia de aplicación para controlar la velocidad de las solicitudes.
  }],
})
export class AppModule { } // Define la clase AppModule que representa este módulo principal de la aplicación.
