import { Body, Controller, Delete, Get, Post, Query, Res, Param } from "@nestjs/common";
import { TragosService } from "./tragos.service";
import { Trago } from "./interfaces/trago";
import { TragosCreateDto } from "./dto/tragos.create.dto";
import { validate } from "class-validator";


@Controller('/api/dieguito')
export class TragosController {
    estoyEditando: boolean = false;
    idtragoEditando: number = null;
    //inyección de dependencias
    constructor(private readonly _tragossService: TragosService) { //ahora tengo todos los metodos del tragoservice


    }

    @Get('lista')
    async listarTragos(@Res() res) {

        const arregloTragos = await this._tragossService.buscar();
        res.render('tragos/vista-tragos',
            {
                arregloTragos: arregloTragos
            });
    }

    @Get('crearvista')
    async crearTragos(@Res() res, @Query('mensaje') mensaje: string, @Query('id') id?: number) {



        //let bdaux:Trago[]=[];
        let editando;
        var tragoAux: Trago = {
            nombre: "",
            tipo: "Cerveza",
            gradoAlcohol: null,
            fechaCaducidad: null,
            precio: null
        };
        if (id) {
            this.estoyEditando = true;
            this.idtragoEditando = Number(id);
            editando = this.estoyEditando;


            let bdaux = await this._tragossService.buscarporId(id);

           
            tragoAux = bdaux[0];

            res.render('tragos/crear-editar',
                { mensaje, tragoAux, editando });
        } else {
            this.estoyEditando = false;
            editando = this.estoyEditando;
            res.render('tragos/crear-editar',
                { mensaje, tragoAux, editando });
        }

    }


    //aqui se mandan parametros de cuerpo
    @Post('crear')
    async crearTragosPost(
        @Body() trago: Trago,//todos los campos en una
        @Res() res
        // @Body('nombre')nombre:string,
        // @Body('precio') precio:number,
        // @Body('tipo') tipo:string,
        // @Body('gradosAlcohol') gradoAlcohol:number,
        // @Body('fechaCaducidad') fechaCaducidad:Date,
    ) {
        //TOCA HACER ESTO CON ESTOS 3 CAMPOS PORQUE DEVUELVE UNDEFINED
        trago.gradoAlcohol = Number(trago.gradoAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;
        console.log(trago);


        //para la validacion con CLASS VALIDATOR
        let tragoAValidar = new TragosCreateDto();
        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradoAlcohol = trago.gradoAlcohol;


        try {

            const errores = await validate(tragoAValidar);

            if (errores.length > 0) {
                console.error(errores);
                //res.status(400); //porque el usuario manda los datos
                //res.send({mensaje: 'Error', codigo: 400});
                res.redirect('/api/dieguito/crearvista?mensaje=hay_un_error');
            } else {
                if (!this.estoyEditando) {
                    const respuestaCrear = await this._tragossService.crear(trago); //promesa
                } else {
                    const respuestaEditar = await this._tragossService.editardelaBD(this.idtragoEditando, trago);
                    this.idtragoEditando = null;
                }

                res.redirect('/api/dieguito/lista')
            }

        } catch (e) {
            console.error(e);
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });
        }


    }

    @Post('borrar')
    async borrarTraguito(
        @Body('id') id: number,
        @Res() res
    ) {

        //this._tragossService.eliminar(id);
        console.log(id);
        await this._tragossService.eliminarDeLaBD(Number(id));
        res.redirect('/api/dieguito/lista')

    }

}