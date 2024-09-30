import { Component } from '@angular/core';
import { ProwlarrService } from "../../../../core/services/prowlarr.service";
import { TranslateService } from "@ngx-translate/core";
import { MdbNotificationService } from "mdb-angular-ui-kit/notification";
import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { DataResponse } from "../../../../core/models/dataResponse.model";
import { ProwlarrSearchResult } from "../../../../core/models/prowlarrSearchResult.model";
import { AlistService } from "../../../../core/services/alist.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent {
  query: string = '';
  headers: string[] = ['Title', 'Age', 'Size', 'Indexer', 'Action'];
  data: ProwlarrSearchResult[] = [];
  showSearchResult: boolean = false;
  loading: boolean = false;

  constructor(
    private prowlarrService: ProwlarrService,
    private alistService: AlistService,
    private translate: TranslateService,
    private notificationService: MdbNotificationService
  ) { }

  search() {
    if (this.query.length < 3) {
      this.notificationService.open(AlertComponent, {
        autohide: true,
        stacking: true,
        data: {
          text: "Search content must be at least 3 characters",
          color: 'warning'
        }
      });
      return;
    }
    this.data = [];
    this.showSearchResult = true;
    this.loading = true;
    this.prowlarrService.getSearchResult(this.query).subscribe({
      next: (response: DataResponse) => {
        if (response.success) {
          this.data = response.data as ProwlarrSearchResult[];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  offline_download(url: string) {
    let path = localStorage.getItem('offline_download_path');
    if (path == null) {
      this.notificationService.open(AlertComponent, {
        autohide: true,
        stacking: true,
        data: {
          text: "File path is not set",
          color: 'alert'
        }
      });
      return;
    }
    this.alistService.offlineDownload(url, path).subscribe({
      next: (response: DataResponse) => {
        if (response.success) {
          this.notificationService.open(AlertComponent, {
            autohide: true,
            stacking: true,
            data: {
              text: "Offline download added",
              color: 'success'
            }
          });
          return;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.open(AlertComponent, {
          autohide: false,
          stacking: true,
          data: {
            text: error.error.message,
            color: 'danger'
          }
        });
        return;
      }
    });
  }
}
