// Path: src/modules/planet/planet.service.ts

import { Injectable } from '@nestjs/common'
import { DataFetchService } from '../../common/services/data-fetch.service'
import { type Planet } from '../../graphql/models/planet.model'
import { GenericSwapiService, type ISwapiService } from '../generic-swapi.service'
import { CacheService } from '../../common/services/cache.service'

@Injectable()
export class PlanetService {
  private readonly swapiService: ISwapiService<Planet>

  protected baseUrl = 'https://swapi.dev/api/planets'
  protected cacheKey = 'planets'

  constructor (
    dataFetchService: DataFetchService,
    cacheService: CacheService
  ) {
    this.swapiService = new GenericSwapiService<Planet>(
      this.baseUrl,
      this.cacheKey,
      dataFetchService,
      cacheService
    )
  }

  async getAll (): Promise<Planet[]> {
    return await this.swapiService.getAll()
  }

  async getPage (page: number): Promise<Planet[]> {
    return await this.swapiService.getPage(page)
  }

  async findOne (id: number): Promise<Planet> {
    return await this.swapiService.findOne(id)
  }
}
