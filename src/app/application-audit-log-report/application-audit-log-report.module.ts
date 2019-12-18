import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationAuditLogReportRouteModule } from './application-audit-log-report-route.module';
import { ApplicationAuditLogReportComponent } from './application-audit-log-report.component';
import { MaterialModuleModule } from '../material-module/material-module.module';


@NgModule({
  declarations: [ApplicationAuditLogReportComponent],
  imports: [
    CommonModule,
    ApplicationAuditLogReportRouteModule,
    MaterialModuleModule
  ]
})
export class ApplicationAuditLogReportModule { }
