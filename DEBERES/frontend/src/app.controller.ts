import { Controller, Get,Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('inicio') //end point
    inicio(@Response() res){
        return res.render('inicio',
            {
               
            }
            );//aqui se pueden enviar parametros a la vista
    }
}
