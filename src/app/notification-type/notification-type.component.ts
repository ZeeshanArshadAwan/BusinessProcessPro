import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationType, NotifcationsTypesParameters } from '../Classes/notification-type';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { MatSort } from '@angular/material';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { BaseComponent } from '../SharedServices/base-component';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';

@Component({
  selector: 'app-notification-type',
  templateUrl: './notification-type.component.html',
  styleUrls: ['./notification-type.component.css']
})
export class NotificationTypeComponent  extends BaseComponent implements OnInit, AfterViewInit {

  FormName: string = '';
  NotificationType: NotificationType[];
  objNotificationType: NotificationType;
  rdbHasEmail: string = '';
  rdbHasSMS: string = '';
  NotifcationsTypesParameters: NotifcationsTypesParameters[];
  isEdit: boolean = false;
  public dataSource = new MatTableDataSource<NotificationType>();
  public displayedColumns = ['TypeNameEn', 'TypeNameAr', 'EmailNotificationTemplateEn', 'EmailNotificationTemplateAr', 'NotificationTypeId']

  constructor(public languageTranslateService: LanguageTranslateService,private _svc: SharedServicesService, public GlobalVariableService: GlobalVariableService) {
    super(languageTranslateService);
    this.NotificationType = [];
    this.NotifcationsTypesParameters = [];
    this.objNotificationType = new NotificationType();

  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    if(this.GlobalVariableService.isEn){
      this.FormName = localStorage.getItem("BPPFromNameEn");
    }
    else {
      this.FormName = localStorage.getItem("BPPFromNameAr");
    }

    this.isEdit = false;
    this.GetAllNotifications();

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  edit(NotificationTypeId: number) {

    this.isEdit = true;
    this.GetAllNotificationsParameter(NotificationTypeId.toString());
    this.GetNotificationDetail(NotificationTypeId.toString());
  }

  GetAllNotifications() {
    this._svc.GetDetails('Notification/GetAllNotifications').subscribe(
      data => {

        this.NotificationType = data;
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  GetAllNotificationsParameter(id: string) {
    this._svc.getGenericParmas(id, "NotificationParameterId", 'Notification/GetAllNotificationsParameter').subscribe(
      data => {
        
        this.NotifcationsTypesParameters = data;

      })
  }
  GetNotificationDetail(id: string) {

    this._svc.getGenericParmas(id, "NotificationId", 'Notification/GetNotificationDetail').subscribe(
      data => {
        
        this.objNotificationType = data;
        if (this.objNotificationType.IsSpecificTimeEmail) {
          this.rdbHasEmail = "1";
          
        } else {
          this.rdbHasEmail = "0";
        }

        if(this.objNotificationType.IsSpecificTimeSMS){
          this.rdbHasSMS = "1";
        }
        else {
          this.rdbHasSMS = "0";
        }
      }, (err) => {
        this.GlobalVariableService.openDialog("Notification Typee", "Operation Failed Some Error Occured.");
      });
  }
  radioSMSChange(flag: string) {
    if (flag == "1") {
      this.objNotificationType.IsSpecificTimeSMS = true;
      this.rdbHasSMS = "1";
    }
    else {
      this.rdbHasSMS = "0";
      this.objNotificationType.IsSpecificTimeSMS = false;
    }
  }

  radioEmailChange(flag: string) {
    
    if (flag == "1") {
      this.objNotificationType.IsSpecificTimeEmail = true;
      this.rdbHasEmail = "1";
    }
    else {
      this.rdbHasEmail = "0";
      this.objNotificationType.IsSpecificTimeEmail = false;
    }
  }
  //  Notification/SaveNotificationType
  SaveNotificationType() {
    this._svc.SaveNotificationType(this.objNotificationType, "Notification/SaveNotificationType").subscribe(
      data => {
        this.GlobalVariableService.openDialog("Notification Type", data);
      }, (err) => {
        this.GlobalVariableService.openDialog("Notification Typee", "Operation Failed Some Error Occured.");
      });
  }
  update() {
    this.SaveNotificationType();
  }
  addEnglishSMS() {

  }
  addArabicSMS() {

  }
 Cancel(){
  this.isEdit = false;
 }

  updateArabicTemplate() {

  }
  updateEnglishTemplate() {

  }


  config = {
    uiColor: '#ffffff',
    toolbarGroups: [{ name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
    { name: 'links' }, { name: 'insert' },
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
    { name: 'styles' },
    { name: 'colors' }],
    skin: 'kama',
    resize_enabled: false,
    removePlugins: 'elementspath,save,magicline',
    extraPlugins: 'divarea,smiley,justify,indentblock,colordialog',
    colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
    },
    height: 188,
    removeDialogTabs: 'image:advanced;link:advanced',
    removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
    format_tags: 'p;h1;h2;h3;pre;div'
  }

}