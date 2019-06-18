import {Body, Controller, Delete, Get, Post, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";


@Controller('/api/dieguito')
export class TragosController{

    //inyección de dependencias
    constructor(private readonly _tragossService:TragosService){ //ahora tengo todos los metodos del tragoservice

    }

    @Get('lista')
    async listarTragos(@Res() res){

        const arregloTragos=await this._tragossService.buscar();
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
    async crearTragosPost(
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


        try{
            const respuestaCrear= await this._tragossService.crear(trago); //promesa
            res.redirect('/api/dieguito/lista')
        }catch(e){
            console.error(e);
            res.status(500);
            res.send({mensaje:'Error',codigo:500});
        }


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