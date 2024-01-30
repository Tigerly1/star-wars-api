import { Module } from '@nestjs/common'
import { FilmService } from './film.service'
import { FilmResolver } from './film.resolver'
import { CommonModule } from '../../common/common.module'

@Module({
  imports: [CommonModule],
  providers: [FilmService, FilmResolver],
  exports: [FilmService]
})
export class FilmModule {}
