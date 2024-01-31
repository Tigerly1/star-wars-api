import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CachedItem } from '../../psql/entities/cachedItem'
import { CachedList } from '../../psql/entities/cachedList'
import { IsNull, Repository } from 'typeorm'

function hasKey<T extends object, K extends PropertyKey> (obj: T, key: K): obj is T & Record<K, string> {
  return key in obj
}

@Injectable()
export class CacheService<T> {
  constructor (
    @InjectRepository(CachedItem)
    private readonly cachedItemRepository: Repository<CachedItem<T>>,
    @InjectRepository(CachedList)
    private readonly cachedListRepository: Repository<CachedList<T>>
  ) {}

  async getCachedItem (resourceType: string, resourceId: string): Promise<T | null> {
    const cachedItem = await this.cachedItemRepository.findOne({
      where: { resourceType, resourceId }
    })
    if ((cachedItem != null) && !this.isCacheExpired(cachedItem.createdAt)) {
      return cachedItem.data
    }
    return null
  }

  async saveCachedItem (resourceType: string, resourceId: string, data: T): Promise<void> {
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

  async getCachedList (resourceType: string, page?: number): Promise<T[] | null> {
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

  async saveCachedList (resourceType: string, data: T[], page?: number): Promise<void> {
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

  async saveIndividualItems (resourceType: string, items: T[]): Promise<void> {
    for (const item of items) {
      if (typeof item === 'object' && item !== null) {
        if (hasKey(item, 'url')) {
          const url = new URL(item.url)
          await this.saveCachedItem(resourceType, this.extractIdFromUrl(url), item)
        }
      }
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
