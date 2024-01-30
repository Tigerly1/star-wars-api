import { Module } from '@nestjs/common'
import { CommonModule } from '../../common/common.module'
import { PlanetService } from './planet.service'
import { PlanetResolver } from './planet.resolver'

@Module({
  imports: [CommonModule],
  providers: [PlanetService, PlanetResolver]
})
export class PlanetModule {}
