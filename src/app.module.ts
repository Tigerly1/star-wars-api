import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FilmModule } from './modules/film/film.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PeopleModule } from './modules/people/people.module';
import { SpeciesModule } from './modules/species/species.module';
import { StarShipModule } from './modules/starship/starship.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { PlanetModule } from './modules/planet/planet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CachedItem } from './psqlCache/cachedItem';
import { CachedList } from './psqlCache/cachedList';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // specify the DB type
      host: process.env.DB_HOST || 'localhost', // Database host
      port: parseInt(process.env.DB_PORT, 10) || 5432, // Database port
      username: process.env.DB_USERNAME || 'postgres', // Database username
      password: process.env.DB_PASSWORD || 'password', // Database password
      database: process.env.DB_DATABASE || 'mydatabase', // Database name
      entities: [CachedItem, CachedList],
      synchronize: (process.env.TYPEORM_SYNC)==="true" || false, // Should be false in production
    }),
    FilmModule,
    PeopleModule,
    SpeciesModule,
    StarShipModule,
    VehicleModule,
    PlanetModule,
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
