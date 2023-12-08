// src/graphql/models/films.model.ts

import { Field, ObjectType, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Film {
  @Field(() => ID)
  url: string;

  @Field(() => [String])
  characters: string[];

  @Field()
  created: string;

  @Field()
  director: string;

  @Field()
  edited: string;

  @Field(() => Int)
  episode_id: number;

  @Field()
  opening_crawl: string;

  @Field(() => [String])
  planets: string[];

  @Field()
  producer: string;

  @Field()
  release_date: string;

  @Field(() => [String])
  species: string[];

  @Field(() => [String])
  starships: string[];

  @Field(() => [String])
  vehicles: string[];

  @Field()
  title: string;
}
