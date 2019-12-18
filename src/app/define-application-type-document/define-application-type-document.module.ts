import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefineApplicationTypeDocumentComponent } from './define-application-type-document.component';
import { DefineApplicationTypeDocumentRoutingModule } from './define-application-type-document-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from 'src/app/material-module/material-module.module';




@NgModule({
  declarations: [DefineApplicationTypeDocumentComponent],
  imports: [
    CommonModule,
    DefineApplicationTypeDocumentRoutingModule,
    FormsModule,
    MaterialModuleModule,
  ]
})

export class DefineApplicationTypeDocumentModule { }
