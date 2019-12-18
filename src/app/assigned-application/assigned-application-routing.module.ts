import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { AssignedApplicationComponent } from './assigned-application.component';


const routes: Routes = [
  {
    path: 'AssignedApplication',
    component: MainLayoutComponent,
    children: [
      { path: '', component: AssignedApplicationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignedApplicationRoutingModule { }
