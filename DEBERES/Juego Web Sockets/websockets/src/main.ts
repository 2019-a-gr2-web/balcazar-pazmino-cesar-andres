import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express' //modo ts

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('publico')); //la carpeta de los ASSETS, al hacer esto importar EXPRESS

  await app.listen(3000);

}
bootstrap();
