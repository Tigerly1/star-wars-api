import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CachedItem } from '../../psql/entities/cachedItem'
import { CachedList } from '../../psql/entities/cachedList'
import { IsNull, Repository } from 'typeorm'

@Injectable()
export class CacheService {
  constructor (
    @InjectRepository(CachedItem)
    private readonly cachedItemRepository: Repository<CachedItem>,
    @InjectRepository(CachedList)
    private readonly cachedListRepository: Repository<CachedList>
  ) {}

  async getCachedItem (resourceType: string, resourceId: string): Promise<any> {
    const cachedItem = await this.cachedItemRepository.findOne({
      where: { resourceType, resourceId }
    })
    if ((cachedItem != null) && !this.isCacheExpired(cachedItem.createdAt)) {
      return cachedItem.data
    }
    return null
  }

  async saveCachedItem (resourceType: string, resourceId: string, data: any): Promise<void> {
    let cachedItem = await this.cachedItemRepository.findOne({
      where: { resourceType, resourceId }
    })

    if (cachedItem != null) {
      // Update existing record
      cachedItem.data = data
      cachedItem.createdAt = new Date()
    } else {
      // Create a new record
      cachedItem = this.cachedItemRepository.create({
        resourceType,
        resourceId,
        data,
        createdAt: new Date()
      })
    }

    await this.cachedItemRepository.save(cachedItem)
  }

  async getCachedList (resourceType: string, page?: number): Promise<any> {
    const queryCondition = page !== undefined && page !== null
      ? { resourceType, page }
      : { resourceType, page: IsNull() } // page: IsNull() means page is null in the database
    const cachedList = await this.cachedListRepository.findOne({
      where: queryCondition
    })
    if ((cachedList != null) && !this.isCacheExpired(cachedList.createdAt)) {
      return cachedList.data
    }
    return null
  }

  async saveCachedList (resourceType: string, data: any[], page?: number): Promise<void> {
    const queryCondition = page !== undefined && page !== null
      ? { resourceType, page }
      : { resourceType, page: IsNull() } // page: IsNull() means page is null in the database
    let cachedList = await this.cachedListRepository.findOne({
      where: queryCondition
    })
    if (cachedList != null) {
      // Update existing record
      cachedList.data = data
      cachedList.createdAt = new Date()
    } else {
      // Create new record
      cachedList = this.cachedListRepository.create({
        resourceType,
        data,
        page,
        createdAt: new Date()
      })
    }

    await this.cachedListRepository.save(cachedList)
  }

  async saveIndividualItems (resourceType: string, items: any[]): Promise<void> {
    for (const item of items) {
      const url = new URL(item.url as string)
      await this.saveCachedItem(resourceType, this.extractIdFromUrl(url), item)
    }
  }

  private isCacheExpired (createdAt: Date): boolean {
    const expirationPeriod = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    return (new Date().getTime() - createdAt.getTime()) > expirationPeriod
  }

  // Getting id from url in list
  private extractIdFromUrl (url: URL): string {
    const urlParts = url.toString().split('/').filter(Boolean)
    return urlParts[urlParts.length - 1]
  }
}
