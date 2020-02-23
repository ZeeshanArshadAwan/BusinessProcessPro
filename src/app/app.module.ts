import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedServicesService } from './SharedServices/shared-services.service';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationSettingModule } from './application-setting/application-setting.module';
import { CommonModalsComponent } from './common-modals/common-modals.component';
import { ApplicationWorkFlowModule } from './application-work-flow/application-work-flow.module';
import { CustomConfirmModalsComponent } from './custom-confirm-modals/custom-confirm-modals.component';
import { DefineGroupModule } from './define-group/define-group.module';
import { MaterialModuleModule } from './material-module/material-module.module';
import { DefineGroupModalComponent } from './define-group/define-group-modal/define-group-modal.component';
import { DefineUserModule } from './define-user/define-user.module';
import { NewUserPopUpComponent } from './define-user/new-user-pop-up/new-user-pop-up.component';
import { OrganizationStructureModule } from './organization-structure/organization-structure.module';
import { LocationLevelModule } from './location-level/location-level.module';
import { LocationDetailModuleModule } from './location-detail/location-detail-module.module';
import { NotificationTypeModule } from './notification-type/notification-type.module';
import { DefinitionModule } from './definition/definition.module';
import { AddNewControllComponent } from './add-new-controll/add-new-controll.component';
import { ConfirmDialogComponent } from './definition/confirm-dialog/confirm-dialog.component';
import { LanguageTranslateService } from './SharedServices/language-translate.service';
import { AddEscalationComponent } from './application-work-flow/add-escalation/add-escalation.component';
import { NumberOnlyDirective } from './SharedServices/number.directive';
import { CKEditorModule } from 'ng2-ckeditor';
import { ReviewApplicationsModule } from './review-applications/review-applications.module';
import { LoadDynamicControllModule } from './load-dynamic-controll/load-dynamic-controll/load-dynamic-controll.module';
import { DefineApplicationTypeDocumentModule } from './define-application-type-document/define-application-type-document.module';
import { AddFiledsForDropDownComponent } from './add-fileds-for-drop-down/add-fileds-for-drop-down.component';
import { ApplicationDetailReportModule } from './application-detail-report/application-detail-report.module';
import { ApplicationDetailModule } from './application-detail/application-detail.module';
import { AssignedApplicationModule } from './assigned-application/assigned-application.module';
import { MyApplicationsModule } from './my-applications/my-applications.module';
import { AppTypeApplicatonsModuleModule } from './app-type-applicatons/app-type-applicatons-module.module';
import { ApplicationHistoryModule } from './application-history/application-history.module';
import { ApplicationPerServiceSourceModule } from './application-per-service-source/application-per-service-source.module';
import { ApplicationAuditLogReportModule } from './application-audit-log-report/application-audit-log-report.module';
import { ApplicationCountModule } from './application-count/application-count.module';
import { ApplicationPerTypeModule } from './application-per-type/application-per-type.module';
import { WorkFlowApiComponent } from './work-flow-api/work-flow-api.component';
import { EmployeeDeputyAssignmentModule } from './employee-deputy-assignment/employee-deputy-assignment/employee-deputy-assignment.module';
import { WorkFlowApiModule } from './work-flow-api/work-flow-api.module';
import { LoadDynamicControllComponent } from './load-dynamic-controll/load-dynamic-controll.component';
import { PopupModalComponent } from './work-flow-api/popup-modal/popup-modal.component';
import { jqxDataTableComponent, jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { NgIdleKeepaliveModule, Keepalive } from '@ng-idle/keepalive';
import { AddgroupsForDropDownComponent } from './add-groups-for-drop-down/add-groups-for-drop-down.component';
import { BlockUIModule } from 'ng-block-ui';
import { PaymentServiceReportComponent } from './payment-service-report/payment-service-report.component';
import { PaymentServiceReportModule } from './payment-service-report/payment-service-report/payment-service-report.module';
import { ApplicationStatusReportComponent } from './application-status-report/application-status-report.component';
import { ApplicationStatusReportModule } from './application-status-report/application-status-report/application-status-report.module';
import { SummaryAveragebyCustomerComponent } from './summary-averageby-customer/summary-averageby-customer.component';
import { SummaryAveragebyCustomerModule } from './summary-averageby-customer/summary-averageby-customer.module';
import { DetailedCustomerVisitsComponent } from './detailed-customer-visits/detailed-customer-visits.component';
import { DetailedCustomerVisitsModuleModule } from './detailed-customer-visits/detailed-customer-visits-module.module';
import { SummaryAveragebyLocationAreaComponent } from './summary-averageby-location-area/summary-averageby-location-area.component';
import { SummaryAveragebyLocationAreaModule } from './summary-averageby-location-area/summary-averageby-location-area.module';
import { SummaryAveragebyServiceComponent } from './summary-averageby-service/summary-averageby-service.component';
import { SummaryAveragebyServiceModule } from './summary-averageby-service/summary-averageby-service.module';


@NgModule({
  declarations: [
    AppComponent,
   
    ConfirmDialogComponent,
    CommonModalsComponent,
    CustomConfirmModalsComponent,
    DefineGroupModalComponent,
    NewUserPopUpComponent,
    AddNewControllComponent,
    LoginComponent,
    AddEscalationComponent ,
    NumberOnlyDirective,
    AddFiledsForDropDownComponent,
    PopupModalComponent,
    AddgroupsForDropDownComponent,
    SummaryAveragebyCustomerComponent,
    DetailedCustomerVisitsComponent,
    SummaryAveragebyLocationAreaComponent,
    SummaryAveragebyServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    ApplicationWorkFlowModule,
    DefineGroupModule,
    DefineUserModule,
    ApplicationSettingModule,
    BrowserAnimationsModule,
    ReviewApplicationsModule,
    LayoutModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModuleModule,
    OrganizationStructureModule,
    LocationLevelModule,
    LocationDetailModuleModule,
    NotificationTypeModule,
    DefinitionModule,
    CKEditorModule,
    LoadDynamicControllModule,
    DefineApplicationTypeDocumentModule,
    ApplicationDetailReportModule,
    ApplicationDetailModule,
    AssignedApplicationModule,
    MyApplicationsModule,
    AppTypeApplicatonsModuleModule,
    ApplicationHistoryModule,
    ApplicationAuditLogReportModule,
    ApplicationPerServiceSourceModule,
    ApplicationCountModule,
    ApplicationPerTypeModule,
    EmployeeDeputyAssignmentModule,
    WorkFlowApiModule,
    PaymentServiceReportModule,
    ApplicationStatusReportModule,
    SummaryAveragebyCustomerModule,
    DetailedCustomerVisitsModuleModule,
    SummaryAveragebyLocationAreaModule,
    SummaryAveragebyServiceModule,
    NgIdleKeepaliveModule.forRoot(),
    BlockUIModule.forRoot()
  ],
  exports: [
    LayoutModule,
    DashboardModule,
    FormsModule,
    RouterModule,
    HttpClientModule
    ],
  providers: [SharedServicesService,
    LanguageTranslateService],
  bootstrap: [AppComponent],
  entryComponents: [DefineGroupModalComponent, NewUserPopUpComponent,   
    ConfirmDialogComponent, CommonModalsComponent, CustomConfirmModalsComponent,
    AddNewControllComponent,  PopupModalComponent, AddEscalationComponent ,AddFiledsForDropDownComponent , LoadDynamicControllComponent,AddgroupsForDropDownComponent]
})
export class AppModule { }
