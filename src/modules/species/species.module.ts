import { Module } from '@nestjs/common'
import { SpeciesService } from './species.service'
import { SpeciesResolver } from './species.resolver'
import { CommonModule } from '../../common/common.module'

@Module({
  imports: [CommonModule],
  providers: [SpeciesService, SpeciesResolver]
})
export class SpeciesModule {}
