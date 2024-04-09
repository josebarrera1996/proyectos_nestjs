import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

// Decorador compuesto para autenticación y verificación de roles
export function Auth(role: Role) {
    // Aplica los decoradores Roles y UseGuards con los guardias AuthGuard y RolesGuard
    return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
