import { Query, Resolver } from '@nestjs/graphql'
import { FilmAnalysisService } from './film-analysis.service'

@Resolver()
export class FilmAnalysisResolver {
  constructor (private readonly filmAnalysisService: FilmAnalysisService) {}

  @Query(() => Array<[string, number]>, {
    description: 'Retrieve a list of all unique words in film openings, with their counts. Expect to be [[String, Int]]'
  })
  async uniqueWordsInFilmOpenings (): Promise<Array<[string, number]>> {
    const wordCounts = await this.filmAnalysisService.getUniqueWordsInOpenings()
    return Array.from(wordCounts.entries())
  }

  @Query(() => [String], { description: 'Retrieve a list of the most common character names in film openings.' })
  async mostCommonCharacterNamesInOpenings (): Promise<string[]> {
    return await this.filmAnalysisService.getMostCommonNamesInOpenings()
  }
}
