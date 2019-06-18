import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {OneToMany} from "typeorm";
import {TragosEntity} from "../tragos/tragos.entity";

@Entity('db_distribuidor')
export class DistribuidorEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    //como es el papa de TRAGOS, tiene muchos tragos (one to many)
    //https://typeorm.io/#/many-to-one-one-to-many-relations

    @OneToMany(type=> TragosEntity,trago=> trago.distribuidorFK)
    tragos:TragosEntity[] //nombre de la relacion
}