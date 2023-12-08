import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Species } from 'src/graphql/models/species.model';

@Injectable()
export class SpeciesService {
  async findAll(): Promise<Species[]> {
    const response = await axios.get('https://swapi.dev/api/species/');
    return response.data.results;
  }

  async findOne(id: number): Promise<Species> {
    const response = await axios.get(`https://swapi.dev/api/species/${id}/`);
    return response.data;
  }
}
