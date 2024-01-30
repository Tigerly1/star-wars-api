import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { Person } from '../../graphql/models/person.model'
import { PeopleService } from './people.service'
import { PaginationArgs } from '../../graphql/dto/pagination.args'

@Resolver(() => Person)
export class PeopleResolver {
  constructor (private readonly peopleService: PeopleService) {}

  @Query(() => [Person], { description: 'Retrieve a list of all people, with optional pagination.' })
  async people (@Args() paginationArgs: PaginationArgs): Promise<Person[]> { // Fix parameter type
    return await this.peopleService.getAll()
  }

  @Query(() => Person, { description: 'Retrieve a single person by unique ID.' })
  async person (@Args('id', { type: () => Int }) id: number): Promise<Person> {
    return await this.peopleService.findOne(id)
  }
}
