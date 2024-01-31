import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class WordCount {
  @Field()
    word: string

  @Field(() => Int)
    count: number
}
