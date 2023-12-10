import { Module } from '@nestjs/common';
import { DataFetchService } from './services/data-fetch.service';

@Module({
  providers: [DataFetchService],
  exports: [DataFetchService],
})
export class CommonModule {}