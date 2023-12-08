import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Person } from 'src/graphql/models/person.model';

@Injectable()
export class PeopleService {
  async findAll(): Promise<Person[]> {
    const response = await axios.get('https://swapi.dev/api/people/');
    return response.data.results;
  }

  async findOne(id: number): Promise<Person> {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    return response.data;
  }
}
