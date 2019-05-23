import {Body, Controller, Delete, Get, Post, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";


@Controller('/api/dieguito')
export class TragosController{

    //inyección de dependencias
    constructor(private readonly _tragossService:TragosService){ //ahora tengo todos los metodos del tragoservice

    }

    @Get('lista')
    listarTragos(@Res() res){

        const arregloTragos=this._tragossService.bdTragos;
        res.render('tragos/vista-tragos',
            {
                arregloTragos:arregloTragos
            });
    }

    @Get('crear')
    lcrearTragos(@Res() res){


        res.render('tragos/crear-editar',
            {

            });
    }


    //aqui se mandan parametros de cuerpo
    @Post('crear')
    crearTragosPost(
        @Body()trago:Trago,//todos los campos en una
        @Res() res
        // @Body('nombre')nombre:string,
        // @Body('precio') precio:number,
        // @Body('tipo') tipo:string,
        // @Body('gradosAlcohol') gradoAlcohol:number,
        // @Body('fechaCaducidad') fechaCaducidad:Date,



    ){
        //TOCA HACER ESTO CON ESTOS 3 CAMPOS PORQUE DEVUELVE UNDEFINED
        trago.gradoAlcohol=Number(trago.gradoAlcohol);
        trago.precio=Number(trago.precio);
        trago.fechaCaducidad=new Date(trago.fechaCaducidad);
        console.log(trago);

        this._tragossService.crear(trago);
        res.redirect('/api/dieguito/lista')
        //console.log('Trago: ', trago, typeof trago);
        // console.log('Nombre: ', nombre, typeof nombre);
        // console.log('Tipo: ', tipo, typeof tipo);
        // console.log('GradosAlcohol: ', gradoAlcohol, typeof gradoAlcohol);
        // console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        // console.log('Precio: ', precio, typeof precio);

    }

    @Post('borrar')
    borrarTraguito(
        @Body('id') id:number,
        @Res() res

    ){

        this._tragossService.eliminar(id);
        res.redirect('/api/dieguito/lista')

    }

}