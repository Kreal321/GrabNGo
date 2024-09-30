import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { DataResponse } from "../models/dataResponse.model";
import { Observable } from "rxjs";
import { Plugin } from "../models/plugin.model";

@Injectable({
  providedIn: 'root'
})
export class AlistService {

  private readonly hostUrl;

  constructor(
    private http: HttpClient,
  ) {
    this.hostUrl = environment.api;
  }

  offlineDownload(url: string, path: string): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.hostUrl + '/plugins/alist/offline-download', { urls: [url], delete_policy: 'delete_on_upload_succeed', path: path, tool: '115 Cloud' });
  }
}
