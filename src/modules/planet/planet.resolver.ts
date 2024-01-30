import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { Planet } from '../../graphql/models/planet.model'
import { PlanetService } from './planet.service'
import { PaginationArgs } from '../../graphql/dto/pagination.args'

@Resolver(() => Planet)
export class PlanetResolver {
  constructor (private readonly planetService: PlanetService) {}

  @Query(() => [Planet], { description: 'Retrieve a list of all planets, with optional pagination.' })
  async planets (@Args() paginationArgs: PaginationArgs): Promise<Planet[]> { // Fix parameter type
    if (typeof paginationArgs.page === 'number') {
      return await this.planetService.getPage(paginationArgs.page)
    } else {
      return await this.planetService.getAll()
    }
  }

  @Query(() => Planet, { description: 'Retrieve a single planet by unique ID.' })
  async planet (@Args('id', { type: () => Int }) id: number): Promise<Planet> {
    return await this.planetService.findOne(id)
  }
}
