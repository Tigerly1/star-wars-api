// src/graphql/models/starships.model.ts

import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class StarShip {
  @Field(() => ID)
  url: string;

  @Field()
  name: string;

  @Field()
  model: string;

  @Field()
  starship_class: string;

  @Field()
  manufacturer: string;

  @Field()
  cost_in_credits: string;

  @Field()
  length: string;

  @Field()
  crew: string;

  @Field()
  passengers: string;

  @Field()
  max_atmosphering_speed: string;

  @Field()
  hyperdrive_rating: string;

  @Field()
  MGLT: string;

  @Field()
  cargo_capacity: string;

  @Field()
  consumables: string;

  @Field(() => [String])
  films: string[];

  @Field(() => [String])
  pilots: string[];

  @Field()
  created: string;

  @Field()
  edited: string;
}
