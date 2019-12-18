import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefineUserRoutingModule } from './define-user-routing.module';
import { DefineUserComponent } from './define-user.component';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../material-module/material-module.module';



@NgModule({
  declarations: [DefineUserComponent],
  imports: [
    CommonModule,
    DefineUserRoutingModule,
    FormsModule,
    MaterialModuleModule,
  ]
})
export class DefineUserModule { }
