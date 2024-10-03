import { Component } from '@angular/core';
import { Plugin } from "../../../../core/models/plugin.model";
import { Status } from "../../../../core/enums/status.enum";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { TranslateService } from "@ngx-translate/core";
import { SettingsService } from "../../../../core/services/settings.service";
import { MdbNotificationService } from "mdb-angular-ui-kit/notification";
import { DataResponse } from "../../../../core/models/dataResponse.model";
import { AlertComponent } from "../../../../shared/components/alert/alert.component";

@Component({
  selector: 'app-modal-tmdb-settings',
  templateUrl: './modal-tmdb-settings.component.html',
  styleUrls: ['./modal-tmdb-settings.component.css']
})
export class ModalTmdbSettingsComponent {
  tmdb: Plugin = {} as Plugin;

  constructor(
    public modalRef: MdbModalRef<ModalTmdbSettingsComponent>,
    private translate: TranslateService,
    private settingsService: SettingsService,
    private notificationService: MdbNotificationService
  ) {

  }

  triggerPlugin(action: string) {
    this.settingsService.triggerPluginAction('TMDB', action).subscribe({
      next: (response: DataResponse) => {
        this.notificationService.open(AlertComponent, {
          autohide: true,
          stacking: true,
          data: {
            text: response.message,
            color: 'success'
          }
        });
        this.modalRef.close('updated');
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
    });
  }

  updateSettings(): void {
    if (!this.tmdb.token) {
      this.notificationService.open(AlertComponent, {
        stacking: true,
        data: {
          text: 'Token is required',
          color: 'danger'
        }
      });
      return;
    }
    this.settingsService.updatePluginSettings('TMDB', this.tmdb).subscribe({
      next: (response: DataResponse) => {
        this.notificationService.open(AlertComponent, {
          autohide: true,
          stacking: true,
          data: {
            text: response.message,
            color: 'success'
          }
        });
        this.modalRef.close('updated');
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
    });
  }

  protected readonly Status = Status;
}
