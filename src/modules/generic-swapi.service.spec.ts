import { Test, type TestingModule } from '@nestjs/testing'
import { GenericSwapiService } from './generic-swapi.service'
import { CacheService } from '../common/services/cache.service'
import { DataFetchService } from '../common/services/data-fetch.service'

jest.mock('axios')

describe('GenericSwapiService', () => {
  let service: GenericSwapiService<any>
  let cacheService: CacheService
  let dataFetchService: DataFetchService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenericSwapiService,
        {
          provide: 'BASE_URL_TOKEN', // This must match the token in your service
          useValue: 'http://example.com' // The value you want to inject
        },
        {
          provide: 'CACHE_KEY_TOKEN', // This must match the token in your service
          useValue: 'testCacheKey' // The value you want to inject
        },
        {
          provide: CacheService,
          useValue: {
            getCachedList: jest.fn(),
            saveCachedList: jest.fn(),
            getCachedItem: jest.fn(),
            saveCachedItem: jest.fn(),
            saveIndividualItems: jest.fn()
          }
        },
        {
          provide: DataFetchService,
          useValue: {
            fetchAllData: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<GenericSwapiService<any>>(GenericSwapiService)
    cacheService = module.get<CacheService>(CacheService)
    dataFetchService = module.get<DataFetchService>(DataFetchService)
  })

  it('should return all items from cache', async () => {
    const mockItems = [{ id: 1 }, { id: 2 }]
    jest.spyOn(cacheService, 'getCachedList').mockResolvedValue(mockItems)

    const items = await service.getAll()
    expect(items).toEqual(mockItems)
    expect(cacheService.getCachedList).toHaveBeenCalledWith('testCacheKey')
    expect(dataFetchService.fetchAllData).not.toHaveBeenCalled()
  })

  it('should fetch all items when not in cache', async () => {
    jest.spyOn(cacheService, 'getCachedList').mockResolvedValue(null)
    const mockItems = [{ id: 3 }, { id: 4 }]
    jest.spyOn(dataFetchService, 'fetchAllData').mockResolvedValue(mockItems)

    const items = await service.getAll()
    expect(items).toEqual(mockItems)
    expect(dataFetchService.fetchAllData).toHaveBeenCalledWith(
      'http://example.com'
    )
  })
})
