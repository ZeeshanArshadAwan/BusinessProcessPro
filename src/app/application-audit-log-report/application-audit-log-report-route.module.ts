import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ApplicationAuditLogReportComponent } from '../application-audit-log-report/application-audit-log-report.component';



const routes: Routes = [
  {
    path: 'ApplicationAuditLog',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ApplicationAuditLogReportComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationAuditLogReportRouteModule { }
