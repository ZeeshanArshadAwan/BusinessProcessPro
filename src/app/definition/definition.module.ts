import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinitionRoutingModule } from './definition-routing.module';
import { DefinitionComponent } from './definition.component';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../material-module/material-module.module';



@NgModule({
  declarations: [DefinitionComponent],
  imports: [
    CommonModule,
    DefinitionRoutingModule,
    FormsModule,
    MaterialModuleModule,
  ]
})
export class DefinitionModule { }
