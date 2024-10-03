import { Component, OnChanges } from '@angular/core';
import { Plugin } from "../../../../core/models/plugin.model";
import { Status } from "../../../../core/enums/status.enum";
import { SettingsService } from "../../../../core/services/settings.service";
import { TranslateService } from "@ngx-translate/core";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { ModalProwlarrSettingsComponent } from "../modal-prowlarr-settings/modal-prowlarr-settings.component";
import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { MdbNotificationRef, MdbNotificationService } from "mdb-angular-ui-kit/notification";
import { DataResponse } from "../../../../core/models/dataResponse.model";
import { ModalAlistSettingsComponent } from "../modal-alist-settings/modal-alist-settings.component";
import { ModalTmdbSettingsComponent } from "../modal-tmdb-settings/modal-tmdb-settings.component";

@Component({
  selector: 'app-card-plugin-settings',
  templateUrl: './card-plugin-settings.component.html',
  styleUrls: ['./card-plugin-settings.component.css']
})
export class CardPluginSettingsComponent implements OnChanges{

  plugins: Plugin[] = [];


  constructor(
    private translate: TranslateService,
    private settingsService: SettingsService,
    private modalService: MdbModalService,
    private notificationService: MdbNotificationService
  ) {
    this.loadPlugins();
  }


  ngOnChanges() {
    this.loadPlugins();
  }

  loadPlugins() {
    this.settingsService.getPluginsSettings().subscribe({
      next: (response: DataResponse) => {
        this.plugins = response.data;
        this.notificationService.open(AlertComponent, {
          autohide: true,
          stacking: true,
          data: {
            text: response.message,
            color: 'success'
          }
        });
      },
      error: (error) => {
        this.notificationService.open(AlertComponent, {
          stacking: true,
          data: {
            text: error.error.message,
            color: 'danger'
          }
        });
        console.error(error);
      }
    })
  }


  openPluginConfig(plugin: Plugin) {
    switch (plugin.name) {
      case 'Prowlarr':
        this.modalService.open(ModalProwlarrSettingsComponent, {
          modalClass: 'modal-dialog-centered',
          ignoreBackdropClick: true,
          data: {
            prowlarr: {...plugin}
          }
        }).onClose.subscribe((message: any) => {
          if (message === 'updated') {
            this.loadPlugins();
          }
        });
        break;
      case 'AList':
        this.modalService.open(ModalAlistSettingsComponent, {
          modalClass: 'modal-dialog-centered',
          ignoreBackdropClick: true,
          data: {
            alist: {...plugin}
          }
        }).onClose.subscribe((message: any) => {
          if (message === 'updated') {
            this.loadPlugins();
          }
        });
        break;
      case 'TMDB':
        plugin.url = "https://api.themoviedb.org/3";
        this.modalService.open(ModalTmdbSettingsComponent, {
          modalClass: 'modal-dialog-centered',
          ignoreBackdropClick: true,
          data: {
            tmdb: {...plugin}
          }
        }).onClose.subscribe((message: any) => {
          if (message === 'updated') {
            this.loadPlugins();
          }
        });
        break;
      default:
        break;
    }

  }

  protected readonly Status = Status;
}
