import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DistribuidorEntity} from "./distribuidor.entity";


@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                DistribuidorEntity
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

export class DistribuidorModule{

}