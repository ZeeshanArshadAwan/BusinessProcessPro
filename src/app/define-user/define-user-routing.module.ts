import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { DefineUserComponent } from './define-user.component';



const routes: Routes = [
  {
    path: 'DefineUser',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DefineUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefineUserRoutingModule { }
