import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from '../common/services/cache.service';
import { DataFetchService } from '../common/services/data-fetch.service';

export interface ISwapiService<T> {
  getAll(): Promise<T[]>;
  getPage(page: number): Promise<T[]>;
  findOne(id: number): Promise<T>;
}

@Injectable()
export class GenericSwapiService<T> implements ISwapiService<T> {
  constructor(
    @Inject('BASE_URL_TOKEN') private readonly baseUrl: string,
    @Inject("CACHE_KEY_TOKEN") private readonly cacheKey: string,
    private readonly dataFetchService: DataFetchService,
    private readonly cacheService: CacheService,
  ) {}

  async getAll(): Promise<T[]> {
    let items = await this.cacheService.getCachedList(this.cacheKey);
    if (!items) {
      items = await this.dataFetchService.fetchAllData<T>(`${this.baseUrl}`);
      await this.cacheService.saveCachedList(this.cacheKey, items);
      await this.cacheService.saveIndividualItems(this.cacheKey, items);
    }

    return items;
  }

  async getPage(page: number): Promise<T[]> {
    let items = await this.cacheService.getCachedList(this.cacheKey, page);

    if (!items) {
      let response = await axios.get(`${this.baseUrl}/?page=${page}`);
      items = response.data.results;
      await this.cacheService.saveCachedList(this.cacheKey, items, page);
      await this.cacheService.saveIndividualItems(this.cacheKey, items);
    }

    return items;
  }

  async findOne(id: number): Promise<T> {
    let item = await this.cacheService.getCachedItem(this.cacheKey, id.toString());

    if (!item) {
      let response = await axios.get(`${this.baseUrl}/${id}/`);
      item = response.data;
      await this.cacheService.saveCachedItem(this.cacheKey, id.toString(), item);
    }

    return item;
  }
}
