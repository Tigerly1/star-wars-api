import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Person } from 'src/graphql/models/person.model';
import { PeopleService } from './people.service';

@Resolver(() => Person)
export class PeopleResolver {
  constructor(private peopleService: PeopleService) {}

  @Query(() => [Person])
  async people() {
    return this.peopleService.findAll();
  }

  @Query(() => Person, { nullable: true })
  async person(@Args('id', { type: () => Int }) id: number) {
    return this.peopleService.findOne(id);
  }
}
