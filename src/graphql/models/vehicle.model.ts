// src/graphql/models/vehicles.model.ts

import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  url: string;

  @Field()
  name: string;

  @Field()
  model: string;

  @Field()
  vehicle_class: string;

  @Field()
  manufacturer: string;

  @Field()
  length: string;

  @Field()
  cost_in_credits: string;

  @Field()
  crew: string;

  @Field()
  passengers: string;

  @Field()
  max_atmosphering_speed: string;

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
