import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Person } from '../../graphql/models/person.model';
import { PeopleService } from './people.service';
import { PaginationArgs } from '../../graphql/dto/pagination.args';

@Resolver(() => Person)
export class PeopleResolver {
  constructor(private peopleService: PeopleService) {}

  @Query(() => [Person], { description: 'Retrieve a list of all people, with optional pagination.' })
  async people(@Args() paginationArgs: PaginationArgs) { // Fix parameter type
       
            return this.peopleService.getAll();
        
    }

  @Query(() => Person, { description: 'Retrieve a single person by unique ID.' })
  async person(@Args('id', { type: () => Int }) id: number) {
    return this.peopleService.findOne(id);
  }
}
