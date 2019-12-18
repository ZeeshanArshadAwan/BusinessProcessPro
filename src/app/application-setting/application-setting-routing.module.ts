import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from '../layout/main-layout/main-layout.component';
import { ApplicationSettingComponent } from './application-setting.component';


const routes: Routes = [
  {
    path: 'AppSet',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ApplicationSettingComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationSettingRoutingModule { }
