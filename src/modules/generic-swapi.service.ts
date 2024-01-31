import { Inject, Injectable } from '@nestjs/common'
import axios from 'axios'
import { CacheService } from '../common/services/cache.service'
import { DataFetchService } from '../common/services/data-fetch.service'

export interface ISwapiService<T> {
  getAll: () => Promise<T[]>
  getPage: (page: number) => Promise<T[]>
  findOne: (id: number) => Promise<T>
}

@Injectable()
export class GenericSwapiService<T> implements ISwapiService<T> {
  constructor (
    @Inject('BASE_URL_TOKEN') private readonly baseUrl: string,
    @Inject('CACHE_KEY_TOKEN') private readonly cacheKey: string,
    private readonly dataFetchService: DataFetchService,
    private readonly cacheService: CacheService<T>
  ) {}

  getAll = async (): Promise<T[]> => {
    let items: T[] | null = await this.cacheService.getCachedList(this.cacheKey)
    if (items === null) {
      items = await this.dataFetchService.fetchAllData<T>(`${this.baseUrl}`)
      await this.cacheService.saveCachedList(this.cacheKey, items)
      await this.cacheService.saveIndividualItems(this.cacheKey, items)
    }

    return items
  }

  getPage = async (page: number): Promise<T[]> => {
    let items: T[] | null = await this.cacheService.getCachedList(this.cacheKey, page)

    if (items === null) {
      const response = await axios.get(`${this.baseUrl}/?page=${page}`)
      items = response.data.results
      if (items === null) {
        throw new Error('No items found for this page')
      }
      await this.cacheService.saveCachedList(this.cacheKey, items, page)
      await this.cacheService.saveIndividualItems(this.cacheKey, items)
    }

    return items
  }

  findOne = async (id: number): Promise<T> => {
    let item: T | null = await this.cacheService.getCachedItem(this.cacheKey, id.toString())

    if (item === null) {
      const response = await axios.get(`${this.baseUrl}/${id}/`)
      item = response.data
      if (item === null) {
        throw new Error('No item found for this id')
      }
      await this.cacheService.saveCachedItem(this.cacheKey, id.toString(), item)
    }
    return item
  }
}
