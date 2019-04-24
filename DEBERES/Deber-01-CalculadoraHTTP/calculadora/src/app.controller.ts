import { Controller, Get, Headers, Post, Body, Request, Response, Put, Query, HttpCode, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { setupMaster } from 'cluster';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /*Suma 2 numeros con un metodo
  
  Headers
  GET
  HTTP CODE 200
  
  */

  @Get('suma')
  @HttpCode(200)
  suma(@Headers() cabecera) {
    if (!isNaN(cabecera.numero1) && !isNaN(cabecera.numero2)) {
      const num1 = Math.round(Number(cabecera.numero1));
      const num2 = Math.round(Number(cabecera.numero2));
      const sum = num1 + num2;
      return 'La suma de los números es: ' + sum;
    } else {
      return 'Parámetros incorrectos!';
    }
  }

  /*Resta 2 numeros con un metodo

  Body
  POST
  HTTP CODE 201
  */

  
  @Post('/resta')
  @HttpCode(201)
  resta(@Body() cuerpo, @Response() respuesta) {
    if (!isNaN(cuerpo.numero1) && !isNaN(cuerpo.numero2)) {
      const num1 = Math.round(Number(cuerpo.numero1));
      const num2 = Math.round(Number(cuerpo.numero2));
      const rest = num1 - num2;
      //respuesta.set('Resultado de la resta', rest);
      return respuesta.send({
        'Respuesta de la resta: ': rest
      })
    } else {
      return respuesta.status(400).send(
        {
          mensaje: 'Error',
          error: 400
        });
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
  multiplicacion(@Query() query) {
    if (!isNaN(query.numero1) && !isNaN(query.numero2)) {
      const num1 = Math.round(Number(query.numero1));
      const num2 = Math.round(Number(query.numero2));
      const mult = num1 * num2;
      return 'Resultado de multiplicación: ' + mult;
    } else {
      return 'Error en parámetros!'
    }
  }


  /*Division 2 numeros con un metodo

  Query - Body - Headers
  Delete
  HTTP CODE 203

 */

  @Delete('/division')
  @HttpCode(203)
  division(@Query() query, @Body() body,@Response() respuesta){
      if(!isNaN(query.numero1) && !isNaN(body.numero2)){
        const num1 = Math.round(Number(query.numero1));
        const num2 = Math.round(Number(body.numero2));
        var div:Number=0;
        if(num2!=0){
          div = num1 / num2;
        }else{
          return respuesta.status(400).send(
            {
              mensaje: 'Indefinido (división por cero)',
              error: 400
            });
        }
        
        //return "Resultado de division: "+div;
        respuesta.set('division', div);
        return respuesta.send({Resultado_division: div});
      }else{
        return respuesta.status(400).send(
          {
            mensaje: 'Error',
            error: 400
          });
      }
      
  }



}
