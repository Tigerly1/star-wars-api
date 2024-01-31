import { Injectable } from '@nestjs/common'
import { type Vehicle } from '../../graphql/models/vehicle.model'
import { DataFetchService } from '../../common/services/data-fetch.service'
import { CacheService } from '../../common/services/cache.service'
import { GenericSwapiService, type ISwapiService } from '../generic-swapi.service'

@Injectable()
export class VehicleService {
  private readonly swapiService: ISwapiService<Vehicle>

  protected baseUrl = 'https://swapi.dev/api/vehicles'
  protected cacheKey = 'vehicles'

  constructor (
    dataFetchService: DataFetchService,
    cacheService: CacheService<Vehicle>
  ) {
    this.swapiService = new GenericSwapiService<Vehicle>(
      this.baseUrl,
      this.cacheKey,
      dataFetchService,
      cacheService
    )
  }

  async getAll (): Promise<Vehicle[]> {
    return await this.swapiService.getAll()
  }

  async getPage (page: number): Promise<Vehicle[]> {
    return await this.swapiService.getPage(page)
  }

  async findOne (id: number): Promise<Vehicle> {
    return await this.swapiService.findOne(id)
  }
}
