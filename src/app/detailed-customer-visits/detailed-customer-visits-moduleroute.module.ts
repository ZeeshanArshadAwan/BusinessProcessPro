import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { DetailedCustomerVisitsComponent } from './detailed-customer-visits.component';



const routes: Routes = [
  {
    path: 'DetailedCustomerVisits',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DetailedCustomerVisitsComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailedCustomerVisitsModulerouteModule { }
