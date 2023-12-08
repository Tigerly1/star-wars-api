import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Vehicle } from 'src/graphql/models/vehicle.model';

@Injectable()
export class VehicleService {
  async findAll(): Promise<Vehicle[]> {
    const response = await axios.get('https://swapi.dev/api/vehicles/');
    return response.data.results;
  }

  async findOne(id: number): Promise<Vehicle> {
    const response = await axios.get(`https://swapi.dev/api/vehicles/${id}/`);
    return response.data;
  }
}
