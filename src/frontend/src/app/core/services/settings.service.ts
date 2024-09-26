import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { DataResponse } from "../models/dataResponse.model";
import { Observable } from "rxjs";
import { Plugin } from "../models/plugin.model";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly hostUrl;

  constructor(
    private http: HttpClient,
  ) {
    this.hostUrl = environment.api;
  }

  getPluginsSettings(): Observable<DataResponse>  {
    return this.http.get<DataResponse>(this.hostUrl + '/settings/plugins');
  }

  getPluginSettings(name: string): Observable<DataResponse>  {
    return this.http.get<DataResponse>(this.hostUrl + '/settings/plugins/' + name);
  }

  updatePluginSettings(name: string, settings: Plugin): Observable<DataResponse>  {
    return this.http.put<DataResponse>(this.hostUrl + '/settings/plugins/' + name, settings);
  }

  triggerPluginAction(name: string, action: string): Observable<DataResponse>  {
    return this.http.patch<DataResponse>(this.hostUrl + '/settings/plugins/' + name + '/' + action, {});
  }
}
