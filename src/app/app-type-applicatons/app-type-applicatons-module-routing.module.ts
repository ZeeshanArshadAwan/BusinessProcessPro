import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { AppTypeApplicatonsComponent } from './app-type-applicatons.component';

const routes: Routes = [
  {
    path: 'AppTypeApplicatons',
    component: MainLayoutComponent,
    children: [
      { path: '', component: AppTypeApplicatonsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTypeApplicatonsModuleRoutingModule { }
