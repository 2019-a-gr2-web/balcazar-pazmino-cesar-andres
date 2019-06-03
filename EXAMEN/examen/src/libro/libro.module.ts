import { Module } from "@nestjs/common";
import { LibroController } from "./libro.controller";
import { LibroService } from "./libro.service";
import { AutorService } from "../autor/autor.service";


@Module(
    {
        imports:[],
        controllers:[LibroController],
        providers:[LibroService,AutorService],
        exports:[LibroService]
    }
)
export class LibroModule{

}