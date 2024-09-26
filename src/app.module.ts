import { Module } from '@nestjs/common';
import { RolModule } from './rol/rol.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GastronomicPlaceModule } from './gastronomic-places/gastronomic-places.module';
import { LodgingModule } from './lodging/lodging.module';


@Module({
  imports: [RolModule, UserModule, LodgingModule, GastronomicPlaceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
