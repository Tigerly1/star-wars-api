// src/film/film.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Film } from '../../graphql/models/film.model';
import { DataFetchService } from '../../common/services/data-fetch.service';


@Injectable()
export class FilmService {
  constructor(private dataFetchService: DataFetchService) {}


  async getAll(): Promise<Film[]> {
    return this.dataFetchService.fetchAllData<Film>('https://swapi.dev/api/films');
  }

  async getPage(page: number): Promise<Film[]> {
    const response = await axios.get(`https://swapi.dev/api/films/?page=${page}`);
    return response.data.results;
  }

  async findOne(id: number): Promise<Film> {
    const response = await axios.get(`https://swapi.dev/api/films/${id}/`);
    return response.data;
  }
}
