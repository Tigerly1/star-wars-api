import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Person } from 'src/graphql/models/person.model';
import { PeopleService } from './people.service';
import { PaginationArgs } from 'src/graphql/dto/pagination.args';

@Resolver(() => Person)
export class PeopleResolver {
  constructor(private peopleService: PeopleService) {}

  @Query(() => [Person])
  async people(@Args() paginationArgs: PaginationArgs) { // Fix parameter type
       
            return this.peopleService.getAll();
        
    }

  @Query(() => Person, { nullable: true })
  async person(@Args('id', { type: () => Int }) id: number) {
    return this.peopleService.findOne(id);
  }
}
