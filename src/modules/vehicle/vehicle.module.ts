import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleResolver } from './vehicle.resolver';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [VehicleService, VehicleResolver],
})
export class VehicleModule {}
