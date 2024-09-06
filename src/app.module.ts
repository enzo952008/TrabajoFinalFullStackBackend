import { Module } from '@nestjs/common';
import { RolModule } from './rol/rol.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [RolModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
