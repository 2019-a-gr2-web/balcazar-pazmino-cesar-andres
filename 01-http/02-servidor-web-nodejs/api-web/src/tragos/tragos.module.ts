import {Module} from "@nestjs/common";
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                TragosEntity
            ],
            'default'
        )
    ],//dentro de un modulo se puede definir modulos
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