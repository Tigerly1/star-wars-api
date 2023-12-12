import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { FilmAnalysisResolver } from './film-analysis.resolver';
import { PeopleModule } from '../people/people.module';
import { FilmModule } from './film.module';
import { FilmAnalysisService } from './film-analysis.service';

@Module({
  imports: [CommonModule, PeopleModule, FilmModule],
  providers: [FilmAnalysisResolver, FilmAnalysisService],
})
export class FilmAnalysisModule {}
