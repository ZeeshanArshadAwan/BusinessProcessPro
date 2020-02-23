import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { PaymentServiceReportComponent } from '../payment-service-report.component';



const routes: Routes = [
  {
    path: 'Reports',
    component: MainLayoutComponent,
    children: [
      { path: '', component: PaymentServiceReportComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentServiceRoutingModule { }
