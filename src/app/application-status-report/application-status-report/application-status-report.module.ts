import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationStatusReportComponent } from '../application-status-report.component';
import { ApplicationStatusReportRoutingModule } from '../application-status-report-routing/application-status-report-routing.module';
import { MaterialModuleModule } from 'src/app/material-module/material-module.module';



@NgModule({
  declarations: [ApplicationStatusReportComponent],
  imports: [
    CommonModule,
    ApplicationStatusReportRoutingModule,
    MaterialModuleModule
  ]
})
export class ApplicationStatusReportModule { }
