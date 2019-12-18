import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ApplicationPerServiceSourceComponent } from './application-per-service-source.component';



const routes: Routes = [
  {
    path: 'ApplicationPerServiceSource',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ApplicationPerServiceSourceComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationPerServiceSourceRouteModule { }
