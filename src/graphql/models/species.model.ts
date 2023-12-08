// src/graphql/models/species.model.ts

import { Optional } from '@nestjs/common';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Species {
  @Field(() => ID)
  url: string;

  @Field()
  name: string;

  @Field()
  classification: string;

  @Field()
  designation: string;

  @Field()
  average_height: string;

  @Field()
  average_lifespan: string;

  @Field()
  eye_colors: string;

  @Field()
  hair_colors: string;

  @Field()
  skin_colors: string;

  @Field()
  language: string;

  @Field({ nullable: true })
  homeworld: string;

  @Field(() => [String])
  people: string[];

  @Field(() => [String])
  films: string[];

  @Field()
  created: string;

  @Field()
  edited: string;
}
