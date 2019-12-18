import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationWorkFlowRoutingModule } from './application-work-flow-routing.module';
import { ApplicationWorkFlowComponent } from './application-work-flow.component';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { LoadDynamicControllModule } from '../load-dynamic-controll/load-dynamic-controll/load-dynamic-controll.module';
// import { LoadDynamicControllComponent } from '../load-dynamic-controll/load-dynamic-controll.component';
// import { AddEscalationComponent } from './add-escalation/add-escalation.component';


@NgModule({
  declarations: [ApplicationWorkFlowComponent],
  imports: [
    CommonModule,
    ApplicationWorkFlowRoutingModule,
    FormsModule,
    MaterialModuleModule,   
    LoadDynamicControllModule,
    CKEditorModule,
  ]
})
export class ApplicationWorkFlowModule { }
