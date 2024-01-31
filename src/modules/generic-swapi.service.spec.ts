import { Test, type TestingModule } from '@nestjs/testing'
import { GenericSwapiService } from './generic-swapi.service'
import { CacheService } from '../common/services/cache.service'
import { DataFetchService } from '../common/services/data-fetch.service'

jest.mock('axios')

describe('GenericSwapiService', () => {
  let service: GenericSwapiService<any>
  let cacheService: CacheService<any>
  let dataFetchService: DataFetchService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenericSwapiService,
        {
          provide: 'BASE_URL_TOKEN',
          useValue: 'http://example.com'
        },
        {
          provide: 'CACHE_KEY_TOKEN',
          useValue: 'testCacheKey'
        },
        {
          provide: CacheService,
          useValue: {
            getCachedList: jest.fn().mockImplementation(async () => []),
            saveCachedList: jest.fn().mockImplementation(async () => {}),
            getCachedItem: jest.fn().mockImplementation(async () => null),
            saveCachedItem: jest.fn().mockImplementation(async () => {}),
            saveIndividualItems: jest.fn().mockImplementation(async () => {})
          }
        },
        {
          provide: DataFetchService,
          useValue: {
            fetchAllData: jest.fn().mockImplementation(async () => [])
          }
        }
      ]
    }).compile()

    service = module.get<GenericSwapiService<any>>(GenericSwapiService)
    cacheService = module.get<CacheService<any>>(CacheService)
    dataFetchService = module.get<DataFetchService>(DataFetchService)
  })

  it('should return all items from cache', async () => {
    const mockItems = [{ id: 1 }, { id: 2 }]
    jest.spyOn(cacheService, 'getCachedList').mockResolvedValue(mockItems)

    const items = await service.getAll()
    expect(items).toEqual(mockItems)
    expect(cacheService.getCachedList.bind(cacheService)).toHaveBeenCalledWith('testCacheKey')
    expect(dataFetchService.fetchAllData.bind(dataFetchService)).not.toHaveBeenCalled()
  })

  it('should fetch all items when not in cache', async () => {
    jest.spyOn(cacheService, 'getCachedList').mockResolvedValue(null)
    const mockItems = [{ id: 3 }, { id: 4 }]
    jest.spyOn(dataFetchService, 'fetchAllData').mockResolvedValue(mockItems)

    const items = await service.getAll()
    expect(items).toEqual(mockItems)
    expect(dataFetchService.fetchAllData.bind(dataFetchService)).toHaveBeenCalledWith(
      'http://example.com'
    )
  })
})
