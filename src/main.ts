import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path'; // Importa 'join' de 'path'
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Configuración para servir archivos estáticos desde la carpeta 'uploads'
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',  // Asegura que la ruta esté correctamente configurada
    index: false,         // Evita que NestJS busque un 'index.html' por defecto
  });

  // Uso de helmet para seguridad
  app.use(helmet());

  // Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Balneario San Cayetano')
    .setDescription('Documentación de API Balneario San Cayetano')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc-api', app, document);

  // Iniciar el servidor en el puerto 3010
  await app.listen(3010);
}

bootstrap();
