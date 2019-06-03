import { Injectable } from "@nestjs/common";
import { Autor } from "./Interface/autor";

@Injectable()
export class AutorService{
    bdautor:Autor[]=[];
    id=0;

    constructor(){
        const autor1:Autor={
            nombres:"Dan",
            apellidos:"Brown",
            numeroLibros:10,
            fechaNacimiento:new Date(1964,5,22),
            ecuatoriano:false
        }

        const autor2:Autor={
            nombres:"Juan Leon",
            apellidos:"Mera",
            numeroLibros:15,
            fechaNacimiento:new Date(1832,5,28),
            ecuatoriano:true
        }

        const autor3:Autor={
            nombres:"Camila",
            apellidos:"Lackberg",
            numeroLibros:13,
            fechaNacimiento:new Date(1974,7,30),
            ecuatoriano:false
        }

        this.insertar(autor1);
        this.insertar(autor2);
        this.insertar(autor3);

    }
    insertar(autor: Autor): Autor[] {
        autor.id = this.id;
        
        this.bdautor.push(autor);
        this.id++;
        return this.bdautor;

    }

    eliminar(id: number): Autor[] {

        
        const index = this.bdautor.findIndex(
            value => {
                return value.id === id;
            }
        );
           
        return this.bdautor.splice(index, 1);
    }

    nombresegunid(id:number):string{
        var autor:string;
        this.bdautor.forEach(
            value=>{
                if(value.id==id){
                    autor=String(value.nombres)+" "+String(value.apellidos);
            
                }
            }
        )

        return autor;
    }


    buscarpornombreautor(nombres:string):Autor[]{
        const autorpornombre=this.bdautor.filter(
            value=>{
                return value.nombres.toLowerCase().includes(nombres.toLowerCase());
            }
        )

        return autorpornombre;
    }
}