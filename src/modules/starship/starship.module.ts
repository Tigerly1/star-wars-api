import { Module } from '@nestjs/common';
import { StarShipService } from './starship.service';
import { StarShipResolver } from './starship.resolver';

@Module({
  providers: [StarShipService, StarShipResolver],
})
export class StarShipModule {}
