import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from 'src/graphql/models/vehicle.model';
import { PaginationArgs } from 'src/graphql/dto/pagination.args';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private vehicleService: VehicleService) {}

  @Query(() => [Vehicle])
  async vehicles(@Args() paginationArgs: PaginationArgs) { // Fix parameter type
    if (typeof paginationArgs.page === 'number') {
        return this.vehicleService.getPage(paginationArgs.page);
    }else{
        return this.vehicleService.getAll();
    }
}

  @Query(() => Vehicle, { nullable: true })
  async vehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehicleService.findOne(id);
  }
}
