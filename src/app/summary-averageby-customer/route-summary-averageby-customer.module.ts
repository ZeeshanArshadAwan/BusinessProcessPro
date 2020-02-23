import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { SummaryAveragebyCustomerComponent } from './summary-averageby-customer.component';



const routes: Routes = [
  {
    path: 'SummaryAveragebyCustomer',
    component: MainLayoutComponent,
    children: [
      { path: '', component: SummaryAveragebyCustomerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteSummaryAveragebyCustomerModule { }
