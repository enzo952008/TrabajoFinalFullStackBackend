import { Module } from '@nestjs/common';
import { RolModule } from './rol/rol.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GastronomicPlaceModule } from './gastronomic-places/gastronomic-places.module';
import { LodgingModule } from './lodging/lodging.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    RolModule,
    UserModule,
    LodgingModule,
    GastronomicPlaceModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }