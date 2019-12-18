import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationPerServiceSourceComponent } from './application-per-service-source.component';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { ApplicationPerServiceSourceRouteModule } from './application-per-service-source-route.module';



@NgModule({
  declarations: [ApplicationPerServiceSourceComponent],
  imports: [
    CommonModule,
    ApplicationPerServiceSourceRouteModule,
    MaterialModuleModule
  ]
})
export class ApplicationPerServiceSourceModule { }
