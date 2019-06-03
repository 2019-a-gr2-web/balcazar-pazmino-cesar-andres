import { Controller, Get, Res, Post, Body, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/inicio')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //solo renderizo el login
  @Get('login')
  iniciosesion(@Res() res,@Req() req) {
    if(req.signedCookies.user){
      res.clearCookie('user');
      res.render('login', {})
    }else{
      res.render('login', {})
    }
    //
    
    
  }



  username: string;
  //tomo el username y renderizo la segunda vista,
  //ahora voy a guardar el nombre de usuario en una cookie segura
  @Post('principal')
  principal(
    @Res() res,
    @Req() req,
    @Body('nombreuser') nombreuser: string
  ) {

    //const galleta = req.cookies;
    //if (nombreuser != null && nombreuser != "") {
      //if (galleta) {
        this.username = nombreuser;
        res.cookie(
          'user',
          this.username,
          {
            signed: true
          }

        )

        res.render('principal', { nombreuser })

        //const cookieSegura = req.signedCookies.user;
        //if (cookieSegura) {
          //return res.send(this.respuestaFinal);
          
      //  } else {
          //return respuesta.send('Cookie no segura');
        //  res.redirect('/api/inicio/login')
       // }


        //return res.send('Juego iniciado!');
      //} else {
        //return res.send('Error!');
     //   res.redirect('/api/inicio/login')
      //}
    //}else{
     // res.redirect('/api/inicio/login')
    //}




  }

}






