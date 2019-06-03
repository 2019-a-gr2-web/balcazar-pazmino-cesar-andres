import { Controller, Get, Res, Req, Param, Post, Body, Query } from "@nestjs/common";
import { LibroService } from "./libro.service";
import { Libro } from "./Interface/libro";
import { AutorService } from "../autor/autor.service";

@Controller('api/libro')
export class LibroController {

    constructor(private readonly _servicioLibro: LibroService, private readonly _servicioAutor: AutorService) {

    }


    idautor: number;
    @Get('gestionlibro/:id')
    gestionlibro(@Res() res, @Req() req, @Param() paramautor, @Query('titulo') titulo?: string) {
        const cookieSegura = req.signedCookies.user;
        if (cookieSegura) {


            let libros;
            this.idautor = paramautor.id;
            if (titulo) {
                libros = this._servicioLibro.buscarporTitulo(this.idautor, titulo);
            } else {
                libros = this._servicioLibro.librosegunautor(Number(paramautor.id));
            }

            const autor = this._servicioAutor.nombresegunid(Number(paramautor.id))

            const nombreuser = req.signedCookies.user
            const auxidautor=this.idautor;

            res.render('libro/gestionlibro', { nombreuser, libros, autor,auxidautor});

        } else {
            res.redirect('/api/inicio/login')
        }

    }


    @Get('crear')
    crearlibrorender(@Res() res, @Req() req) {


        const cookieSegura = req.signedCookies.user;
        if (cookieSegura) {


            const nombreuser = req.signedCookies.user
            const idaut = this.idautor
            res.render('libro/crearlibro', { idaut, nombreuser })


        } else {
            res.redirect('/api/inicio/login')
        }
    }



    @Post('crearlibro/:id')
    crearlibro(
        @Res() res,
        @Body() libro: Libro,
        @Param() parametro,
        @Req() req
    ) {
        const cookieSegura = req.signedCookies.user;
        if (cookieSegura) {

            libro.isbn = Number(libro.isbn);
            libro.numeroPaginas = Number(libro.numeroPaginas);
            libro.edicion = Number(libro.edicion);
            libro.fechaPublicacion = new Date(libro.fechaPublicacion);
            libro.autorId = Number(libro.autorId);

            this._servicioLibro.insertar(libro);

            this.idautor = Number(parametro.id);

            res.redirect('/api/libro/gestionlibro/' + this.idautor);
        } else {
            res.redirect('/api/inicio/login')
        }

    }


    @Post('borrar/:id')
    eliminar(@Res() res, @Req() req, @Param() parametro) {
        const cookieSegura = req.signedCookies.user;
        if (cookieSegura) {
            if (parametro.id) {

                this._servicioLibro.eliminar(Number(parametro.id));
                res.redirect('/api/libro/gestionlibro/' + this.idautor);
            }
        } else {
            res.redirect('/api/inicio/login')
        }
    }




}