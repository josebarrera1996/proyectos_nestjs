import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// Decorador personalizado para obtener el usuario activo de la solicitud
export const ActiveUser = createParamDecorator(
    // Función que devuelve el usuario activo de la solicitud
    (data: unknown, ctx: ExecutionContext) => {
        // Obtiene el objeto de solicitud HTTP del contexto de ejecución
        const request = ctx.switchToHttp().getRequest();
        // Devuelve el usuario activo de la solicitud
        return request.user;
    }
);
