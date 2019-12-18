import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefineGroupComponent } from './define-group.component';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';


//DefineGroup
const routes: Routes = [
  {
    path: 'DefineGroup',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DefineGroupComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefineGroupRoutingModule { }
