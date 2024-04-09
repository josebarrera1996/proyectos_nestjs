import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "../constants/jwt.constant";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  // Método para determinar si la solicitud puede ser manejada
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtenemos el objeto 'Request' de la solicitud
    const request = context.switchToHttp().getRequest();
    // Extraemos el token de autorización del encabezado de la solicitud
    const token = this.extractTokenFromHeader(request);

    // Si no se proporciona un token, lanzamos una excepción de Unauthorized
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Verificamos la validez del token utilizando el servicio JwtService
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // Si el token es válido, adjuntamos el payload del token a la solicitud
      request.user = payload;
    } catch (error) {
      // Si hay un error al verificar el token, lanzamos una excepción de Unauthorized
      throw new UnauthorizedException();
    }

    // Indicamos que la solicitud puede ser manejada
    return true;
  }

  // Método para extraer el token de autorización del encabezado de la solicitud
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
