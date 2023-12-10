import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Planet } from 'src/graphql/models/planet.model';
import { PlanetService } from './planet.service';
import { PaginationArgs } from 'src/graphql/dto/pagination.args';

@Resolver(() => Planet)
export class PlanetResolver {
  constructor(private planetService: PlanetService) {}

  @Query(() => [Planet])
  async planets(@Args() paginationArgs: PaginationArgs) { // Fix parameter type
    if (typeof paginationArgs.page === 'number') {
        return this.planetService.getPage(paginationArgs.page);
    }else{
        return this.planetService.getAll();
    }
}

  @Query(() => Planet, { nullable: true })
  async planet(@Args('id', { type: () => Int }) id: number) {
    return this.planetService.findOne(id);
  }
}