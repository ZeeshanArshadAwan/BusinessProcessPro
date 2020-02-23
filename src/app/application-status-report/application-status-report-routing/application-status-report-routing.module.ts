import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationStatusReportComponent } from '../application-status-report.component';



const routes: Routes = [
  {
    path: 'ApplicationStatusReport',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ApplicationStatusReportComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationStatusReportRoutingModule { }
