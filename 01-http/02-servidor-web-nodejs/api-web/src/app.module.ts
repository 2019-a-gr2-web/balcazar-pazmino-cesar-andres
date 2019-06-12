import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm'
import {TragosEntity} from "./tragos/tragos.entity";

//para usar el ORM

@Module({
  imports: [
      TragosModule,
      TypeOrmModule.forRoot({
          name: 'default',//nombre de cadena de conexión por defecto del TypeORM
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'password',
          database: 'test',
          entities: [
              TragosEntity
          ],
          synchronize: true,
          extra:{
              insecureAuth:true
          }
      }),
  ],//aqui van los modulos
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{

}
