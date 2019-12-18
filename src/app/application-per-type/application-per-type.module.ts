import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { ApplicationPerTypeRouteModule } from './application-per-type-route.module';
import { ApplicationPerTypeComponent } from './application-per-type.component';


@NgModule({
  declarations: [ApplicationPerTypeComponent],
  imports: [
    CommonModule,
    ApplicationPerTypeRouteModule,
    MaterialModuleModule
  ]
})
export class ApplicationPerTypeModule { }
