// src/film/film.service.ts

import { Injectable } from '@nestjs/common'
import { type Film } from '../../graphql/models/film.model'
import { DataFetchService } from '../../common/services/data-fetch.service'
import { CacheService } from '../../common/services/cache.service'
import { GenericSwapiService, type ISwapiService } from '../generic-swapi.service'

@Injectable()
export class FilmService {
  private readonly swapiService: ISwapiService<Film>

  protected baseUrl = 'https://swapi.dev/api/films'
  protected cacheKey = 'films'

  constructor (
    dataFetchService: DataFetchService,
    cacheService: CacheService<Film>
  ) {
    this.swapiService = new GenericSwapiService<Film>(
      this.baseUrl,
      this.cacheKey,
      dataFetchService,
      cacheService
    )
  }

  async getAll (): Promise<Film[]> {
    return await this.swapiService.getAll()
  }

  async getPage (page: number): Promise<Film[]> {
    return await this.swapiService.getPage(page)
  }

  async findOne (id: number): Promise<Film> {
    return await this.swapiService.findOne(id)
  }
}
