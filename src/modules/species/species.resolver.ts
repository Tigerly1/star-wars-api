import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Species } from '../../graphql/models/species.model';
import { SpeciesService } from './species.service';
import { PaginationArgs } from '../../graphql/dto/pagination.args';

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(private speciesService: SpeciesService) {}

  @Query(() => [Species],  { description: 'Retrieve a list of all species, with optional pagination.'})
  async species(@Args() paginationArgs: PaginationArgs) { // Fix parameter type
    if (typeof paginationArgs.page === 'number') {
        return this.speciesService.getPage(paginationArgs.page);
    }else{
        return this.speciesService.getAll();
    }
}

  @Query(() => Species, { description: 'Retrieve a single species by unique ID.'})
  async oneOfSpecies(@Args('id', { type: () => Int }) id: number) {
    return this.speciesService.findOne(id);
  }
}
