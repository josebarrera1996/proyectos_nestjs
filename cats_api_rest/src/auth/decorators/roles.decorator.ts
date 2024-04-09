import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';

// Clave utilizada para almacenar metadatos relacionados con los roles
export const ROLES_KEY = 'roles';

// Decorador personalizado para asignar roles a los controladores o métodos de controladores
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
