import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { OrganizationStructureComponent } from './organization-structure.component';


const routes: Routes = [
  {
    path: 'OrganizationStructure',
    component: MainLayoutComponent,
    children: [
      { path: '', component: OrganizationStructureComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationStructureRoutingModule { }
