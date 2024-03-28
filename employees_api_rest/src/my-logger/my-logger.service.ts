import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs'; // Importa el módulo 'fs' para trabajar con el sistema de archivos
import { promises as fsPromises } from 'fs'; // Importa el módulo 'fs' para trabajar con el sistema de archivos de forma asincrónica
import * as path from 'path'; // Importa el módulo 'path' para manejar rutas de archivos

@Injectable()
export class MyLoggerService extends ConsoleLogger {
    // Método para escribir el registro en un archivo
    async logToFile(entry) {
        // Formatea la entrada con la fecha y hora actual en el formato especificado
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'America/Chicago',
        }).format(new Date())}\t${entry}\n`;

        try {
            // Verifica si el directorio de registros existe, si no, lo crea
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
            }
            // Agrega la entrada al archivo de registro
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'), formattedEntry);
        } catch (e) {
            // Maneja cualquier error que ocurra durante la escritura del archivo de registro
            if (e instanceof Error) console.error(e.message);
        }
    }

    // Sobrescribe el método log de la clase ConsoleLogger para escribir en el archivo de registro además de la consola
    log(message: any, context?: string) {
        const entry = `${context}\t${message}`; // Construye la entrada para el registro
        this.logToFile(entry); // Llama al método logToFile para escribir la entrada en el archivo de registro
        super.log(message, context); // Llama al método log de la clase base para mostrar el mensaje en la consola
    }

    // Sobrescribe el método error de la clase ConsoleLogger para escribir en el archivo de registro además de la consola
    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`; // Construye la entrada para el registro
        this.logToFile(entry); // Llama al método logToFile para escribir la entrada en el archivo de registro
        super.error(message, stackOrContext); // Llama al método error de la clase base para mostrar el mensaje en la consola
    }
}
