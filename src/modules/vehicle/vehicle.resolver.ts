import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from '../../graphql/models/vehicle.model';
import { PaginationArgs } from '../../graphql/dto/pagination.args';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private vehicleService: VehicleService) {}

  @Query(() => [Vehicle], { description: 'Retrieve a list of all vehicles, with optional pagination.' })
  async vehicles(@Args() paginationArgs: PaginationArgs) { // Fix parameter type
    if (typeof paginationArgs.page === 'number') {
        return this.vehicleService.getPage(paginationArgs.page);
    }else{
        return this.vehicleService.getAll();
    }
}

  @Query(() => Vehicle, { description: 'Retrieve a single vehicle by unique ID.' })
  async vehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehicleService.findOne(id);
  }
}
