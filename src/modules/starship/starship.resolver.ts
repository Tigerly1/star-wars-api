import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { StarShipService } from './starship.service';
import { StarShip } from '../../graphql/models/starship.model';
import { PaginationArgs } from '../../graphql/dto/pagination.args';

@Resolver(() => StarShip)
export class StarShipResolver {
  constructor(private starShipService: StarShipService) {}

  @Query(() => [StarShip], { description: 'Retrieve a list of all starships, with optional pagination.' })
  async starships(@Args() paginationArgs: PaginationArgs) { // Fix parameter type
    if (typeof paginationArgs.page === 'number') {
        return this.starShipService.getPage(paginationArgs.page);
    }else{
        return this.starShipService.getAll();
    }
}

  @Query(() => StarShip, { description: 'Retrieve a single starship by unique ID.' })
  async starship(@Args('id', { type: () => Int }) id: number) {
    return this.starShipService.findOne(id);
  }
}
