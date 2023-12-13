// Path: src/modules/planet/planet.service.ts

import { Injectable } from '@nestjs/common';
import { DataFetchService } from '../../common/services/data-fetch.service';
import { Planet } from '../../graphql/models/planet.model';
import axios from 'axios';
import { GenericSwapiService, ISwapiService } from '../generic-swapi.service';
import { CacheService } from '../../common/services/cache.service';

@Injectable()
export class PlanetService {
  private readonly swapiService: ISwapiService<Planet>;

  protected baseUrl = 'https://swapi.dev/api/planets';
  protected cacheKey = 'planets';

  constructor(
    dataFetchService: DataFetchService,
    cacheService: CacheService,
  ) {
    this.swapiService = new GenericSwapiService<Planet>(
      this.baseUrl, 
      this.cacheKey, 
      dataFetchService, 
      cacheService
    );
  }

  getAll(): Promise<Planet[]> {
    return this.swapiService.getAll();
  }

  getPage(page: number): Promise<Planet[]> {
    return this.swapiService.getPage(page);
  }

  findOne(id: number): Promise<Planet> {
    return this.swapiService.findOne(id);
  }
}