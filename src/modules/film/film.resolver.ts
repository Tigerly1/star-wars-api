import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Film } from '../../graphql/models/film.model';
import { FilmService } from './film.service';

@Resolver(() => Film)
export class FilmResolver {
  constructor(private filmService: FilmService) {}

  @Query(() => [Film])
  async films() {
    return this.filmService.findAll();
  }

  @Query(() => Film, { nullable: true })
  async film(@Args('id', { type: () => Int }) id: number) {
    return this.filmService.findOne(id);
  }
}
