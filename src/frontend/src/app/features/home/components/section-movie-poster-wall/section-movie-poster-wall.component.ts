import { Component } from '@angular/core';
import { TmdbService } from "../../../../core/services/tmdb.service";
import { TranslateService } from "@ngx-translate/core";
import { TmdbMovie } from "../../../../core/models/tmdbMovie.model";

@Component({
  selector: 'app-section-movie-poster-wall',
  templateUrl: './section-movie-poster-wall.component.html',
  styleUrls: ['./section-movie-poster-wall.component.css']
})
export class SectionMoviePosterWallComponent {

  trendingMovies: TmdbMovie[] = [];
  moviePage: number = 1;

  constructor(
    private tmdbService: TmdbService,
    private translate: TranslateService,
  ) {
    this.loadTrendingMovies();
  }

  private loadTrendingMovies() {
    this.tmdbService.getTrendingMovies(this.moviePage++).subscribe({
      next: (response) => {
        if (response.data) {
          this.trendingMovies.push(...response.data.results);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onComplete() {
    this.loadTrendingMovies();
  }
}
