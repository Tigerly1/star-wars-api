import { Injectable } from '@nestjs/common'
import { DataFetchService } from '../../common/services/data-fetch.service'
import { type Person } from '../../graphql/models/person.model'
import { GenericSwapiService, type ISwapiService } from '../generic-swapi.service'
import { CacheService } from '../../common/services/cache.service'

@Injectable()
export class PeopleService {
  private readonly swapiService: ISwapiService<Person>

  protected baseUrl = 'https://swapi.dev/api/people'
  protected cacheKey = 'people'

  constructor (
    dataFetchService: DataFetchService,
    cacheService: CacheService<Person>
  ) {
    this.swapiService = new GenericSwapiService<Person>(
      this.baseUrl,
      this.cacheKey,
      dataFetchService,
      cacheService
    )
  }

  async getAll (): Promise<Person[]> {
    return await this.swapiService.getAll()
  }

  async getPage (page: number): Promise<Person[]> {
    return await this.swapiService.getPage(page)
  }

  async findOne (id: number): Promise<Person> {
    return await this.swapiService.findOne(id)
  }
}
