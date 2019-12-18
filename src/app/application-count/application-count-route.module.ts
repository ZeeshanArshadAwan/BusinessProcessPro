import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ApplicationCountComponent } from './application-count.component';


const routes: Routes = [
  {
    path: 'ApplicationCount',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ApplicationCountComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationCountRouteModule { }
