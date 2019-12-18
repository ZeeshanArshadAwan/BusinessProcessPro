import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyApplicationsComponent } from './my-applications.component';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { MyApplicationsRoutingModule } from './my-applications-routing.module';



@NgModule({
  declarations: [MyApplicationsComponent],
  imports: [
    CommonModule,
    MyApplicationsRoutingModule,
    MaterialModuleModule
  ]
})
export class MyApplicationsModule { }
