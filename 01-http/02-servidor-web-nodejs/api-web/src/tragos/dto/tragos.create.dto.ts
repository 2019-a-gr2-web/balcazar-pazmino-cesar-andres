import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DistribuidorEntity} from "../../distribuidor/distribuidor.entity";
import {FiestaEntity} from "../../fiesta/fiesta.entity";
import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class TragosCreateDto {


    @IsEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    tipo: 'Ron' | 'Vodka' | 'Whiskey' | 'Tequila' | 'Puntas' | 'Cerveza';

    @IsNotEmpty()
    @IsNumber()
    gradoAlcohol: number;

    @IsDate()
    @IsOptional()
    fechaCaducidad: Date;

    @IsNumber()
    precio: number;

    //@IsNumber()
    distribuidorFK: DistribuidorEntity;

    //fiestas: FiestaEntity[];
}