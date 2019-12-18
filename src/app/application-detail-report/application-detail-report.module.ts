import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationDetailReportRoutingModule } from './application-detail-report-routing.module';
import { ApplicationDetailReportComponent } from './application-detail-report.component';
import { MaterialModuleModule } from '../material-module/material-module.module';

@NgModule({
  declarations: [ApplicationDetailReportComponent],
  imports: [
    CommonModule,
    ApplicationDetailReportRoutingModule,
    MaterialModuleModule
  ]
})
export class ApplicationDetailReportModule { }
