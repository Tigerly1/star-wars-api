import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DataFetchService } from 'src/common/services/data-fetch.service';
import { Person } from 'src/graphql/models/person.model';

@Injectable()
export class PeopleService {
  constructor(private dataFetchService: DataFetchService) {}

  async getAll(): Promise<Person[]> {
    return this.dataFetchService.fetchAllData<Person>('https://swapi.dev/api/people');
  }

  async findOne(id: number): Promise<Person> {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    return response.data;
  }
}
