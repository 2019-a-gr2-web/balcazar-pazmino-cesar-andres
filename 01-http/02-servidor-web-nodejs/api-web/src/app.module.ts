import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import {TypeOrmModule} from '@nestjs/typeorm'
import {TragosEntity} from "./tragos/tragos.entity";
import {FiestaEntity} from "./fiesta/fiesta.entity";
import {DistribuidorEntity} from "./distribuidor/distribuidor.entity";
import {DistribuidorModule} from "./distribuidor/distribuidor.module";
import {FiestaModule} from "./fiesta/fiesta.module";
import {ChatModule} from "./chat/chat.module";

//para usar el ORM

@Module({
    imports: [
       TragosModule,
        DistribuidorModule,
        FiestaModule,
        TypeOrmModule.forRoot({
            name: 'default',//nombre de cadena de conexión por defecto del TypeORM
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'test',
            entities: [
                TragosEntity, FiestaEntity, DistribuidorEntity
            ],
            synchronize: true, //hace que se creen las tablsa y se mdoifican los datos

            insecureAuth: true

            //dropSchema: true //borra todos los datos

        }),


      //el chat
       ChatModule
        /***/




    ],//aqui van los modulos
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

}
