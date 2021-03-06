import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from '../layout/main-layout/main-layout.component';
import { ApplicationDetailReportComponent } from './application-detail-report.component';


const routes: Routes = [
  {
    path: 'ApplicationDetailReport',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ApplicationDetailReportComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationDetailReportRoutingModule { }
