import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from 'express'
import { MyLoggerService } from "./my-logger/my-logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

// Definición de un objeto para estructurar la respuesta de error
type MyResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object,
}

@Catch() // Decorador que indica que esta clase manejará excepciones
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name)

    // Método para manejar excepciones
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // Obtiene el contexto HTTP
        const response = ctx.getResponse<Response>(); // Obtiene la respuesta HTTP
        const request = ctx.getRequest<Request>(); // Obtiene la solicitud HTTP

        // Preparando el objeto de la respuesta
        const myResponseObj: MyResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: '',
        }

        // Manejo de diferentes tipos de excepciones
        if (exception instanceof HttpException) { // Si la excepción es del tipo HttpException
            myResponseObj.statusCode = exception.getStatus() // Obtiene el código de estado de la excepción
            myResponseObj.response = exception.getResponse() // Obtiene el mensaje de respuesta de la excepción
        } else if (exception instanceof PrismaClientValidationError) { // Si la excepción es del tipo PrismaClientValidationError
            myResponseObj.statusCode = 422 // Código de estado de error de validación
            myResponseObj.response = exception.message.replaceAll(/\n/g, ' ') // Mensaje de error de validación
        } else { // Para cualquier otro tipo de excepción
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR // Código de estado de error interno del servidor
            myResponseObj.response = 'Internal Server Error' // Mensaje de error interno del servidor
        }

        // Enviar la respuesta HTTP con el objeto de respuesta de error
        response
            .status(myResponseObj.statusCode)
            .json(myResponseObj)

        // Registrar el error en el registro de la aplicación
        this.logger.error(myResponseObj.response, AllExceptionsFilter.name)

        super.catch(exception, host) // Llama al método catch del filtro de excepciones base
    }
}
