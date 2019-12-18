import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefineGroupComponent } from './define-group.component';
import { DefineGroupRoutingModule } from './define-group-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [DefineGroupComponent],
  imports: [
    CommonModule,
    DefineGroupRoutingModule,
    FormsModule,
    MaterialModuleModule,
    MatDialogModule
  ]
})
export class DefineGroupModule { }
