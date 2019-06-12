import {Injectable} from "@nestjs/common";
import {Trago} from "./interfaces/trago";
import {TragosEntity} from "./tragos.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TragosService {
    bdTragos:Trago[] = [];
    recnum=1;// para gestionar los id de los tragos


    constructor( @InjectRepository(TragosEntity)
                 private readonly _tragosRepositorio: Repository<TragosEntity>,){// ese objeto tiene todos los metodos de SQL
        const traguito:Trago={
            nombre:'Pilsener',
            gradoAlcohol:4.3,
            fechaCaducidad:new Date(2019,5,20),
            precio:1.75,
            tipo:'Cerveza'
        };
        this.crear(traguito)


        const objetoEntidad=this._tragosRepositorio.create(traguito);
        //this._tragosRepositorio.insert(objetoEntidad);
        this._tragosRepositorio.save(objetoEntidad).then(
            (datos)=>{console.log('dato creado',datos)}
        ).catch(
            (error)=>{
                console.error('Error:',error)
            }
        )


    }
    crear(nuevoTrago:Trago):Trago{
        nuevoTrago.id=this.recnum;
        this.recnum++;
        this.bdTragos.push(nuevoTrago);
        return nuevoTrago;
    }

    buscarPorId(id:number):Trago{
        return this.bdTragos.find(
            (trago)=>{
                return trago.id===id; //Por que triple igual?
            }
        )

    }

    buscarPorNombre(nombre:string):Trago{
        return this.bdTragos.find(
            (trago)=>{
                return trago.nombre.toUpperCase().includes(nombre.toUpperCase()); //includes es si incluye algo (como tipo expresion regular)
            }
        )
    }


    //en realidad en JS, en el arreglo, se borra por el indice
    eliminar(id:number):Trago[]{

        //recien obtengo el indice
        const indice=this.bdTragos.findIndex(
            (trago)=>{
                return trago.id===id;
            }
        );

        return this.bdTragos.splice(indice,1); //parametros(indice que quiero empezar, cuantos eliminar)
    }

    actualizar(tragoActualizado:Trago,id:number):Trago[]{

        const indice=this.bdTragos.findIndex(
            (trago)=>{
                return trago.id===id;
            }
        );
        tragoActualizado.id=this.bdTragos[indice].id;
        this.bdTragos[indice]=tragoActualizado;

        return this.bdTragos;
    }

}