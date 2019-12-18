import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewApplicationsRoutingModule } from './review-applications-routing.module';
import { ReviewApplicationsComponent } from './review-applications.component';
import { MaterialModuleModule } from '../material-module/material-module.module';



@NgModule({
  declarations: [ReviewApplicationsComponent],
  imports: [
    CommonModule,
    ReviewApplicationsRoutingModule,
    MaterialModuleModule
  ]
})
export class ReviewApplicationsModule { }
