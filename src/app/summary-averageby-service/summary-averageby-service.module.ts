import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryAveragebyServiceRouteModule } from './summary-averageby-service-route.module';
import { MaterialModuleModule } from '../material-module/material-module.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SummaryAveragebyServiceRouteModule,
    MaterialModuleModule
  ]
})
export class SummaryAveragebyServiceModule { }
