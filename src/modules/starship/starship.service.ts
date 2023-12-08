import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { StarShip } from 'src/graphql/models/starship.model';

@Injectable()
export class StarShipService {
  async findAll(): Promise<StarShip[]> {
    const response = await axios.get('https://swapi.dev/api/starships/');
    return response.data.results;
  }

  async findOne(id: number): Promise<StarShip> {
    const response = await axios.get(`https://swapi.dev/api/starships/${id}/`);
    return response.data;
  }
}
