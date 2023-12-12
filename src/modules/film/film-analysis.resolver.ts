import { Int, Query, Resolver } from "@nestjs/graphql";
import { PeopleService } from "../people/people.service";
import { FilmService } from "./film.service";
import { Inject, forwardRef } from "@nestjs/common";
import { FilmAnalysisService } from "./film-analysis.service";

@Resolver()
export class FilmAnalysisResolver {
  
  constructor(private filmAnalysisService: FilmAnalysisService) {}

  @Query(() => [[String, Int]])
  async uniqueWordsInFilmOpenings() {
    const wordCounts = await this.filmAnalysisService.getUniqueWordsInOpenings();
    return Array.from(wordCounts.entries());
  }

  @Query(() => [String])
  async mostCommonCharacterNamesInOpenings() {
    return this.filmAnalysisService.getMostCommonNamesInOpenings();
  }
}
