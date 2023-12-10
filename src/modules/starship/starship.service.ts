import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DataFetchService } from 'src/common/services/data-fetch.service';
import { StarShip } from 'src/graphql/models/starship.model';

@Injectable()
export class StarShipService {
  constructor(private dataFetchService: DataFetchService) {}


  async getAll(): Promise<StarShip[]> {
    return this.dataFetchService.fetchAllData<StarShip>('https://swapi.dev/api/starships');
  }

  async getPage(page: number): Promise<StarShip[]> {
    const response = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
    return response.data.results;
  }

  async findOne(id: number): Promise<StarShip> {
    const response = await axios.get(`https://swapi.dev/api/starships/${id}/`);
    return response.data;
  }
}
