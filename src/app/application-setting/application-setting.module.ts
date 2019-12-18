import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationSettingComponent } from './application-setting.component';
import { ApplicationSettingRoutingModule } from './application-setting-routing.module';
import { MaterialModuleModule } from '../material-module/material-module.module';



@NgModule({
  declarations: [ApplicationSettingComponent],
  imports: [
    CommonModule,
    ApplicationSettingRoutingModule,
    MaterialModuleModule,
    
  ]
})
export class ApplicationSettingModule { }
