// src/film/film.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Film } from '../../graphql/models/film.model';

@Injectable()
export class FilmService {
  async findAll(): Promise<Film[]> {
    const response = await axios.get('https://swapi.dev/api/films/');
    return response.data.results;
  }

  async findOne(id: number): Promise<Film> {
    const response = await axios.get(`https://swapi.dev/api/films/${id}/`);
    return response.data;
  }
}
