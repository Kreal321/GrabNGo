import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSettingsComponent } from './pages/page-settings/page-settings.component';
import { SettingsRoutingModule } from "./settings-routing.module";
import { CardPluginSettingsComponent } from './components/card-plugin-settings/card-plugin-settings.component';
import { SharedModule } from "../../shared/shared.module";
import { ModalProwlarrSettingsComponent } from './components/modal-prowlarr-settings/modal-prowlarr-settings.component';
import { MdbModalModule } from "mdb-angular-ui-kit/modal";
import { MdbCheckboxModule } from "mdb-angular-ui-kit/checkbox";
import { MdbRippleModule } from "mdb-angular-ui-kit/ripple";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { MdbTooltipModule } from "mdb-angular-ui-kit/tooltip";
import { ModalAlistSettingsComponent } from './components/modal-alist-settings/modal-alist-settings.component';



@NgModule({
  declarations: [
    PageSettingsComponent,
    CardPluginSettingsComponent,
    ModalProwlarrSettingsComponent,
    ModalAlistSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    MdbModalModule,
    MdbCheckboxModule,
    MdbRippleModule,
    MdbFormsModule,
    ReactiveFormsModule,
    FormsModule,
    MdbTooltipModule
  ]
})
export class SettingsModule { }
