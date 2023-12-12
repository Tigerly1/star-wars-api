import { Module,forwardRef } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleResolver } from './people.resolver';
import { CommonModule } from '../../common/common.module';
import { FilmModule } from '../film/film.module';

@Module({
  imports: [CommonModule],
  providers: [PeopleService, PeopleResolver],
  exports: [PeopleService],
})
export class PeopleModule {}
