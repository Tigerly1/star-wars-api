import { Injectable } from '@nestjs/common';
import { Vehicle } from '../../graphql/models/vehicle.model';
import { DataFetchService } from '../../common/services/data-fetch.service';
import { CacheService } from '../../common/services/cache.service';
import { GenericSwapiService, ISwapiService } from '../generic-swapi.service';

@Injectable()
export class VehicleService  {

  private readonly swapiService: ISwapiService<Vehicle>;

  protected baseUrl = 'https://swapi.dev/api/vehicles';
  protected cacheKey = 'vehicles';

  constructor(
    dataFetchService: DataFetchService,
    cacheService: CacheService,
  ) {
    this.swapiService = new GenericSwapiService<Vehicle>(
      this.baseUrl, 
      this.cacheKey, 
      dataFetchService, 
      cacheService
    );
  }

  getAll(): Promise<Vehicle[]> {
    return this.swapiService.getAll();
  }

  getPage(page: number): Promise<Vehicle[]> {
    return this.swapiService.getPage(page);
  }

  findOne(id: number): Promise<Vehicle> {
    return this.swapiService.findOne(id);
  }
}
