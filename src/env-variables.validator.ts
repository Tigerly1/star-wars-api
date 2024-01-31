import { IsString, IsNumber } from 'class-validator'

export class EnvironmentVariables {
  @IsNumber()
    DB_PORT: number

  @IsString()
    DB_PASSWORD: string

  @IsString()
    DB_DATABASE: string

  @IsString()
    DB_USERNAME: string

  @IsString()
    TYPEORM_SYNC: string
}
