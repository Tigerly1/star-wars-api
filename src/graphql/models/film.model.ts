// src/graphql/models/films.model.ts

import { Field, ObjectType, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Planet {
  @Field(() => ID)
  url: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  rotation_period: string;

  @Field({ nullable: true })
  orbital_period: string;

  @Field({ nullable: true })
  diameter: string;

  @Field({ nullable: true })
  climate: string;

  @Field({ nullable: true })
  gravity: string;

  @Field({ nullable: true })
  terrain: string;

  @Field({ nullable: true })
  surface_water: string;

  @Field({ nullable: true })
  population: string;

  @Field(() => [String], { nullable: true })
  residents: string[];

  @Field(() => [String], { nullable: true })
  films: string[];

  @Field({ nullable: true })
  created: string;

  @Field({ nullable: true })
  edited: string;
}