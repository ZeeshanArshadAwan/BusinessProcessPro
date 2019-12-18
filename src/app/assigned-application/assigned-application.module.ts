import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { AssignedApplicationRoutingModule } from './assigned-application-routing.module';
import { AssignedApplicationComponent } from './assigned-application.component';
import { MaterialModuleModule } from '../material-module/material-module.module';

@NgModule({
  declarations: [AssignedApplicationComponent],
  imports: [
    CommonModule,
    AssignedApplicationRoutingModule,
    MaterialModuleModule
  ]
})
export class AssignedApplicationModule { }
