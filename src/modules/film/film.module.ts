import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmResolver } from './film.resolver';
import { CommonModule } from '../../common/common.module';
import { FilmAnalysisResolver } from './film-analysis.resolver';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [CommonModule],
  providers: [FilmService, FilmResolver],
  exports: [FilmService],
})
export class FilmModule {}
