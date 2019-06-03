import { Injectable } from "@nestjs/common";
import { Libro } from "./Interface/libro";

@Injectable()
export class LibroService {

    bdlibro: Libro[] = [];
    id = 1;

    constructor() {
        const libro1: Libro = {
            isbn: 12345,
            nombre: "Codigo Da Vinci",
            numeroPaginas: 300,
            edicion: 1,
            fechaPublicacion: new Date(2001, 0, 20),
            nombreEditorial: "Planeta",
            autorId: 0
        }

        const libro2: Libro = {
            isbn: 54321,
            nombre: "Cumanda",
            numeroPaginas: 100,
            edicion: 1,
            fechaPublicacion: new Date(1879, 0, 1),
            nombreEditorial: "Letra Sabia",
            autorId: 1
        }

        const libro3: Libro = {
            isbn: 66666,
            nombre: "Princesa de Hielo",
            numeroPaginas: 450,
            edicion: 1,
            fechaPublicacion: new Date(2003, 0, 20),
            nombreEditorial: "HarperCollins",
            autorId: 2
        }

        this.insertar(libro1);
        this.insertar(libro2);
        this.insertar(libro3);

    }

    insertar(libro: Libro): Libro[] {
        libro.id = this.id;

        this.bdlibro.push(libro);
        this.id++;
        return this.bdlibro;

    }

    eliminar(id: number): Libro[] {

        const index = this.bdlibro.findIndex(
            value => {
                return value.id === id;
            }
        );


        return this.bdlibro.splice(index, 1);
    }

    librosegunautor(idautor: number): Libro[] {
        const librofiltradoporautor = this.bdlibro.filter(
            value => {
                return value.autorId === idautor;
            }
        )

        return librofiltradoporautor;
    }


    buscarporTitulo(idautor: number, titulo: string): Libro[] {

        if (typeof (titulo) != "undefined") {
            return this.bdlibro.filter(
                value => {
                    return value.nombre.toLowerCase().includes(titulo.toLowerCase()) && value.autorId == idautor;
                });
        } else {
            return this.librosegunautor(idautor);
        }

    }
}