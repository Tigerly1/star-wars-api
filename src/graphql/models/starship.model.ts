// src/graphql/models/starships.model.ts

import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType()
export class StarShip {
  @Field(() => ID)
    url: string

  @Field({ nullable: true })
    name: string

  @Field({ nullable: true })
    model: string

  @Field({ nullable: true })
    starship_class: string

  @Field({ nullable: true })
    manufacturer: string

  @Field({ nullable: true })
    cost_in_credits: string

  @Field({ nullable: true })
    length: string

  @Field({ nullable: true })
    crew: string

  @Field({ nullable: true })
    passengers: string

  @Field({ nullable: true })
    max_atmosphering_speed: string

  @Field({ nullable: true })
    hyperdrive_rating: string

  @Field({ nullable: true })
    MGLT: string

  @Field({ nullable: true })
    cargo_capacity: string

  @Field({ nullable: true })
    consumables: string

  @Field(() => [String], { nullable: true })
    films: string[]

  @Field(() => [String], { nullable: true })
    pilots: string[]

  @Field({ nullable: true })
    created: string

  @Field({ nullable: true })
    edited: string
}
