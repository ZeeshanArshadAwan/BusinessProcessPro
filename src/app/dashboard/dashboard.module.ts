import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModuleModule } from '../material-module/material-module.module';



@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModuleModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
