import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationDetailComponent } from './location-detail.component';
import { LocationDetailRoutingModule } from './location-detail-routing.module';
import { MaterialModuleModule } from '../material-module/material-module.module';



@NgModule({
  declarations: [LocationDetailComponent],
  imports: [
    CommonModule,
    LocationDetailRoutingModule,
    MaterialModuleModule
  ]
})
export class LocationDetailModuleModule { }
