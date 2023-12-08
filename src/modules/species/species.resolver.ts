import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Species } from '../../graphql/models/species.model';
import { SpeciesService } from './species.service';

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(private specieService: SpeciesService) {}

  @Query(() => [Species])
  async species() {
    return this.specieService.findAll();
  }

  @Query(() => Species, { nullable: true })
  async oneOfSpecies(@Args('id', { type: () => Int }) id: number) {
    return this.specieService.findOne(id);
  }
}
