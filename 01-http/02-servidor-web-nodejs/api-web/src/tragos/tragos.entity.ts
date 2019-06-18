import {Entity, ManyToOne} from "typeorm";
import {Column} from "typeorm";
import {PrimaryGeneratedColumn} from "typeorm";
import {DistribuidorEntity} from "../distribuidor/distribuidor.entity";
import {OneToMany} from "typeorm";
import {FiestaEntity} from "../fiesta/fiesta.entity";

@Entity('bd_trago') //aqui se pasa el nombre tabla (se puede)
export class TragosEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        name:'nombre_trago', //nombre que quiero que se ponga directamente en la bd
        type:'varchar',
        length:70
    })
    nombre:string;//este es el nombre del codigo, pero en la bd se muestra como esta arriba

    @Column({
        type: 'varchar',
        length: 10,
        name: 'tipo_trago',
    })
    tipo: 'Ron'|'Vodka'|'Whiskey'|'Tequila'|'Puntas'|'Cerveza';

    @Column({
        type: 'int',
        name: 'grados_alcohol',
    })
    gradoAlcohol: number;

    @Column({
        type: 'date',
        name: 'fecha_caducidad',
    })
    fechaCaducidad: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        name: 'precio',
    })
    precio: number;


    @ManyToOne(
        type=>DistribuidorEntity,
        distribuidor=>distribuidor.tragos
    )
    distribuidorFK: DistribuidorEntity;


    @OneToMany( type => FiestaEntity, fiesta => fiesta)
    fiestas: FiestaEntity[]

}