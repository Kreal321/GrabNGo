import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Status } from "../../../core/enums/status.enum";

@Component({
  selector: 'app-badge-status',
  templateUrl: './badge-status.component.html',
  styleUrls: ['./badge-status.component.css']
})
export class BadgeStatusComponent implements OnChanges{
  @Input() status: Status | undefined;
  color: string = "primary";

  constructor() {
    this.colorChange();
  }

  ngOnChanges() {
    this.colorChange();
  }

  private colorChange(): void {
    switch (this.status) {
      case Status.RUNNING:
        this.color = 'success';
        break;
      case Status.ERROR:
        this.color = 'danger';
        break;
      case Status.STOPPED:
        this.color = 'secondary';
        break;
      case Status.DISABLED:
        this.color = 'secondary';
        break;
      case Status.VERIFYING:
        this.color = 'warning';
        break;
    }
  }
}
