import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GastronomicPlacesController } from './gastronomic-places.controller';
import { gastronomiProviders } from './gastronomic-places.provider';
import { GastronomicPlaceService } from './gastronomic-places.service';


@Module({
  imports: [DatabaseModule],
  controllers: [GastronomicPlacesController],
  providers: [
    ...gastronomiProviders,
    GastronomicPlaceService],
})
export class GastronomicPlaceModule {}