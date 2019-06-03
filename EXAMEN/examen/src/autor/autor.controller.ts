import { Controller, Get, Res, Req, Post, Body, Param, Query } from "@nestjs/common";
import { AutorService } from "./autor.service";
import { Autor } from "./Interface/autor";

@Controller('api/autor')
export class AutorController {

    constructor(private readonly _servicioAutor: AutorService) {

    }


    @Get('gestionautor')
    gestionarautor(@Res() res, @Req() req, @Query('nombres') nombres?: string) {

        const cookieSegura = req.signedCookies.user;
        if (cookieSegura) {

            let bdautor;
            if (nombres) {
                bdautor = this._servicioAutor.buscarpornombreautor(nombres);
            } else {
                bdautor = this._servicioAutor.bdautor;
            }
            
            const nombreuser = req.signedCookies.user
            res.render('autor/gestionautor', { nombreuser, bdautor })
        } else {
            res.redirect('/api/inicio/login')
        }
    }





    //primero debo renderizar la vista
    @Get('crearautor')
    crearautorrender(@Res() res, @Req() req) {
        const cookieSegura = req.signedCookies.user;
        if (cookieSegura) {
            const nombreuser = req.signedCookies.user
            res.render('autor/crearautor', { nombreuser })
        } else {
            res.redirect('/api/inicio/login')
        }
    }

    //con este metodo se crea el autor
    @Post('crearautor')
    crearautor(
        @Res() res, @Req() req,
        @Body() autor: Autor
    ) {


        const cookieSegura = req.signedCookies.user;
        if (cookieSegura) {
            autor.numeroLibros = Number(autor.numeroLibros);
            autor.fechaNacimiento = new Date(autor.fechaNacimiento)
            if (String(autor.ecuatoriano) == "on") {
                autor.ecuatoriano = true;
            } else if (autor.ecuatoriano == undefined) {
                autor.ecuatoriano = false;
            }

            this._servicioAutor.insertar(autor);
            res.redirect('/api/autor/gestionautor')

        } else {
            res.redirect('/api/inicio/login')
        }


    }


    @Post('borrar/:id')
    borrarautor(@Res() res, @Param() parametros, @Req() req) {

        const cookieSegura = req.signedCookies.user;
        if (cookieSegura) {
            if (parametros.id) {

                this._servicioAutor.eliminar(Number(parametros.id))
            }
            res.redirect('/api/autor/gestionautor')

        } else {
            res.redirect('/api/inicio/login')
        }


    }


}

