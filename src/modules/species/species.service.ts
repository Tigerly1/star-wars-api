import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Species } from 'src/graphql/models/species.model';
import { DataFetchService } from '../../common/services/data-fetch.service';
import { GenericSwapiService, ISwapiService } from '../generic-swapi.service';
import { CacheService } from 'src/common/services/cache.service';

@Injectable()
export class SpeciesService {
  private readonly swapiService: ISwapiService<Species>;

  protected baseUrl = 'https://swapi.dev/api/species';
  protected cacheKey = 'species';

  constructor(
    dataFetchService: DataFetchService,
    cacheService: CacheService,
  ) {
    this.swapiService = new GenericSwapiService<Species>(
      this.baseUrl, 
      this.cacheKey, 
      dataFetchService, 
      cacheService
    );
  }

  getAll(): Promise<Species[]> {
    return this.swapiService.getAll();
  }

  getPage(page: number): Promise<Species[]> {
    return this.swapiService.getPage(page);
  }

  findOne(id: number): Promise<Species> {
    return this.swapiService.findOne(id);
  }
}
