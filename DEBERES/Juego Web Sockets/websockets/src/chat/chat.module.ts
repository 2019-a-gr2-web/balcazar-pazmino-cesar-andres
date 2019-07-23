import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";

@Module({
    imports:[],
    controllers:[],
    exports:[],
    providers:[ChatGateway]
})
export class ChatModule{

}