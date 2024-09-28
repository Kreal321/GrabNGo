import { Component } from '@angular/core';
import { ProwlarrService } from "../../../../core/services/prowlarr.service";
import { TranslateService } from "@ngx-translate/core";
import { SettingsService } from "../../../../core/services/settings.service";
import { MdbNotificationService } from "mdb-angular-ui-kit/notification";
import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { DataResponse } from "../../../../core/models/dataResponse.model";
import { ProwlarrSearchResult } from "../../../../core/models/prowlarrSearchResult.model";

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent {
  query: string = '';
  headers: string[] = ['Title', 'Age', 'Size', 'Indexer'];
  data: ProwlarrSearchResult[] = [];
  showSearchResult: boolean = false;
  loading: boolean = false;

  constructor(
    private prowlarrService: ProwlarrService,
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
}
