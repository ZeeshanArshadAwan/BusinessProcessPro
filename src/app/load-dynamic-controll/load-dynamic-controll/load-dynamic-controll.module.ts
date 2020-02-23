import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadDynamicControllComponent } from '../load-dynamic-controll.component';
import { MaterialModuleModule } from 'src/app/material-module/material-module.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule ,MaterialModuleModule ,CKEditorModule,jqxDataTableModule , FormsModule],
  exports: [LoadDynamicControllComponent],
  declarations: [LoadDynamicControllComponent],
  providers: [],
})

export class LoadDynamicControllModule { }
