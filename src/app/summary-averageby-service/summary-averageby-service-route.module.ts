import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { SummaryAveragebyServiceComponent } from './summary-averageby-service.component';



const routes: Routes = [
  {
    path: 'SummaryAveragebyService',
    component: MainLayoutComponent,
    children: [
      { path: '', component: SummaryAveragebyServiceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryAveragebyServiceRouteModule { }
