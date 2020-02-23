import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { SummaryAveragebyCustomerComponent } from '../summary-averageby-customer/summary-averageby-customer.component';
import { SummaryAveragebyLocationAreaComponent } from './summary-averageby-location-area.component';



const routes: Routes = [
  {
    path: 'SummaryAveragebyLocationArea',
    component: MainLayoutComponent,
    children: [
      { path: '', component: SummaryAveragebyLocationAreaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryAveragebyLocationAreaRouteModule { }
