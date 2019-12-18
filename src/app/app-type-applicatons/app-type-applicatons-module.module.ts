import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTypeApplicatonsComponent } from './app-type-applicatons.component';
import { AppTypeApplicatonsModuleRoutingModule } from './app-type-applicatons-module-routing.module';
import { MaterialModuleModule } from '../material-module/material-module.module';


@NgModule({
  declarations: [AppTypeApplicatonsComponent],
  imports: [
    CommonModule,
    AppTypeApplicatonsModuleRoutingModule,
    MaterialModuleModule
  ]
})
export class AppTypeApplicatonsModuleModule { }
