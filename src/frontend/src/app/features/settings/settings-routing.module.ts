import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageSettingsComponent } from "./pages/page-settings/page-settings.component";

const routes: Routes = [
  { path: 'settings', component: PageSettingsComponent },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
