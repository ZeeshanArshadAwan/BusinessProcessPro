import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ReviewApplicationsComponent } from './review-applications.component';



const routes: Routes = [
  {
    path: 'ReviewApplications',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ReviewApplicationsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewApplicationsRoutingModule { }
