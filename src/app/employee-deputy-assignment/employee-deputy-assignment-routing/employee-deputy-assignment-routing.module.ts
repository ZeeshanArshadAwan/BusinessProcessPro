import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { ApplicationSettingComponent } from 'src/app/application-setting/application-setting.component';
import { EmployeeDeputyAssignmentComponent } from '../employee-deputy-assignment.component';



const routes: Routes = [
  {
    path: 'EmployeeDeputyAssignment',
    component: MainLayoutComponent,
    children: [
      { path: '', component: EmployeeDeputyAssignmentComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDeputyAssignmentRoutingModule { }
