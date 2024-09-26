import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "./components/nav/nav.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TranslateModule } from "@ngx-translate/core";
import { MdbDropdownModule } from "mdb-angular-ui-kit/dropdown";
import { MdbCollapseModule } from "mdb-angular-ui-kit/collapse";
import { RouterLink, RouterLinkActive } from "@angular/router";



@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MdbDropdownModule,
    MdbCollapseModule,
    RouterLink,
    RouterLinkActive
  ],
  exports: [
    NavComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
