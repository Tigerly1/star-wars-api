import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { StarShipService } from './starship.service';
import { StarShip } from 'src/graphql/models/starship.model';

@Resolver(() => StarShip)
export class StarShipResolver {
  constructor(private starShipService: StarShipService) {}

  @Query(() => [StarShip])
  async starships() {
    return this.starShipService.findAll();
  }

  @Query(() => StarShip, { nullable: true })
  async starship(@Args('id', { type: () => Int }) id: number) {
    return this.starShipService.findOne(id);
  }
}
