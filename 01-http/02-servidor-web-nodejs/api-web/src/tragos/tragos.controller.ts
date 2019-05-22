import {Controller, Get, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";


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


}