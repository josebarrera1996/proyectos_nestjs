import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    // Método de guardia para verificar los roles de los usuarios
    canActivate(context: ExecutionContext): boolean {
        // Obtiene el rol asociado con el controlador o método de controlador
        const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
            context.getHandler(), // Obtiene el método de controlador
            context.getClass(), // Obtiene la clase de controlador
        ]);

        // Si no se especifica ningún rol, se permite el acceso
        if (!role) {
            return true;
        }

        // Obtiene el usuario del objeto de solicitud
        const { user } = context.switchToHttp().getRequest();

        // Si el usuario es un administrador, se permite el acceso
        if (user.role === Role.ADMIN) {
            return true;
        }

        // Comprueba si el rol del usuario coincide con el rol requerido para acceder
        return role === user.role;
    }
}
