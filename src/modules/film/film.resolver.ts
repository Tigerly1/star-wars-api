import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Film } from '../../graphql/models/film.model';
import { FilmService } from './film.service';
import { PaginationArgs } from '../../graphql/dto/pagination.args'; // Import PaginationArgs

@Resolver(() => Film)
export class FilmResolver {
  constructor(private filmService: FilmService) {}

  @Query(() => [Film], { 
    description: 'Retrieve a list of all films, with optional pagination.' 
  })
  async films(@Args() paginationArgs: PaginationArgs) {
    // Fix parameter type
    if (typeof paginationArgs.page === 'number') {
      return this.filmService.getPage(paginationArgs.page);
    } else {
      return this.filmService.getAll();
    }
  }

  @Query(() => Film, { description: 'Retrieve a single film by unique ID.' })
  async film(@Args('id', { type: () => Int }) id: number) {
    return this.filmService.findOne(id);
  }
}
