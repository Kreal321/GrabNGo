import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-card-offline-download',
  templateUrl: './card-offline-download.component.html',
  styleUrls: ['./card-offline-download.component.css']
})
export class CardOfflineDownloadComponent {

  path: string = '';

  constructor(
    private translate: TranslateService,
  ) {
    this.path = localStorage.getItem('offline_download_path') || '';
  }

  setPath() {
    localStorage.setItem('offline_download_path', this.path);
  }
}
