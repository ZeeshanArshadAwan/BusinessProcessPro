import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ApplicationHistoryComponent } from './application-history.component';



const routes: Routes = [
  {
    path: 'ApplicationHistory',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ApplicationHistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationHistoryRoutingModule { }
