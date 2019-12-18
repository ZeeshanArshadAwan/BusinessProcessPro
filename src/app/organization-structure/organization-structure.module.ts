import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationStructureRoutingModule } from './organization-structure-routing.module';
import { OrganizationStructureComponent } from './organization-structure.component';
import { MaterialModuleModule } from '../material-module/material-module.module';



@NgModule({
  declarations: [OrganizationStructureComponent],
  imports: [
    CommonModule,
    OrganizationStructureRoutingModule,
    MaterialModuleModule ,
    // jqxTreeModule, jqxDropDownButtonModule
  ]
})
export class OrganizationStructureModule { }
