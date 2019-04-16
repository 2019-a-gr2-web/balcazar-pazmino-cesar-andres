import {Controller, Get, Post, HttpCode, Put, Delete, Headers} from '@nestjs/common';
import { AppService } from './app.service';

//http:ip:puerto/segmentoInicial/segmentoInicial
//@Controller(Segemento)
//el segmento Accion se pone en cada método


@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) { }

 /* @Get('/helloWorld')
  getHello(): string {
    return this.appService.getHello();
  }*/
  //cuando se hace cambio en la logica del servidor se debe reiniciar el servidor
  //para ello se puede usar npm run start:dev

 /* @Post()//alt+enter para importar arriba directamente
  @HttpCode(205)
  postHello() {
    return 'Hola mundo en post';
  }*/

  /*Segmento inicial*/
//segmento a: GET: 'hello-world
  //segmento a: POST: 'HOLA-MUNDO'
  // put , delete

  @Get('/hola-mundo')
  holaMundo(){
    return 'Hola mundo';
  }

  @Post('/hello-world')
  helloWorld(){
    return 'Hello world';
  }
  @Put('/salut-monde')
  putBonJour(){
    return 'salut-monde';
  }

  @Delete('/ola-mundo')
  olaMundo(){
    return 'ola mundo';
  }

//un decorador es la ejecucion de una funcion
  @Get('/adivina')
  adivina(@Headers() headers){ // parametro de un metodo de una clase, la clase headers usar la cabecera de nestjs, verificar si está importado, con esto tengo acceso a las cabeceras
   //estoy usando el decorador @Headers para el parametro headers

    const numeroRandom=Math.round(Math.random()*10)
    //return numeroRandom;// en javascrip no existen enteros, son numeros y ya
      console.log('Headers: ',headers);
     // return headers.alv
      const numeroCabecer=Number(headers.numero)
      if(numeroCabecer ==numeroRandom ){
        return 'ok'
      }else{
        return ':('
      }



  }

    //JSON es la notacion de objetos en JS, un archivo json no puede estar vacio, es usado porque es ligero y facil de entender
  //abosultamente todas las llaves deben estar entre comillas DOBLES, estandar JSON (Java Script Object Notation)
  //todos los string en JSON tienen comillas dobles
  //en los archivos JSON no existen undefined
  //un archivo JSON soporta objetos JSON y arreglos JSON
    /**
     *
     *
     *
     *
     *
     */



    /*var nombre:string='Cesar' //String
         var edad:number=20 //number
         var sueldo=120.50 //number
         var casado=false//boolean
         var hijos=null//null
         var alas=undefined//undefined*/


    //usar let en lugar de var
  //para variables usar const (variable constante)


}

let objeto:any = {
    propiedad : 'valor'
};
objeto.propiedad
//*******aniadir propiedad a un objeto
//1era forma
objeto.propiedad2='valor2';//debo definir el objeto como any 1ero
//2da forma
objeto['propiedad3']='valor3'

//*******eliminar propiedad
//peligrosa
delete objeto.propiedad3;

//segura
objeto.propiedad3=undefined;



const json=[
    {
    "llave":"valor",
    "nombre":"Cesar",
    "edad":23,
    "sueldo":30.5,
    "booleano":false,
    "nulo":null,
    "String":"nada",
    "mascotas":["String",23,23.4,null,false,{"nombre":"cachetes"}]

}
];



/*
@nombreDecoradorClase //antes de instaciar clases, metodos, atributos. Un decorador es una función, Se ejecuta antes de crearse. DECORADPR->Funcion
class clase{
  @decoradorAtributo
  public publico;
  private privado;
  protected protegido;
  constructor(@parametro()publ,priv,prot){
    this.publico=publ;
    this.privado=priv;
    this.protegido=prot;
  }
  @metodoA
  public metodopublico(){
  }
    @metodob
  private metodoprovado(){}
    @metodoC //und decorador es una función que se ejecuta antes de algo(clases,parametros,metodoso,atributos)
  protected metodoprotected(){}
}*/

