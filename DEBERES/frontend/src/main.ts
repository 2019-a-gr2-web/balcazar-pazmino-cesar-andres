import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";
import express = require('express');//para el ASSETS

async function bootstrap() {
  
  const app = await NestFactory
  .create(AppModule) as NestExpressApplication;
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static('publico')); //la carpeta de los ASSETS, al hacer esto importar EXPRESS
  await app.listen(3000);

}
bootstrap();
