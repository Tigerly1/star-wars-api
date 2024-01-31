import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { FilmModule } from './modules/film/film.module'
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { SpeciesModule } from './modules/species/species.module'
import { StarShipModule } from './modules/starship/starship.module'
import { VehicleModule } from './modules/vehicle/vehicle.module'
import { PlanetModule } from './modules/planet/planet.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CachedItem } from './psql/entities/cachedItem'
import { CachedList } from './psql/entities/cachedList'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { FilmAnalysisModule } from './modules/film/film-analysis.module'
import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import { EnvironmentVariables } from './env-variables.validator'

@Module({
  imports: [
    ConfigModule.forRoot({
      // Load .env file based on the NODE_ENV, default to '.env'
      isGlobal: true, // Make ConfigModule global
      validate: (config: Record<string, unknown>) => {
        const validatedConfig = plainToClass(EnvironmentVariables, config, {
          enableImplicitConversion: true
        })
        const errors = validateSync(validatedConfig, {
          skipMissingProperties: false
        })

        if (errors.length > 0) {
          throw new Error(errors.toString())
        }
        return validatedConfig
      }
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'password'),
        database: configService.get<string>('DB_DATABASE', 'mydatabase'),
        entities: [CachedItem, CachedList],
        synchronize: configService.get<boolean>('TYPEORM_SYNC', false)
      })
    }),
    FilmModule,
    SpeciesModule,
    StarShipModule,
    VehicleModule,
    PlanetModule,
    FilmAnalysisModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true
    })
  ]
})
export class AppModule {}
