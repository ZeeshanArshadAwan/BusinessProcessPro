import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationDetailComponent } from './application-detail.component';
import { ApplicationDetailRouteModule } from './application-detail-route.module';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { LoadDynamicControllModule } from '../load-dynamic-controll/load-dynamic-controll/load-dynamic-controll.module';



@NgModule({
  declarations: [ApplicationDetailComponent],
  imports: [
    CommonModule,
    ApplicationDetailRouteModule,
    LoadDynamicControllModule,
    MaterialModuleModule
  ]
})
export class ApplicationDetailModule { }
