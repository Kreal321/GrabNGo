import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { HomeRoutingModule } from "./home-routing.module";
import { CardSearchComponent } from './components/card-search/card-search.component';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { FormsModule } from "@angular/forms";
import { MdbTableModule } from "mdb-angular-ui-kit/table";
import { SharedModule } from "../../shared/shared.module";
import { MdbTooltipModule } from "mdb-angular-ui-kit/tooltip";
import { CardOfflineDownloadComponent } from './components/card-offline-download/card-offline-download.component';
import { MdbSelectModule } from "mdb-angular-ui-kit/select";



@NgModule({
  declarations: [
    PageHomeComponent,
    CardSearchComponent,
    CardOfflineDownloadComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MdbFormsModule,
    FormsModule,
    MdbTableModule,
    SharedModule,
    MdbTooltipModule,
    MdbSelectModule
  ]
})
export class HomeModule { }
