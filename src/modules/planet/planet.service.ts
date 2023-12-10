// Path: src/modules/planet/planet.service.ts

import { Injectable } from '@nestjs/common';
import { DataFetchService } from '../../common/services/data-fetch.service';
import { Planet } from '../../graphql/models/planet.model';
import axios from 'axios';

@Injectable()
export class PlanetService {
  constructor(private dataFetchService: DataFetchService) {}

  async getAll(): Promise<Planet[]> {
    return this.dataFetchService.fetchAllData<Planet>('https://swapi.dev/api/planets');
  }

  async getPage(page: number): Promise<Planet[]> {
    const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
    return response.data.results;
  }

  async findOne(id: number): Promise<Planet> {
    const response = await axios.get(`https://swapi.dev/api/planets/${id}/`);
    return response.data;
  }
}