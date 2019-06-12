import { Controller, Get, Post, HttpCode, Put, Delete, Headers, Query, Param, Body, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
//modo javascript
import * as Joi from '@hapi/joi';
import {reduce} from "rxjs/operators";
//modo typescript
//const Joi = require('@hapi/joi');
//http:ip:puerto/segmentoInicial/segmentoInicial
//@Controller(Segemento)
//el segmento Accion se pone en cada método




@Controller('/api')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

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
    holaMundo() {
        return 'Hola mundo';
    }

    @Post('/hello-world')
    helloWorld() {
        return 'Hello world';
    }

    @Put('/salut-monde')
    putBonJour() {
        return 'salut-monde';
    }

    @Delete('/ola-mundo')
    olaMundo() {
        return 'ola mundo';
    }

    //un decorador es la ejecucion de una funcion
    @Get('/adivina')
    adivina(@Headers() headers) { // parametro de un metodo de una clase, la clase headers usar la cabecera de nestjs, verificar si está importado, con esto tengo acceso a las cabeceras
        //estoy usando el decorador @Headers para el parametro headers

        const numeroRandom = Math.round(Math.random() * 10)
        //return numeroRandom;// en javascrip no existen enteros, son numeros y ya
        console.log('Headers: ', headers);
        // return headers.alv
        const numeroCabecer = Number(headers.numero)
        if (numeroCabecer == numeroRandom) {
            return 'ok'
        } else {
            return ':('
        }

    }


    //parametros de clave y valor (le indicamos cómo va mandar los datos el cliente)
    //?llave=valor&llave2=valor2

    //parametro de query
    //en el postman poner : localhost:3000/api/consultar?nombre=loquesea (&)
    //los parametros de consulta clave y valor se reciben como un objeto JS
    @Get('/consulta')
    consultar(@Query() queryParams) {
        console.log(queryParams)
        if (queryParams.nombre) {
            return 'hola ' + queryParams.nombre
        } else {
            return 'hola extranio'
        }
    }

    //cabeceras sirven para seguridad y comunicacion entre c/s


    //parametros de RUTA
    //@Params
    @Get('/ciudad/:idCiudad/:canton')
    ciudad(@Param() parametrosRuta) {
        switch (parametrosRuta.idCiudad.toLowerCase()) {
            case 'quito':
                return 'Que fuef'
            case 'guayaquil':
                return 'Pasa el celular'

            default:
                return 'buenas tardes'
        }
    }


    //PARAMETROS DE CUERPO
    //el metodo get no recibe parametros de cuerpo
    //solo para cierto tipos de parametros de cuerpo
    @Post('registrocomida')
    registroComida(@Body() parametrosCuerpo/*, @Request() request*/, @Response() response) { //si utiliza response ya no puedo usar return, ahora el programador debe verificar como enviar la respuesta, buscar en expressjs response

        /* console.log(parametrosCuerpo)


         console.log(request.body)*/


        if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad) {
            const cantidad = Number(parametrosCuerpo.cantidad);
            if (cantidad > 1) {
                response.set('Premio', 'Guatita');
                return response.send({ mensaje: 'Registro Creado' });

                // return 'Registro actualizado';
            } else {

                return response.status(400).send(
                    {
                        mensaje: 'Error',
                        error: 400
                    }); //porque seria un error del cliente enviar mal
                //return 'Error, no envia nombre o cantidad';
            }


        }
    }


  //  @Get('/semilla')
    //semilla(@Request() res, /*esta cookie en cambio es para la cooki que se envia desde el servidor*/@Response() response) {
    //    console.log(res.cookies);
        //return 'ok'

        //para usar cookies usar : #npm install cookie-parser

        //luego usar cookie parser en el main.ts

        //const noHayCookie=!res.cookies;
      //  const cookies = res.cookies; //devuelve un JSON

        //primero se crea un esquema de validacion
        //SOLO SE PUEDE VALIDAR OBJETOS JSON
        //es decir por cada tipo de validacion crear un esquema, un esuquema por formulario: cuando se cree, cuando se actualice, cuando se borre
        //const esquemaValidacionNumero = Joi.object().keys(
        //    {
         //       numero: Joi.number().integer().required()
         //   }

        //);
        //1er parametro objeto a validar, 2do esquema de validacion
     //   const resultado = Joi.validate({//JSON a validar
       //     numero: cookies.numero
      //  }, esquemaValidacionNumero);

      // if (resultado.error) {
       //     console.log('resultado: ', resultado)
       // } else {
      //      console.log('Numero valido')
      //  }


        //request.cookies//cookies no seguras
        //request.signedCookies//cookies seguras


       // if (cookies.micookie) {
            //esta cookie que voy hacer abajito se manda desde el servidor, las que se mandaban desde la pagina web eran del cliente
        //    const horaFechaServidor = new Date();
         //   const minutos = horaFechaServidor.getMinutes();
        //    horaFechaServidor.setMinutes(minutos + 1);


          //  response.cookie(
          //      'Fecha servidor', //nombre (key)
          //      new Date().getTime(),//valor(value)
          //      {//opciones
                    //expires: horaFechaServidor // una aplicacion de esto, es las sesiones, que expirarian en x tiempo
          //      }
           // )
            //dos tipos de cookies: seguras e inseguras
           // return response.set('Ok')
       // } else {
        //    return ':('
//    }


    @Get('/semilla2')
    semilla2(
        @Request() request,
        @Response() response
    ) {
        //console.log(request.cookies);
        const cookies = request.cookies; // JSON

        const esquemaValidacionNumero = Joi
            .object()
            .keys({
                numero: Joi.number().integer().required()
            });

        const objetoValidacion = {
            numero: cookies.numero
        };
        const resultado = Joi.validate(objetoValidacion,
            esquemaValidacionNumero);

        if (resultado.error) {
            console.log('Resultado: ', resultado);
        } else {
            console.log('Numero valido');
        }

        const cookieSegura = request.signedCookies.fechaServidor;
        if (cookieSegura) {
            console.log('Cookie segura', cookieSegura);
        } else {
            console.log('No es valida esta cookie');
        }

        if (cookies.micookie) {

            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos + 1);

            response.cookie(
                'fechaServidor',      // NOMBRE (key)
                new Date().getTime(),  // VALOR  (value)
                {    // OPCIONES
                    // expires: horaFechaServidor
                    signed: true
                }
            );

            return response.send('ok');
        } else {
            return response.send(':(');
        }

    }


    //Cookie insegura retornando un JSON
    @Get('/setearNombre')
    deber(@Request() req, @Response() res) {

        const galleta = req.cookies;

        if (galleta.nombre) {
            res.cookie(

                'nombreUsuario', galleta.nombre

            );
        } else {
            return "error";
        }

        return res.send(
            {
                nombreUsuario: galleta.nombre,

                resultado: 2
            }
        )

    }

    @Get('inicio') //end point
    inicio(@Response() res){
        return res.render('inicio',
            {
                estaVivo:true
            }
            );//aqui se pueden enviar parametros a la vista
    }

    @Get('peliculas')
    peliculas(@Response() res){
        return res.render('peliculas/inicio',
            {
                //aqui se pueden enviar parametros a la vista
            }
        );
    }

    @Get('estilos') //end point
    estilos(@Response() res){
        return res.render('peliculas/estilos',
            {

            }
        );
    }


   /* @Get('inicio')
    inicio(
        @Response() res
    ) {
        return res.render('inicio');
    }*/
}







/*
let objeto:any = {
    propiedad : 'valor'
};*/
/*
objeto.propiedad
//*******aniadir propiedad a un objeto
//1era forma
objeto.propiedad2='valor2';//debo definir el objeto como any 1ero
//2da forma
objeto['propiedad3']='valor3'*/
/*
//*******eliminar propiedad
//peligrosa
delete objeto.propiedad3;

//segura
objeto.propiedad3=undefined;*/


/*
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
];*/



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
//
//
// //usar let en lugar de var
// //para variables usar const (variable constante)
// //en ts sí es tipado
// function suma(a:number,b:number):number{
//     return a+b;
// }
//
//
// //condicionales en js
// //Truty
// //Falsy
// if(true){//truty
//     console.log('Verdadero')
// }else{
//     console.log('False')
// }
//
//
// if(""){//Falsy // un string vacio es falso
//     console.log('Verdadero ""');
// }else{
//     console.log('False ""');
// }
//
// if("a"){//un string con más de un caracter es verdadero
//     console.log('Verdadero "a"')
// }else{
//     console.log('Falso "a"')
// }
//
//
// if(0){ //falso
//     console.log('Verdadero "0"')
// }else{
//     console.log('Falso "0"')
// }
//
// if("0"){ //true
//     console.log('Verdadero "0"')
// }else{
//     console.log('Falso "0"')
// }
//
// if(-1){//falso
//
// }else{
//
// }
//
// if(1){//verdadero
//
// }else{
//
// }
//
//
// if(undefined){//Falsy
//
// }else{
//
// }
//
//
// if(null){//falsy
//
// }else{
//
// }
//
// //Un objeto JSON vacío es TRUTY
//
//
// //OPERADORES DE ARREGLOS JS
//
// const arreglo=[1,'A',true,null,{},[5,null,false,undefined,function (){return 1;}]]
//
// //una variable en JS se le puede asignar cualquier tipo de variable
//
// //a una variable también se le puede guardar una función
//
// var sumar=function (a,b) {
//     return a+b;
// }
// //si uso CONST no puedo redefenir!!!!!!!!!!!!!!!!!
//
//
//
// const arregloNumeros=[1,2,3,4,5,6,7,8,9]
//
// //1) Imprimir en consola todos los elementos
// const rForEach=arregloNumeros.forEach(function (valorActual/*,indice,arreglo*/) {
//     console.log(`valor: ${valorActual}`);
//     //console.log(`Indice: ${indice}`);
//     //console.log(`Arreglo: ${arreglo}`);
// });
//
// console.log(`Respuesta foreach: ${rForEach}`); //foreach es una funcion que no devuelve nada
//
// //funciones anonimas (=>)
// arregloNumeros.forEach(dato=>{
//     console.log(`Valor actual: ${dato}`)
// })
//
// //2) Sumen 2 a los pares y 1 a los impares
// //mutar o transformar el arreglo:map
// arregloNumeros.map(valor=>{
//     const esPar=valor%2;
//     if(esPar==0){
//         return valor+2;
//     }else{
//         return valor+1;
//     }
// });
//
//
//
// //3) Encontrar si hay el numero 4
//
// const encontrar=arregloNumeros.find(valor=>{//si no encuentra regresa false o undefined.
//     return valor==4;
// })
// //4) Filtrar los números menores a 5
//
// const filtrado=arregloNumeros.filter(valor=>{ //devuelve un nuevo arreglo
//     return valor<5;
// })
//
// //5) Todos los valores positivos?
//
//
// const arregloNumerosEvery=[1,2,3,4,5,6,7,8,9]
//
// //si TODOS cumplen TRUE caso contrario FALSE, es como AND
// arregloNumerosEvery.every(
//     (valoractual)=>{
//         return valoractual>0;
//     }
// );
//
//
// //6) Algun valor es menor que 2
//
//
// const arregloNumerosSome=[1,2,3,4,5,6,7,8,9]
// arregloNumerosSome.some(//si alguno cumple TRUE, sin ninguno cumple FALSE
//     (valorActual)=>{
//         return valorActual< 2;
//     }
// );
//
//
//
// //7) Sumar todos los valores
// const arregloNumerosSumarTodos=[1,2,3,4,5,6,7,8,9];
// const valorDondeEmpiezaCalculo=0;
//
// arregloNumerosSumarTodos.reduce(
//     (acumulado,actual)=>{
//         return acumulado+=actual;
//     },valorDondeEmpiezaCalculo//desde aqui el acumulado es 0
// );
//
// //8) Restar todos los valores de 100
//
// const arregloNumerosRestarDe=[1,2,3,4,5,6];
//
// const r=arregloNumerosRestarDe.reduce(
//     (acumulado,actual)=>{
//         return acumulado-=actual;
//     },100
// );
//
// console.log(r);
//
//
// //cuando <4  -> +10%+5
// //cuando>=4 ->+15%+4
//
// const arregloEjemplo=[1,2,3,4,5,6,7,8,9];
//
// /*arregloEjemplo.filter(
//     valor=>{
//         return valor<4;
//     }
// ).map(
//     valor=>{
//         valor=valor+(valor*0.1)+4;
//     }
// );*/
//
// arregloEjemplo.reduce(
//     (acumulado,actual)=>{
//         if(actual<4){
//             return acumulado+actual*1.1+5;
//         }else{
//             return acumulado+actual*1.15+3;
//         }
//     }
// );
//
//
//
//
//
//
//
// //1.1) sumar 10 a todos
// //1.2) Filtrar a los >15
// //1.3) Si hay algun número mayor a 30
//
//
// const arregloNumerosFin=[1,2,3,4,5,6];
//
// const tof=arregloNumerosFin.map(
//     valor=>{
//         return valor+=10;
//     }
// ).filter(
//     valor=>{
//         return valor>15;
//     }
// ).some(
//     valor=>{
//         return valor>30;
//     }
// );
//
//
// console.log(tof);