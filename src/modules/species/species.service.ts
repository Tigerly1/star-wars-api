import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Species } from 'src/graphql/models/species.model';
import { DataFetchService } from '../../common/services/data-fetch.service';

@Injectable()
export class SpeciesService {
  constructor(private dataFetchService: DataFetchService) {}

  async getAll(): Promise<Species[]> {
    return this.dataFetchService.fetchAllData<Species>('https://swapi.dev/api/species');
  }

  async getPage(page: number): Promise<Species[]> {
    const response = await axios.get(`https://swapi.dev/api/species/?page=${page}`);
    return response.data.results;
  }

  async findOne(id: number): Promise<Species> {
    const response = await axios.get(`https://swapi.dev/api/species/${id}/`);
    return response.data;
  }
}
