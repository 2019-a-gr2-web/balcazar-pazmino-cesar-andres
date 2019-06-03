import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibroModule } from './libro/libro.module';
import { AutorModule } from './autor/autor.module';

@Module({
  imports: [LibroModule,AutorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
