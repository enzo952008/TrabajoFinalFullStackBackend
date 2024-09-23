import { Module } from '@nestjs/common';
import { RolModule } from './rol/rol.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GastronomicPlaceModule } from './gastronomic-places/gastronomic-places.module';

@Module({
  imports: [RolModule, UserModule, GastronomicPlaceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
