import { Injectable } from '@nestjs/common'
import { DataFetchService } from '../..//common/services/data-fetch.service'
import { type StarShip } from '../../graphql/models/starship.model'
import { GenericSwapiService, type ISwapiService } from '../generic-swapi.service'
import { CacheService } from '../../common/services/cache.service'

@Injectable()
export class StarShipService {
  private readonly swapiService: ISwapiService<StarShip>

  protected baseUrl = 'https://swapi.dev/api/starships'
  protected cacheKey = 'starships'

  constructor (
    dataFetchService: DataFetchService,
    cacheService: CacheService<StarShip>
  ) {
    this.swapiService = new GenericSwapiService<StarShip>(
      this.baseUrl,
      this.cacheKey,
      dataFetchService,
      cacheService
    )
  }

  async getAll (): Promise<StarShip[]> {
    return await this.swapiService.getAll()
  }

  async getPage (page: number): Promise<StarShip[]> {
    return await this.swapiService.getPage(page)
  }

  async findOne (id: number): Promise<StarShip> {
    return await this.swapiService.findOne(id)
  }
}
