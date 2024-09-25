import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSettingsComponent } from './pages/page-settings/page-settings.component';
import { SettingsRoutingModule } from "./settings-routing.module";



@NgModule({
  declarations: [
    PageSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
