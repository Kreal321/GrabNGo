import { Component, Input } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { SettingsService } from "../../../../core/services/settings.service";
import { Plugin } from "../../../../core/models/plugin.model";
import { Status } from "../../../../core/enums/status.enum";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { DataResponse } from "../../../../core/models/dataResponse.model";
import { MdbNotificationService } from "mdb-angular-ui-kit/notification";
import { AlertComponent } from "../../../../shared/components/alert/alert.component";

@Component({
  selector: 'app-modal-prowlarr-settings',
  templateUrl: './modal-prowlarr-settings.component.html',
  styleUrls: ['./modal-prowlarr-settings.component.css']
})
export class ModalProwlarrSettingsComponent {

  prowlarr: Plugin = {} as Plugin;

  constructor(
    public modalRef: MdbModalRef<ModalProwlarrSettingsComponent>,
    private translate: TranslateService,
    private settingsService: SettingsService,
    private notificationService: MdbNotificationService
  ) {

  }

  triggerPlugin(action: string) {
    this.settingsService.triggerPluginAction('Prowlarr', action).subscribe({
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
    if (!this.prowlarr.url) {
      this.notificationService.open(AlertComponent, {
        stacking: true,
        data: {
          text: 'URL is required',
          color: 'danger'
        }
      });
      return;
    }
    if (!this.prowlarr.token) {
      this.notificationService.open(AlertComponent, {
        stacking: true,
        data: {
          text: 'Token is required',
          color: 'danger'
        }
      });
      return;
    }
    this.settingsService.updatePluginSettings('Prowlarr', this.prowlarr).subscribe({
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
