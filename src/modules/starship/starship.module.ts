import { Module } from '@nestjs/common';
import { StarShipService } from './starship.service';
import { StarShipResolver } from './starship.resolver';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [StarShipService, StarShipResolver],
})
export class StarShipModule {}
