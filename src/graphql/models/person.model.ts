// src/graphql/models/Person.model.ts

import { Field, ObjectType, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Person {
  @Field(() => ID)
  url: string;

  @Field()
  name: string;

  @Field()
  birth_year: string;

  @Field()
  eye_color: string;

  @Field()
  gender: string;

  @Field()
  hair_color: string;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  mass: number;

  @Field()
  skin_color: string;

  @Field()
  homeworld: string;

  @Field(() => [String])
  films: string[];

  @Field(() => [String])
  species: string[];

  @Field(() => [String])
  starships: string[];

  @Field(() => [String])
  vehicles: string[];

  @Field()
  created: string;

  @Field()
  edited: string;
}
