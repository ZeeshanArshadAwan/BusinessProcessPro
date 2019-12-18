import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { WorkFlowApiRoutingModuleModule } from './work-flow-api-routing-module.module';
import { WorkFlowApiComponent } from './work-flow-api.component';
// import { Http, HttpModule } from '@angular/http';



@NgModule({
  // providers: [Http],
  declarations: [WorkFlowApiComponent],
  imports: [
    CommonModule,
    MaterialModuleModule,
    WorkFlowApiRoutingModuleModule,
     
  ]

})
export class WorkFlowApiModule { }
