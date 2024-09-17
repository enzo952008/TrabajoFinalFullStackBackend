import { Module } from '@nestjs/common';
import { LodgingService } from './lodging.service';
import { LodgingController } from './lodging.controller';
import { lodgingProviders } from './lodging.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LodgingController],
  providers: [
    ...lodgingProviders,
    LodgingService],
})
export class LodgingModule {}
