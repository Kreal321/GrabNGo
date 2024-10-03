import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { DataResponse } from "../models/dataResponse.model";
import { Observable } from "rxjs";
import { Plugin } from "../models/plugin.model";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private readonly hostUrl;

  constructor(
    private http: HttpClient,
  ) {
    this.hostUrl = environment.api;
  }

  getTrendingMovies(page: number): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.hostUrl + '/plugins/tmdb/trending/movies?page=' + page + '&language=' + localStorage.getItem('lang') || 'en-US');
  }
}
