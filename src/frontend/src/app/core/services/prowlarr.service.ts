import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { DataResponse } from "../models/dataResponse.model";
import { Observable } from "rxjs";
import { Plugin } from "../models/plugin.model";

@Injectable({
  providedIn: 'root'
})
export class ProwlarrService {

  private readonly hostUrl;

  constructor(
    private http: HttpClient,
  ) {
    this.hostUrl = environment.api;
  }

  getSearchResult(query: string, limit: number = 100, offset: number = 0): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.hostUrl + '/plugins/prowlarr/search?query=' + query + '&limit=' + limit + '&offset=' + offset);
  }
}
