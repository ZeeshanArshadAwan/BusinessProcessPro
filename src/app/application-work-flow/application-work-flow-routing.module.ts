import { NgModule } from '@angular/core';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ApplicationWorkFlowComponent } from './application-work-flow.component';
import { Routes, RouterModule } from '@angular/router';





const routes: Routes = [
  {
    path: 'ApplicationWorkFlow',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ApplicationWorkFlowComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationWorkFlowRoutingModule { }
