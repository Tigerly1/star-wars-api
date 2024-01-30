import { Injectable } from '@nestjs/common'
import { type Species } from '../../graphql/models/species.model'
import { DataFetchService } from '../../common/services/data-fetch.service'
import { GenericSwapiService, type ISwapiService } from '../generic-swapi.service'
import { CacheService } from '../../common/services/cache.service'

@Injectable()
export class SpeciesService {
  private readonly swapiService: ISwapiService<Species>

  protected baseUrl = 'https://swapi.dev/api/species'
  protected cacheKey = 'species'

  constructor (
    dataFetchService: DataFetchService,
    cacheService: CacheService
  ) {
    this.swapiService = new GenericSwapiService<Species>(
      this.baseUrl,
      this.cacheKey,
      dataFetchService,
      cacheService
    )
  }

  async getAll (): Promise<Species[]> {
    return await this.swapiService.getAll()
  }

  async getPage (page: number): Promise<Species[]> {
    return await this.swapiService.getPage(page)
  }

  async findOne (id: number): Promise<Species> {
    return await this.swapiService.findOne(id)
  }
}
