import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ApplicationPerTypeComponent } from './application-per-type.component';


const routes: Routes = [
  {
    path: 'ApplicationPerType',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ApplicationPerTypeComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationPerTypeRouteModule { }
