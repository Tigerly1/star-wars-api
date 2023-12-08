import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from 'src/graphql/models/vehicle.model';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private vehicleService: VehicleService) {}

  @Query(() => [Vehicle])
  async vehicles() {
    return this.vehicleService.findAll();
  }

  @Query(() => Vehicle, { nullable: true })
  async vehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehicleService.findOne(id);
  }
}
