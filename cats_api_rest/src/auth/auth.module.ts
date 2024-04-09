import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants/jwt.constant';

@Module({
  // Importación de módulos que serán utilizados en este módulo
  imports: [
    UsersModule,
    JwtModule.register({
      // Configuración de JWT
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    })
  ],
  // Importación de los controladores que serán utilizados en este módulo
  controllers: [AuthController],
  // Importación de los servicios que serán utilizados en este módulo
  providers: [AuthService],
})
export class AuthModule { }
