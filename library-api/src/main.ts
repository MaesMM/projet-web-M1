import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import { application } from 'express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //swagger :
  const config = new DocumentBuilder()
    .setTitle('BookViewer')
    .setDescription('L application BookViewer permet de visualiser les livres de la bibliothèque')
    .setVersion('0.0.1')
    .addTag('Books')
    .addTag('Authors')
    .addTag('Genres')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.API_PORT ?? 3000;
  await app.listen(port);
}

bootstrap();
