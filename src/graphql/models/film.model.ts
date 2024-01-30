// src/graphql/models/films.model.ts

import { Field, ObjectType, Int, ID } from '@nestjs/graphql'

@ObjectType()
export class Film {
  @Field(() => ID)
    url: string

  @Field(() => [String], { nullable: true })
    characters: string[]

  @Field({ nullable: true })
    created: string

  @Field({ nullable: true })
    director: string

  @Field({ nullable: true })
    edited: string

  @Field(() => Int, { nullable: true })
    episode_id: number

  @Field({ nullable: true })
    opening_crawl: string

  @Field(() => [String], { nullable: true })
    planets: string[]

  @Field({ nullable: true })
    producer: string

  @Field({ nullable: true })
    release_date: string

  @Field(() => [String], { nullable: true })
    species: string[]

  @Field(() => [String], { nullable: true })
    starships: string[]

  @Field(() => [String], { nullable: true })
    vehicles: string[]

  @Field({ nullable: true })
    title: string
}
