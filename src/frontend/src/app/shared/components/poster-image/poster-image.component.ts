import { Component, Input, OnChanges } from '@angular/core';
import { TmdbMovie } from "../../../core/models/tmdbMovie.model";

@Component({
  selector: 'app-poster-image',
  templateUrl: './poster-image.component.html',
  styleUrls: ['./poster-image.component.css']
})
export class PosterImageComponent {
  @Input() media: TmdbMovie | undefined;
  constructor() { }
}
