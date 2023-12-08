import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FilmModule } from './modules/film/film.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PeopleModule } from './modules/people/people.module';
import { SpeciesModule } from './modules/species/species.module';
import { StarShipModule } from './modules/starship/starship.module';
import { VehicleModule } from './modules/vehicles/vehicle.module';

@Module({
  imports: [
    FilmModule,
    PeopleModule,
    SpeciesModule,
    StarShipModule,
    VehicleModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // other configurations...
    }),
    // other modules...
  ],
  // other configurations...
})
export class AppModule {}
