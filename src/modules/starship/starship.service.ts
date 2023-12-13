import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DataFetchService } from '../..//common/services/data-fetch.service';
import { StarShip } from '../../graphql/models/starship.model';
import { GenericSwapiService, ISwapiService } from '../generic-swapi.service';
import { CacheService } from '../../common/services/cache.service';

@Injectable()
export class StarShipService {
  private readonly swapiService: ISwapiService<StarShip>;

  protected baseUrl = 'https://swapi.dev/api/starships';
  protected cacheKey = 'starships';

  constructor(
    dataFetchService: DataFetchService,
    cacheService: CacheService,
  ) {
    this.swapiService = new GenericSwapiService<StarShip>(
      this.baseUrl, 
      this.cacheKey, 
      dataFetchService, 
      cacheService
    );
  }

  getAll(): Promise<StarShip[]> {
    return this.swapiService.getAll();
  }

  getPage(page: number): Promise<StarShip[]> {
    return this.swapiService.getPage(page);
  }

  findOne(id: number): Promise<StarShip> {
    return this.swapiService.findOne(id);
  }
}
