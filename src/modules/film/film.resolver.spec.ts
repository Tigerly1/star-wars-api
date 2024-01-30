import { Test, type TestingModule } from '@nestjs/testing'
import { FilmResolver } from './film.resolver'
import { FilmService } from './film.service'
import { Film } from '../../graphql/models/film.model'
import { PaginationArgs } from '../../graphql/dto/pagination.args'

// Mock implementation for FilmService
const mockFilmService = {
  getPage: jest.fn(),
  getAll: jest.fn(),
  findOne: jest.fn()
}

describe('FilmResolver', () => {
  let resolver: FilmResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmResolver,
        { provide: FilmService, useValue: mockFilmService }
      ]
    }).compile()

    resolver = module.get<FilmResolver>(FilmResolver)
  })

  it('should return a paginated list of films', async () => {
    const paginationArgs = new PaginationArgs()
    paginationArgs.page = 1
    const mockFilms: Film[] = [new Film(), new Film()] // Mocked array of films

    mockFilmService.getPage.mockResolvedValue(mockFilms)
    expect(await resolver.films(paginationArgs)).toBe(mockFilms)
    expect(mockFilmService.getPage).toHaveBeenCalledWith(1)
  })

  it('should return all films if no page number is provided', async () => {
    const mockFilms: Film[] = [new Film(), new Film()] // Mocked array of films

    mockFilmService.getAll.mockResolvedValue(mockFilms)
    expect(await resolver.films(new PaginationArgs())).toBe(mockFilms)
    expect(mockFilmService.getAll).toHaveBeenCalled()
  })

  it('should return a single film for a given ID', async () => {
    const filmId = 1
    const mockFilm = new Film() // Mocked film object

    mockFilmService.findOne.mockResolvedValue(mockFilm)
    expect(await resolver.film(filmId)).toBe(mockFilm)
    expect(mockFilmService.findOne).toHaveBeenCalledWith(filmId)
  })
})
