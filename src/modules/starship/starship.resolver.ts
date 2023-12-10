import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { StarShipService } from './starship.service';
import { StarShip } from 'src/graphql/models/starship.model';
import { PaginationArgs } from 'src/graphql/dto/pagination.args';

@Resolver(() => StarShip)
export class StarShipResolver {
  constructor(private starShipService: StarShipService) {}

  @Query(() => [StarShip])
  async starships(@Args() paginationArgs: PaginationArgs) { // Fix parameter type
    if (typeof paginationArgs.page === 'number') {
        return this.starShipService.getPage(paginationArgs.page);
    }else{
        return this.starShipService.getAll();
    }
}

  @Query(() => StarShip, { nullable: true })
  async starship(@Args('id', { type: () => Int }) id: number) {
    return this.starShipService.findOne(id);
  }
}
