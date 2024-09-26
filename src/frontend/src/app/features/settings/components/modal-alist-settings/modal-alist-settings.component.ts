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
  selector: 'app-modal-alist-settings',
  templateUrl: './modal-alist-settings.component.html',
  styleUrls: ['./modal-alist-settings.component.css']
})
export class ModalAlistSettingsComponent {
  alist: Plugin = {} as Plugin;

  constructor(
    public modalRef: MdbModalRef<ModalAlistSettingsComponent>,
    private translate: TranslateService,
    private settingsService: SettingsService,
    private notificationService: MdbNotificationService
  ) {

  }

  triggerPlugin(action: string) {
    this.settingsService.triggerPluginAction('AList', action).subscribe({
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
    if (!this.alist.url) {
      this.notificationService.open(AlertComponent, {
        stacking: true,
        data: {
          text: 'URL is required',
          color: 'danger'
        }
      });
      return;
    }
    if (!this.alist.username) {
      this.notificationService.open(AlertComponent, {
        stacking: true,
        data: {
          text: 'Username is required',
          color: 'danger'
        }
      });
      return;
    }
    if (!this.alist.password) {
      this.notificationService.open(AlertComponent, {
        stacking: true,
        data: {
          text: 'Password is required',
          color: 'danger'
        }
      });
      return;
    }
    this.settingsService.updatePluginSettings('AList', this.alist).subscribe({
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
