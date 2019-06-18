import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {FiestaEntity} from "./fiesta.entity";


@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                FiestaEntity
            ],
            'default'
        )
    ],//dentro de un modulo se puede definir modulos
    controllers:[

    ], //controladores
    providers:[

    ], //servicios
    exports:[

    ] //exportar los servicios
})

export class FiestaModule{

}