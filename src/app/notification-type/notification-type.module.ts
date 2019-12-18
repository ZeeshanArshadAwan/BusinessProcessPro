import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationTypeComponent } from './notification-type.component';
import { NotificationTypeRoutingModule } from './notification-type-routing.module';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  declarations: [NotificationTypeComponent],
  imports: [
    CommonModule,
    NotificationTypeRoutingModule,
    MaterialModuleModule,
    CKEditorModule
  ]
})
export class NotificationTypeModule { }
