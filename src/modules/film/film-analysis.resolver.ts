import { Query, Resolver } from '@nestjs/graphql'
import { FilmAnalysisService } from './film-analysis.service'
import { WordCount } from '../../graphql/models/filmAnalysis.model'

@Resolver()
export class FilmAnalysisResolver {
  constructor (private readonly filmAnalysisService: FilmAnalysisService) {}

  @Query(() => [WordCount], {
    description: 'Retrieve a list of all unique words in film openings, with their counts.'
  })
  async uniqueWordsInFilmOpenings (): Promise<WordCount[]> {
    const wordCounts = await this.filmAnalysisService.getUniqueWordsInOpenings()
    return Array.from(wordCounts.entries()).map(([word, count]) => ({ word, count }))
  }

  @Query(() => [String], { description: 'Retrieve a list of the most common character names in film openings.' })
  async mostCommonCharacterNamesInOpenings (): Promise<string[]> {
    return await this.filmAnalysisService.getMostCommonNamesInOpenings()
  }
}
