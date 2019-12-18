import { NgModule } from '@angular/core';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationDetailComponent } from './application-detail.component';

const routes: Routes = [
  {
    path: 'ApplicationDetail',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ApplicationDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationDetailRouteModule { }
