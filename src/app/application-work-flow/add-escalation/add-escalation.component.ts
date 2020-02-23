import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ApplicationStatus_Escalation, Sys_Groups, ApplicationType } from 'src/app/Classes/application-work-flow-class';
import { MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { GlobalVariableService } from 'src/app/SharedServices/global-variable.service';
import { SharedServicesService } from 'src/app/SharedServices/shared-services.service';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from 'src/app/custom-confirm-modals/custom-confirm-modals.component';
import { LanguageTranslateService } from 'src/app/SharedServices/language-translate.service';
import { BaseComponent } from 'src/app/SharedServices/base-component';
import { ApplicationStatus } from 'src/app/Classes/application-review';
declare var $: any
@Component({
  selector: 'app-add-escalation',
  templateUrl: './add-escalation.component.html',
  styleUrls: ['./add-escalation.component.css']
})
export class AddEscalationComponent extends BaseComponent implements OnInit {

  id: string = "";
  title: string = "";
  downLoadEnglishTemplate: string = "";
  downLoadArabicTemplate: string = "";
  bApplicationStatus: boolean = false;
  bSendNotfication: boolean = false;
  lstApplicationStatus_Escalation: ApplicationStatus_Escalation[];
  vStatus_SysGroup: Sys_Groups[];
  lstApplicationType: ApplicationType[];
  idTodelete: string = "";
  /////
  public dataSource = new MatTableDataSource<ApplicationStatus_Escalation>();
  selection = new SelectionModel<ApplicationStatus_Escalation>(true, []);
  public displayedColumns = ['selected', 'EscalationNAme', 'NumberofDays', 'action']
  //////

  rdbvalue: string = '';
  objApplicationStatus_Escalation: ApplicationStatus_Escalation;
  constructor(public languageTranslateService: LanguageTranslateService  ,
    public dialogRef: MatDialogRef<AddEscalationComponent>,public GlobalVariableService: GlobalVariableService, public dialog: MatDialog, private _svc: SharedServicesService,
    @Inject(MAT_DIALOG_DATA) public data: EcslationModel) {
      super(languageTranslateService);
    this.id = data.id;
    this.title = data.message;
    this.lstApplicationStatus_Escalation = [];
    this.objApplicationStatus_Escalation = new ApplicationStatus_Escalation();
    this.vStatus_SysGroup = [];
    this.lstApplicationType = [];
  }

  ngOnInit() {
    
    this.GetAllAppStatusByStstusEscId(this.id);
    this.groupsVisitStatus();
    this.GetApplicationStatusList(0);
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  SaveEsclation() { }
  intialvalidation() {

  }
  GetApplicationStatusList(index: number = 0)
  {
    this._svc.GetDetails('ApplicationType/GetAllApplicationTypes').subscribe(
      data => {
        this.lstApplicationType = [];
        this.lstApplicationType = data;
      }
      , (err) => {
        this.GlobalVariableService.openDialog('Escalation', err.toString())
      });
  }


  groupsVisitStatus() {
    
    this._svc.GetDetails('Company/GetAllGroups').subscribe(
      data => {
        this.vStatus_SysGroup = data;
      }
      , (err) => {
        this.GlobalVariableService.openDialog('Application Work Flow', err.toString())
      });
  }

  DeleteEsclation() {
    this.confirmDialog();
  }

  ClearEsclation() {
    this.objApplicationStatus_Escalation = new ApplicationStatus_Escalation();
    this.downLoadArabicTemplate = "";
    this.downLoadEnglishTemplate = "";
    this.bApplicationStatus = false;
    this.bSendNotfication = false;

    for (var i = 0; i < this.vStatus_SysGroup.length; i++) {
      this.vStatus_SysGroup[i].selected = false;
    }
  }
  radioChangeValue(id: string) {
    if (id == "1") {
      this.bSendNotfication = true;
      this.bApplicationStatus = false;
    }
    else if (id == "5") {
      this.objApplicationStatus_Escalation.FK_Action = Number(id);
      this.bApplicationStatus = true;
      this.bSendNotfication = false;
    }
    else {
      this.bApplicationStatus = false;
      this.bSendNotfication = false;
    }

  }


  selectData(id: string, FK_ID: string) {
    
    for (var i = 0; i < this.dataSource.data.length; i++) {

      if (this.dataSource.data[i].StatusEscalationId == Number(id)) {
        this.objApplicationStatus_Escalation = this.dataSource.data[i];
      }
    }

    this.radioChangeValue(this.objApplicationStatus_Escalation.FK_Action.toString());
    if (this.objApplicationStatus_Escalation.FK_Action.toString() == "1") {
      this.bSendNotfication = true;
      this.bApplicationStatus = false;
      if (!this.GlobalVariableService.isStringNullOrEmplty(this.objApplicationStatus_Escalation.notificationGroups)) {
        var arr = this.objApplicationStatus_Escalation.notificationGroups.split(',');
        for (var j = 0; j < arr.length; j++) {
          for (var i = 0; i < this.vStatus_SysGroup.length; i++) {
            if (arr[j].toString() == this.vStatus_SysGroup[i].GroupID.toString()) {
              
              this.vStatus_SysGroup[i].selected = true;
            }
          }
        }
      }
    }
  }

  checkseleted() {
    if (!this.GlobalVariableService.isStringNullOrEmplty(this.objApplicationStatus_Escalation.notificationGroups)) {
      var arr = this.objApplicationStatus_Escalation.notificationGroups.split(',');
      for (var j = 0; j < arr.length; j++) {
        for (var i = 0; i < this.vStatus_SysGroup.length; i++) {
          if (arr[j].toString() == this.vStatus_SysGroup[i].GroupID.toString()) {
            
            this.vStatus_SysGroup[i].selected = true;
          }
          this.vStatus_SysGroup[i].selected = true;
        }
      }
    }
  }

  AddUpdateAppStatusEscalation() {
    
    this.initialValidation();
    this.objApplicationStatus_Escalation.FK_StatusId = Number(this.id);
    this._svc.AddUpdateAppStatusEscalation(this.objApplicationStatus_Escalation, 'ApplicationType/AddUpdateAppStatusEscalation').subscribe(
      data => {
        this.GlobalVariableService.openDialog("Escalation", "Record has been saved.")
        this.GetAllAppStatusByStstusEscId(this.id);
      }, (err) => {
        this.GlobalVariableService.openDialog("Escalation", "Some Error Occured.")
      }
    );
  }
  initialValidation() {
    if (this.objApplicationStatus_Escalation.FK_Action == 1) {
      this.objApplicationStatus_Escalation.notificationGroups = '';

      for (var i = 0; i < this.vStatus_SysGroup.length; i++) {
        if (this.vStatus_SysGroup[i].selected == true) {
          if (this.objApplicationStatus_Escalation.notificationGroups == '')
            this.objApplicationStatus_Escalation.notificationGroups = this.vStatus_SysGroup[i].GroupID.toString();
          else
            this.objApplicationStatus_Escalation.notificationGroups = this.objApplicationStatus_Escalation.notificationGroups + "," + this.vStatus_SysGroup[i].GroupID.toString();
        }
      }
    }
  }
  onChange(i: number) {
    
    this.vStatus_SysGroup[i].selected = !this.vStatus_SysGroup[i].selected;
  }

  GetAllAppStatusByStstusEscId(id: string) {
    this._svc.getGenericParmas(id, "id", 'ApplicationType/GetAllAppStatusByStstusEscId').subscribe(
      data => {
        this.dataSource.data = [];
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        }, (err) => {
      }
    );
  }
  onSelect(index: number) {
    for (var i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].StatusEscalationId == index) {
        if (this.dataSource.data[i].selected == undefined || this.dataSource.data[i].selected == false) {
          this.dataSource.data[i].selected = true;
        }
        else {
          this.dataSource.data[i].selected = false;
        }
      }
    }
  }


  confirmDialog(): void {

    const message = 'Are you sure you want to delete?';
    const dialogData = new CustomConfirmDialogModel("Service Type ", message);
    const dialogRef = this.dialog.open(CustomConfirmModalsComponent, {
      width: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
     if (dialogResult) {
        this.Delete();
      }
    });
  }


  Delete() {

    this.idTodelete = '';
    if (this.dataSource.data.length > 0) {
      for (var i = 0; i < this.dataSource.data.length; i++) {

        if (this.dataSource.data[i].selected == true) {
          if (this.idTodelete == '')
            this.idTodelete = this.dataSource.data[i].StatusEscalationId.toString();
          else
            this.idTodelete = this.idTodelete + ',' + this.dataSource.data[i].StatusEscalationId.toString();
        }
      }
      if (this.idTodelete == "") {
        this.GlobalVariableService.openDialog('Escalation', "Please select any record.");
        return;
      }
      else {
        this._svc.getGenericParmas(this.idTodelete, "Ids", 'ApplicationType/DeleteAppStatusByEscId').subscribe(
          data => {
            this.GlobalVariableService.openDialog("Escalation", "Record Has been deleted.")
            this.GetAllAppStatusByStstusEscId(this.id);
          }, (err) => {

          }
        );
      }
    }
  }

  GetAppStatusByStstusEscId(id: string) {
    this._svc.getGenericParmas(id, "Id", 'ApplicationType/GetAppStatusByStstusEscId').subscribe(
      data => {
        this.GlobalVariableService.openDialog("Escalation", "Record Has been deleted.")
        //  this.getAllVisitTypes();
      }, (err) => {

      }
    );

  }
close(){
  
  this.dialogRef.close(false);
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

export class EcslationModel {

  constructor(public id: string, public message: string) {

  }
}
