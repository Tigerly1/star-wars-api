// src/graphql/models/vehicles.model.ts

import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  url: string;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  model: string;

  @Field({nullable: true})
  vehicle_class: string;

  @Field({nullable: true})
  manufacturer: string;

  @Field({nullable: true})
  length: string;

  @Field({nullable: true})
  cost_in_credits: string;

  @Field({nullable: true})
  crew: string;

  @Field({nullable: true})
  passengers: string;

  @Field({nullable: true})
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
