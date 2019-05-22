import {Module} from "@nestjs/common";
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.service";

@Module({
    imports:[],//dentro de un modulo se puede definir modulos
    controllers:[
        TragosController
    ], //controladores
    providers:[
        TragosService
    ], //servicios
    exports:[
        TragosService   //si alguien mas quiere usar los servicios
    ] //exportar los servicios
})

export class TragosModule{

}