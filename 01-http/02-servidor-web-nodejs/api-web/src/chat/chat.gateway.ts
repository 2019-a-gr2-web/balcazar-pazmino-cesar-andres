import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client} from "socket.io";
import {TragosService} from "../tragos/tragos.service";

// ws://localhost:3001/websockets   ->esto es un web socket :v
@WebSocketGateway(3001,
    {
        namespace: '/websockets'
    })
export class ChatGateway {

    @WebSocketServer() server;

    constructor(private readonly servicio:TragosService) {
        console.log(this.server);
    }

    //SERVIDOR

    @SubscribeMessage('holaMundo')
    async holaMundo(client: Client | any, data: any) {
        const tragos=await this.servicio.buscar();
        console.log(tragos);
        console.log('Nos hacen la peticion');
        //console.log("server: ",this.server);

        client.broadcast.emit('saludaron',tragos[0]);// broadcast a todos los sockets del servidor
        return 'Hola: '+data.nombre;
    }

}
