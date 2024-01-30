// src/graphql/models/Person.model.ts

import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType()
export class Person {
  @Field(() => ID)
    url: string

  @Field({ nullable: true })
    name: string

  @Field({ nullable: true })
    birth_year: string

  @Field({ nullable: true })
    eye_color: string

  @Field({ nullable: true })
    gender: string

  @Field({ nullable: true })
    hair_color: string

  @Field({ nullable: true })
    height: string

  @Field({ nullable: true })
    mass: string

  @Field({ nullable: true })
    skin_color: string

  @Field({ nullable: true })
    homeworld: string

  @Field(() => [String], { nullable: true })
    films: string[]

  @Field(() => [String], { nullable: true })
    species: string[]

  @Field(() => [String], { nullable: true })
    starships: string[]

  @Field(() => [String], { nullable: true })
    vehicles: string[]

  @Field({ nullable: true })
    created: string

  @Field({ nullable: true })
    edited: string
}
