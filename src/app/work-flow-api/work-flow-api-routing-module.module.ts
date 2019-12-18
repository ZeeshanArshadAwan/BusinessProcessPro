import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { MyApplicationsComponent } from '../my-applications/my-applications.component';
import { WorkFlowApiComponent } from './work-flow-api.component';
const routes: Routes = [
  {
    path: 'WorkFlowApi',
    component: MainLayoutComponent,
    children: [
      { path: '', component: WorkFlowApiComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkFlowApiRoutingModuleModule { }
