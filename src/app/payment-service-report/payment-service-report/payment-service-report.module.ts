import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentServiceReportComponent } from '../payment-service-report.component';
import { PaymentServiceRoutingModule } from '../payment-service-routing/payment-service-routing.module';
import { MaterialModuleModule } from 'src/app/material-module/material-module.module';



@NgModule({
  declarations: [PaymentServiceReportComponent],
  imports: [
    CommonModule,
    PaymentServiceRoutingModule,
    MaterialModuleModule
  ]
})
export class PaymentServiceReportModule { }
