import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { NotificationTypeComponent } from './notification-type.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'NotificationType',
    component: MainLayoutComponent,
    children: [
      { path: '', component: NotificationTypeComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationTypeRoutingModule { }
