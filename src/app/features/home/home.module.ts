import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { HomeRoutingModule } from "./home-routing.module";



@NgModule({
  declarations: [
    PageHomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
