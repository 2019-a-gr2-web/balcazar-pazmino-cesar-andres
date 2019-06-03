import { Module } from "@nestjs/common";
import { AutorController } from "./autor.controller";
import { AutorService } from "./autor.service";
import { LibroModule } from "src/libro/libro.module";

@Module(
    {
        imports:[],
        controllers:[AutorController],
        providers:[AutorService],
        exports:[AutorService]
    }
)
export class AutorModule{

}