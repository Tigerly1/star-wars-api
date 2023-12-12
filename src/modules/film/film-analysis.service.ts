// src/film/film.service.ts

import { Injectable } from '@nestjs/common';
import { FilmService } from './film.service';
import { PeopleService } from '../people/people.service';


@Injectable()
export class FilmAnalysisService {

  constructor(
    private readonly filmService: FilmService,
    private readonly peopleService: PeopleService,
  ) { }

  async getUniqueWordsInOpenings(): Promise<Map<string, number>> {
    const films = await this.filmService.getAll(); // Method to fetch all films
    const wordCounts = new Map<string, number>();
  
    films.forEach(film => {
      const words = film.opening_crawl.split(/\s+/); // Split by whitespace
      words.forEach(word => {
        if (word) {
          const cleanWord = word.toLowerCase().replace(/[^\w\s]/gi, ''); // Clean up the word
          wordCounts.set(cleanWord, (wordCounts.get(cleanWord) || 0) + 1);
        }
      });
    });
  
    return wordCounts;
  }

  async getMostCommonNamesInOpenings(): Promise<string[]> {
    const films = await this.filmService.getAll();
    const people = await this.peopleService.getAll();
    const nameCounts = new Map<string, number>();

    films.forEach((film) => {
      people.forEach((person) => {
        const name = person.name.toLowerCase();
        const count = (
          film.opening_crawl
            .toLowerCase()
            .match(new RegExp(`\\b${name}\\b`, 'g')) || []
        ).length;
        if (count > 0) {
          nameCounts.set(name, (nameCounts.get(name) || 0) + count);
        }
      });
    });
    const maxCount = Math.max(...Array.from(nameCounts.values()));
    return Array.from(nameCounts.entries())
      .filter(([name, count]) => count === maxCount)
      .map(([name, count]) => name);
  }
}
