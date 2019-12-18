import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { LoadDynamicControllModule } from '../load-dynamic-controll/load-dynamic-controll/load-dynamic-controll.module';
import { ApplicationCountComponent } from './application-count.component';
import { ApplicationCountRouteModule } from './application-count-route.module';

@NgModule({
  declarations: [ApplicationCountComponent],
  imports: [
    CommonModule,
    ApplicationCountRouteModule,
    LoadDynamicControllModule,
    MaterialModuleModule
  ]
})

export class ApplicationCountModule { }
