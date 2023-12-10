import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DataFetchService } from 'src/common/services/data-fetch.service';
import { Vehicle } from 'src/graphql/models/vehicle.model';

@Injectable()
export class VehicleService {
  constructor(private dataFetchService: DataFetchService) {}

  async getAll(): Promise<Vehicle[]> {
    return this.dataFetchService.fetchAllData<Vehicle>('https://swapi.dev/api/vehicles');

  }

  async getPage(page: number): Promise<Vehicle[]> {
    const response = await axios.get(`https://swapi.dev/api/vehicles/?page=${page}`);
    return response.data.results;
  }

  async findOne(id: number): Promise<Vehicle> {
    const response = await axios.get(`https://swapi.dev/api/vehicles/${id}/`);
    return response.data;
  }
}
