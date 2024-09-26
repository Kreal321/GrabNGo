import { Component } from '@angular/core';
import { MdbNotificationRef } from "mdb-angular-ui-kit/notification";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  text: string = '';
  color: string = 'primary';

  constructor(
    public notificationRef: MdbNotificationRef<AlertComponent>
  ) {
  }
}
