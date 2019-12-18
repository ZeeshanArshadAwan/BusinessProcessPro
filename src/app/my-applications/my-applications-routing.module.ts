import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { MyApplicationsComponent } from './my-applications.component';

const routes: Routes = [
  {
    path: 'MyApplications',
    component: MainLayoutComponent,
    children: [
      { path: '', component: MyApplicationsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyApplicationsRoutingModule { }
