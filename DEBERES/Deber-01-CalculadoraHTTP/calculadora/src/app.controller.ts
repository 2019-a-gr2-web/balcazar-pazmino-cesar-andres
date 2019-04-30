import { Controller, Get, Headers, Post, Body, Request, Response, Put, Query, HttpCode, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { setupMaster } from 'cluster';
import { response } from 'express';

import * as Joi from '@hapi/joi';


@Controller('/api')
export class AppController {
  esquemaValidacionNumero: Joi;
  constructor(private readonly appService: AppService) {
    this.esquemaValidacionNumero = Joi
      .object()
      .keys({
        numero: Joi.number()/*.integer()*/.required()
      });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /*Suma 2 numeros con un metodo
  
  Headers
  GET
  HTTP CODE 200
  
  */


  respuestaFinal =
    {
      nombreUsuario: 'Cesar',
      resultado: 2,
      mensaje: 'Se terminaron los puntos'
    }



  @Get('suma')
  @HttpCode(200)
  suma(@Headers() cabecera, /**/ @Response() res, @Request() req) {
    console.log(this.valorCookie);
    if (Number(this.valorCookie) > 0) {

      const objetoValidacion1 = {
        numero: cabecera.numero1
      };
      const objetoValidacion2 = {
        numero: cabecera.numero2
      };

      const resultado1 = Joi.validate(objetoValidacion1,
        this.esquemaValidacionNumero);

      const resultado2 = Joi.validate(objetoValidacion2,
        this.esquemaValidacionNumero);


      if (!resultado1.error && !resultado2.error) {

        const num1 = Math.round(Number(cabecera.numero1));
        const num2 = Math.round(Number(cabecera.numero2));
        const sum = num1 + num2;
        this.valorCookie = Number(this.valorCookie) - sum;

        return res.send('La suma de los números es: ' + sum);
      } else {
        return res.send('Parámetros incorrectos!');
      }
    } else {
      const cookieSegura = req.signedCookies.puntaje;
      if (cookieSegura) {
        return res.send(this.respuestaFinal);
      } else {
        return res.send('Cookie no segura');
      }
    }

  }

  /*Resta 2 numeros con un metodo

  Body
  POST
  HTTP CODE 201
  */


  @Post('/resta')
  @HttpCode(201)
  resta(@Body() cuerpo, @Response() respuesta, /* */ @Request() req) {
    if (this.valorCookie > 0) {
      const objetoValidacion1 = {
        numero: cuerpo.numero1
      };
      const objetoValidacion2 = {
        numero: cuerpo.numero2
      };

      const resultado1 = Joi.validate(objetoValidacion1,
        this.esquemaValidacionNumero);

      const resultado2 = Joi.validate(objetoValidacion2,
        this.esquemaValidacionNumero);


      if (!resultado1.error && !resultado2.error) {
        const num1 = Math.round(Number(cuerpo.numero1));
        const num2 = Math.round(Number(cuerpo.numero2));
        const rest = num1 - num2;
        //respuesta.set('Resultado de la resta', rest);
        this.valorCookie = Number(this.valorCookie) - rest;
        return respuesta.send({
          'Respuesta de la resta: ': rest
        });
      } else {
        return respuesta.status(400).send(
          {
            mensaje: 'Error',
            error: 400
          });
      }
    } else {
      console.log(this.valorCookie);
      const cookieSegura = req.signedCookies.puntaje;
      if (cookieSegura) {
        return respuesta.send(this.respuestaFinal);
      } else {
        return respuesta.send('Cookie no segura');
      }
    }

  }


  /*
  Multiplicacion 2 numeros con un metodo

  Query
  PUT
  HTTP CODE 202

  */

  @Put('/multiplicacion')
  @HttpCode(202)
  multiplicacion(@Query() query, /**/ @Request() req, @Response() res) {
    if (this.valorCookie > 0) {
      const objetoValidacion1 = {
        numero: query.numero1
      };
      const objetoValidacion2 = {
        numero: query.numero2
      };

      const resultado1 = Joi.validate(objetoValidacion1,
        this.esquemaValidacionNumero);

      const resultado2 = Joi.validate(objetoValidacion2,
        this.esquemaValidacionNumero);


      if (!resultado1.error && !resultado2.error) {
        const num1 = Math.round(Number(query.numero1));
        const num2 = Math.round(Number(query.numero2));
        const mult = num1 * num2;

        this.valorCookie = Number(this.valorCookie) - mult;

        return res.send('Resultado de multiplicación: ' + mult);


      } else {
        return res.send('Error en parámetros!');
      }

    } else {

      const cookieSegura = req.signedCookies.puntaje;
      if (cookieSegura) {
        return res.send(this.respuestaFinal);
      } else {
        return res.send('Cookie no segura');
      }


    }

  }


  /*Division 2 numeros con un metodo

  Query - Body - Headers
  Delete
  HTTP CODE 203

 */

  @Delete('/division')
  @HttpCode(203)
  division(@Query() query, @Body() body, @Response() respuesta,/**/ @Request() req) {

    if (this.valorCookie > 0) {

      const objetoValidacion1 = {
        numero: query.numero1
      };
      const objetoValidacion2 = {
        numero: body.numero2
      };

      const resultado1 = Joi.validate(objetoValidacion1,
        this.esquemaValidacionNumero);

      const resultado2 = Joi.validate(objetoValidacion2,
        this.esquemaValidacionNumero);


      if (!resultado1.error && !resultado2.error) {

        const num1 = Math.round(Number(query.numero1));
        const num2 = Math.round(Number(body.numero2));
        var div: Number = 0;
        if (num2 != 0) {
          div = num1 / num2;
        } else {
          return respuesta.status(400).send(
            {
              mensaje: 'Indefinido (división por cero)',
              error: 400
            });
        }

        this.valorCookie = Number(this.valorCookie) - Number(div);
        //return "Resultado de division: "+div;
        respuesta.set('division', div);
        return respuesta.send({ Resultado_division: div });
      } else {
        return respuesta.status(400).send(
          {
            mensaje: 'Error',
            error: 400
          });
      }


    } else {
      const cookieSegura = req.signedCookies.puntaje;
      if (cookieSegura) {
        return respuesta.send(this.respuestaFinal);
      } else {
        return respuesta.send('Cookie no segura');
      }


    }


  }


  valorCookie: Number = 0;
  @Get('/iniciar')
  iniciarcalculadora(@Request() req, @Response() res) { //Con este metodo inicio el juego, luego averiguar como ver la 1era sesion

    const galleta = req.cookies;


    if (galleta) {
      this.valorCookie = 100;
      res.cookie(
        'puntaje',
        this.valorCookie,
        {
          signed: true
        }

      );

      console.log('juego iniciado')
      return res.send('Juego iniciado!');
    } else {
      return res.send('Error!');
    }


  }







}
