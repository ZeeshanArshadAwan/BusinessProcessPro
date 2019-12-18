import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDeputyAssignmentComponent } from '../employee-deputy-assignment.component';
import { EmployeeDeputyAssignmentRoutingModule } from '../employee-deputy-assignment-routing/employee-deputy-assignment-routing.module';
import { MaterialModuleModule } from 'src/app/material-module/material-module.module';


@NgModule({
  declarations: [ EmployeeDeputyAssignmentComponent],
  imports: [
    CommonModule,
    EmployeeDeputyAssignmentRoutingModule,
    MaterialModuleModule
  ]
})
export class EmployeeDeputyAssignmentModule { }
