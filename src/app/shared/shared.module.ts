import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { TranslateModule } from "@ngx-translate/core";



@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MdbCollapseModule,
    MdbDropdownModule,
    TranslateModule,
  ],
  exports: [
    NavComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
