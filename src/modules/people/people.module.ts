import { Module } from '@nestjs/common'
import { PeopleService } from './people.service'
import { PeopleResolver } from './people.resolver'
import { CommonModule } from '../../common/common.module'

@Module({
  imports: [CommonModule],
  providers: [PeopleService, PeopleResolver],
  exports: [PeopleService]
})
export class PeopleModule {}
