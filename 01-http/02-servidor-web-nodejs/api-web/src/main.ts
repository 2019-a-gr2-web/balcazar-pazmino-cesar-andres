import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";
// import * as cookieParser from 'cookie-parser'
const cookieParser = require('cookie-parser');
import * as express from 'express'

//para el favicon en todas las paginas
import * as path from "path";
import  * as favicon from "serve-favicon"

async function bootstrap() {
    const app = await NestFactory
        .create(AppModule) as NestExpressApplication;
    app.use(cookieParser('Secreto'));
    app.setViewEngine('ejs');
    app.setBaseViewsDir(join(__dirname, '..', 'views')); //aqui le indico de que carpeta escoja las vistas
    app.use(express.static('publico')); //la carpeta de los ASSETS, al hacer esto importar EXPRESS

    //si quiero el mismo FAVICON para todas las paginas
    //INSTALAR: npm install serve-favicon
    // https://github.com/expressjs/serve-favicon
    //app.use(favicon(path.join(__dirname,'..', 'publico','imagenes','logomessi.ico'))); //en teoria esto deberia funcionar

    await app.listen(3000);
}

bootstrap();

/*

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import {INestApplication} from "@nestjs/common";

var cookieParser= require('cookie-parser') //forma de importar en JS

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule) as NestExpressApplication;
  app.use(cookieParser('Secreto'));

    // @ts-ignore
    app.setViewEngine('ejs');

    app.setBaseViewsDir(join(__dirname,'..','views'));

  await app.listen(3003);
}
bootstrap();
*/ 
