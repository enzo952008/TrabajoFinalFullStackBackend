import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RolModule } from './rol/rol.module';
import { UserModule } from './user/user.module';
import { GastronomicPlaceModule } from './gastronomic-places/gastronomic-places.module';
import { LodgingModule } from './lodging/lodging.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Carpeta donde se almacenarán los archivos
      serveRoot: '/uploads', // URL base para acceder a los archivos
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AuthModule,
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
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
