// src/graphql/models/species.model.ts

import { Optional } from '@nestjs/common';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Species {
  @Field(() => ID)
  url: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  classification: string;

  @Field({ nullable: true })
  designation: string;

  @Field({ nullable: true })
  average_height: string;

  @Field({ nullable: true })
  average_lifespan: string;

  @Field({ nullable: true })
  eye_colors: string;

  @Field({ nullable: true })
  hair_colors: string;

  @Field({ nullable: true })
  skin_colors: string;

  @Field({ nullable: true })
  language: string;

  @Field({ nullable: true })
  homeworld: string;

  @Field(() => [String],{ nullable: true })
  people: string[];

  @Field(() => [String],{ nullable: true })
  films: string[];

  @Field({ nullable: true })
  created: string;

  @Field({ nullable: true })
  edited: string;
}
