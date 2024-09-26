import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { TranslateModule } from "@ngx-translate/core";
import { StatusStrPipe } from "./pipes/statusStr.pipe";
import { BadgeStatusComponent } from './components/badge-status/badge-status.component';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
  declarations: [
    StatusStrPipe,
    BadgeStatusComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MdbCollapseModule,
    MdbDropdownModule,
    TranslateModule,
  ],
  exports: [
    StatusStrPipe,
    BadgeStatusComponent
  ]
})
export class SharedModule { }
