// src/film/film.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Film } from '../../graphql/models/film.model';
import { DataFetchService } from '../../common/services/data-fetch.service';
import { CacheService } from '../../common/services/cache.service';
import { GenericSwapiService, ISwapiService } from '../generic-swapi.service';


@Injectable()
export class FilmService {
  private readonly swapiService: ISwapiService<Film>;

  protected baseUrl = 'https://swapi.dev/api/films';
  protected cacheKey = 'films';

  constructor(
    dataFetchService: DataFetchService,
    cacheService: CacheService,
  ) {
    this.swapiService = new GenericSwapiService<Film>(
      this.baseUrl, 
      this.cacheKey, 
      dataFetchService, 
      cacheService
    );
  }

  getAll(): Promise<Film[]> {
    return this.swapiService.getAll();
  }

  getPage(page: number): Promise<Film[]> {
    return this.swapiService.getPage(page);
  }

  findOne(id: number): Promise<Film> {
    return this.swapiService.findOne(id);
  }
}
