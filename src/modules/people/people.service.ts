import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DataFetchService } from '../../common/services/data-fetch.service';
import { Person } from '../../graphql/models/person.model';
import { GenericSwapiService, ISwapiService } from '../generic-swapi.service';
import { CacheService } from '../../common/services/cache.service';

@Injectable()
export class PeopleService {
  private readonly swapiService: ISwapiService<Person>;

  protected baseUrl = 'https://swapi.dev/api/people';
  protected cacheKey = 'people';

  constructor(
    dataFetchService: DataFetchService,
    cacheService: CacheService,
  ) {
    this.swapiService = new GenericSwapiService<Person>(
      this.baseUrl,
      this.cacheKey,
      dataFetchService,
      cacheService,
    );
  }

  getAll(): Promise<Person[]> {
    return this.swapiService.getAll();
  }

  getPage(page: number): Promise<Person[]> {
    return this.swapiService.getPage(page);
  }

  findOne(id: number): Promise<Person> {
    return this.swapiService.findOne(id);
  }
}
