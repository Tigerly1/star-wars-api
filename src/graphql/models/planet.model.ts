import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Planet {
  @Field(() => ID)
  url: string;

  @Field()
  name: string;

  @Field()
  diameter: string;

  @Field()
  rotation_period: string;

  @Field()
  orbital_period: string;

  @Field()
  gravity: string;

  @Field()
  population: string;

  @Field()
  climate: string;

  @Field()
  terrain: string;

  @Field()
  surface_water: string;

  @Field(() => [String])
  residents: string[];

  @Field(() => [String])
  films: string[];

  @Field()
  created: string;

  @Field()
  edited: string;
}
