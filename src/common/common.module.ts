import { Module } from '@nestjs/common'
import { DataFetchService } from './services/data-fetch.service'
import { CacheService } from './services/cache.service'
import { CachedItem } from '../psql/entities/cachedItem'
import { CachedList } from '../psql/entities/cachedList'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([CachedItem, CachedList])],
  providers: [DataFetchService, CacheService],
  exports: [DataFetchService, CacheService]
})
export class CommonModule {}
