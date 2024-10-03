import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { TranslateModule } from "@ngx-translate/core";
import { StatusStrPipe } from "./pipes/statusStr.pipe";
import { BadgeStatusComponent } from './components/badge-status/badge-status.component';
import { AlertComponent } from './components/alert/alert.component';
import { FileSizePipe } from "./pipes/fileSize.pipe";
import { PosterImageComponent } from './components/poster-image/poster-image.component';



@NgModule({
  declarations: [
    StatusStrPipe,
    FileSizePipe,
    BadgeStatusComponent,
    AlertComponent,
    PosterImageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MdbCollapseModule,
    MdbDropdownModule,
    TranslateModule,
    NgOptimizedImage,
  ],
  exports: [
    StatusStrPipe,
    FileSizePipe,
    BadgeStatusComponent,
    PosterImageComponent
  ]
})
export class SharedModule { }
