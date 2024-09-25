import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from "./pages/page-home/page-home.component";


const routes: Routes = [
  { path: '', component: PageHomeComponent },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
