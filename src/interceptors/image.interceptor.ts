import { BadRequestException, Injectable } from '@nestjs/common';
import { FileInterceptor as MulterInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as crypto from 'crypto'; // Asegúrate de importar crypto explícitamente

@Injectable()
export class FileInterceptor {
  static createFileInterceptor(fieldName: string) {
    return MulterInterceptor(fieldName, {
      storage: diskStorage({
        // Configuración de almacenamiento en disco
        destination: './uploads', // Carpeta donde se guardarán los archivos
        filename: (req, file, callback) => {
          // Generar un nombre único para el archivo
          const uniqueSuffix = crypto.randomUUID(); // Nombre único
          const ext = extname(file.originalname); // Extensión del archivo original
          const filename = `photo-${uniqueSuffix}${ext}`;
          callback(null, filename); // Pasar el nombre al callback
        },
      }),
      fileFilter: (req, file, callback) => {
        // Tipos de archivo permitidos
        const allowedTypes = /jpeg|jpg|png|gif/;

        // Validar tipo MIME y extensión
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(extname(file.originalname).toLowerCase());

        if (mimeType && extName) {
          callback(null, true); // Aceptar el archivo
        } else {
          callback(
            new BadRequestException('Solo se permiten archivos de imagen (JPEG, PNG, GIF)'),
            false,
          ); // Rechazar el archivo
        }
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // Limitar tamaño a 2 MB
      },
    });
  }
}
