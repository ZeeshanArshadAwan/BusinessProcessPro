import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationHistoryComponent } from './application-history.component';
import { ApplicationHistoryRoutingModule } from './application-history-routing.module';
import { MaterialModuleModule } from '../material-module/material-module.module';



@NgModule({
  declarations: [ApplicationHistoryComponent],
  imports: [
    CommonModule,
    ApplicationHistoryRoutingModule,
    MaterialModuleModule
  ]
})
export class ApplicationHistoryModule { }
