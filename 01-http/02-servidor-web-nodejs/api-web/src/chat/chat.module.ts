import {Module} from "@nestjs/common";
import {ChatGateway} from "./chat.gateway";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TragosEntity} from "../tragos/tragos.entity";
import {TragosService} from "../tragos/tragos.service";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [
                    TragosEntity
                ],
                'default'
            )
        ],
        providers: [ChatGateway,TragosService]
    }
)
export class ChatModule {

}