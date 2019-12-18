import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationLevelroutingModule } from './location-levelrouting.module';
import { LocationLevelComponent } from './location-level.component';
import { MaterialModuleModule } from '../material-module/material-module.module';



@NgModule({
  declarations: [LocationLevelComponent],
  imports: [
    CommonModule,
    LocationLevelroutingModule,
    MaterialModuleModule
  ]
})
export class LocationLevelModule { }
