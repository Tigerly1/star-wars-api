import { Resolver, Query } from '@nestjs/graphql';
import { Film } from './entities/film.entity';
import { FilmService } from './film.service';

@Resolver(() => Film)
export class FilmResolver {
  constructor(private filmService: FilmService) {}

  @Query(() => [Film])
  async films() {
    return this.filmService.findAll();
  }
}
