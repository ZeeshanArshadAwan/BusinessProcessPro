import { Injectable } from '@angular/core';
import { Login, Sys_Modules, FormsAgainstModuleId, Sys_Forms } from '../Classes/login';
import { CommonDialogModel, CommonModalsComponent } from '../common-modals/common-modals.component';
import { MatDialog } from '@angular/material';
import { StorageService } from 'ngx-webstorage-service';
import { SharedServicesService } from './shared-services.service';
import { AppSetting } from '../Classes/app-setting';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationTools, ApplicationTypeFields, ApplicationInfo } from '../Classes/application-review';
import { ApplciationTypePanels, FieldListItems, listSelectData } from '../Classes/application-work-flow-class';
import { DisplayControls, DynamicDataTable } from '../Classes/Applications';
import { ApplicationValues } from '../Classes/ApplicationValues';
import * as $ from 'jquery';

//StorageServiceModule

@Injectable({
  providedIn: 'root'
})

export class GlobalVariableService {


  GroupSySModule: Sys_Modules[];
  STORAGE_KEY = 'local_todolist';
  ipLink: string;
  userPrevilieges: Login;
  activeMenue: string = "";
  parameterID: string = '6';
  Sys_Forms: Sys_Forms;
  FieldListItemsData: FieldListItems[];
  Applicationid: number = 0;
  GlobalImagePath: string = "";
  applicationdetaildiv: boolean = false;
  // DisplayControls:DisplayControls;
  bDisplayControls: boolean = true;
  ApplicationTools: ApplicationTools;
  AssignedApplication: boolean = false;
  isAllapplication: boolean = false;
  isApplicationHistory: boolean = false;
  // lstformtoDisplay: Sys_Modules[];
  formtoDisplay: FormsAgainstModuleId;
  glbApplciationTypePanels: ApplciationTypePanels[];
  controllsApplicationTypeFields: ApplicationTypeFields[];
  fieldData: ApplicationTypeFields[];
  FieldListItems: FieldListItems;
  objPanelInfo: ApplciationTypePanels;
  FieldID: number;
  ApplicationTypeId: number;
  objApplicationInfo: ApplicationInfo;
  ApplicationValues: ApplicationValues[];
  objlistSelectData: listSelectData;
  listSelectData: listSelectData[];
  editProspectMode: boolean = true;
  IsTemplateDownLoad: boolean = false;
  IsDocumentUpload: boolean = false;
  ListFieldItems: FieldListItems[];
  coloumns: string = "";
  ColoumnList: any = [];
  ColoumnArray = [];
  DataFieldsArray = [];
  jsoncoloumnarray: string = "";
  jsondatafield: string = "";
  DynamicDataTable: DynamicDataTable[];
  objDynamicDataTable: DynamicDataTable;
  GetDatatableColoumns: DynamicDataTable[];
  constructor(public dialog: MatDialog, private _svc: SharedServicesService) {
    // this.ipLink = '"http://192.168.168.144/VMSService/api/definition/';
    this.formtoDisplay = new FormsAgainstModuleId();
    this.Sys_Forms = new Sys_Forms();
    this.GroupSySModule = [];
    this.objlistSelectData = new listSelectData;
    this.listSelectData = [];
    this.FieldListItemsData = [];
    this.ApplicationTools = new ApplicationTools();
    this.FieldListItems = new FieldListItems();
    this.objPanelInfo = new ApplciationTypePanels();
    this.glbApplciationTypePanels = [];
    this.fieldData = [];
    this.objApplicationInfo = new ApplicationInfo();
    this.ApplicationValues = [];
    this.ListFieldItems = [];
    this.DynamicDataTable = [];
    this.GetDatatableColoumns = [];
    // this.lstformtoDisplay = [];
    this.objDynamicDataTable = new DynamicDataTable();
  }




  openDialog(title: string, Msg: string): void {
    const message = Msg;
    const dialogData = new CommonDialogModel(title, message);

    const dialogRef = this.dialog.open(CommonModalsComponent, {
      width: '640px', disableClose: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {


    });

  }
  isStringNullOrEmplty(val: string) {
    if (val == null || val == "" || val == undefined)
      return true;
    else
      return false;
  }
  isNumberNullOrEmplty(val: number) {
    if (val == null || val == undefined)
      return true;
    else
      return false;
  }
  saveLocalstporage(key: string, values: FormsAgainstModuleId) {
    // this.STORAGE_KEY = key;
    // this.storage.set(this.STORAGE_KEY, values);
    // console.log(this.storage.get(this.STORAGE_KEY) || 'LocaL storage is empty');
    // this.LocalstorageService.saveLocalstporage(key,values);
  }


  GetAllPanelsByApplicationTypeId(ApplicationTypeId: number) {

    this._svc.getGenericParmas(ApplicationTypeId, "ApplicationTypeId", 'DynamicForm/GetAllPanelsByApplicationTypeId').subscribe(
      data => {
        debugger;
        this.glbApplciationTypePanels = [];
        this.glbApplciationTypePanels = data;
        this.GetAllFieldsByAppTypeId(ApplicationTypeId);
      }, (err) => {
        this.openDialog("Service Type ", "Some Error has been occured while Getting All entities.")
      }
    );
  }

  GetAllFieldsByAppTypeId(ApplicationTypeId: number) {
    debugger;
    this.DynamicDataTable = [];
    this._svc.getGenericParmas(ApplicationTypeId, "ApplicationTypeId", 'DynamicForm/GetAllFieldsByAppTypeId').subscribe(
      data => {
        debugger;
        this.controllsApplicationTypeFields = [];
        this.controllsApplicationTypeFields = data;
        this.listSelectData = [];
        setTimeout(() => {
          debugger;
          for (var i = 0; i < this.controllsApplicationTypeFields.length; i++) {
            if (this.controllsApplicationTypeFields[i].FK_FieldType == 6
              || this.controllsApplicationTypeFields[i].FK_FieldType == 9
              || this.controllsApplicationTypeFields[i].FK_FieldType == 8
            ) {
              this.chkDatafunc(this.controllsApplicationTypeFields[i].FieldId)
            }
            if (this.controllsApplicationTypeFields[i].FK_FieldType == 19) {
              this.GetAllDynamictableColoumns(this.controllsApplicationTypeFields[i].FieldId);
            }

            debugger;
            if (this.controllsApplicationTypeFields[i].FK_FieldType == 20 ) //|| this.glbApplciationTypePanels[k].SaveMultipleFields
             {
              debugger;
              for (let k = 0; k < this.glbApplciationTypePanels.length; k++) {
                var FieldList = this.controllsApplicationTypeFields.filter(a => a.FK_PanelId == this.glbApplciationTypePanels[k].PanelId)
                var colText = [];
                if (FieldList.length > 0) {
                  for (let l = 0; l < FieldList.length; l++) {
                    colText.push(FieldList[l].FieldCaption);
                    //                    this.GetAlltableColoumnsyFields(this.controllsApplicationTypeFields[i].FieldCaption);
                  }
                }
              }
            }
          }
        }, 10);
      }, (err) => {
        this.openDialog("Service Type ", "Some Error has been occured while Getting All entities.")
      }
    );
  }
  // GetAllDynamictableColoumns(id: number) {
  //   debugger;
  //   this._svc.getGenericParmas(id, 'FK_FieldId', 'DynamicForm/GetAllFieldListItemsByFieldId').subscribe(
  //     data => {
  //       debugger;
  //       this.FieldListItemsData = [];
  //       this.FieldListItemsData = data;
  //       // this.pushdata(this.FieldListItemsData, id)

  //       this.addDataInDynamicTables(id, data, this.FieldListItemsData);
  //     }, (err) => {
  //       this.openDialog("Application", "Some Error has been occured.")
  //     }
  //   );
  // }
  // addDataInDynamicTables(id: number, datatable: any, columnName: any) {
  //   debugger;
  //   this.ColoumnList = [];
  //   this.ColoumnArray = [];
  //   this.coloumns = '';
  //   for (let i = 0; i < columnName.length; i++) {
  //     this.coloumns += columnName[i].FieldText + ","
  //   }
  //   this.ColoumnList = this.coloumns.split(',');

  //   for (let i = 0; i < this.ColoumnList.length; i++) {
  //     if (this.ColoumnList[i] != "") {
  //       this.DataFieldsArray.push({ name: this.ColoumnList[i], type: 'string' });
  //       this.ColoumnArray.push({ text: this.ColoumnList[i], dataField: this.ColoumnList[i], width: 200 });
  //     }
  //   }
  //  this.injectdata(id, this.ColoumnArray,this.objDynamicDataTable )

  // }
  // injectdata(id:number ,ColoumnArray: any , ColoumnList: any ){

  //   this.objDynamicDataTable = new DynamicDataTable();
  //   this.objDynamicDataTable.id = id;
  //   this.objDynamicDataTable.ColumnName = this.ColoumnArray;
  //   this.objDynamicDataTable.Datatable = this.ColoumnList;
  //   this.DynamicDataTable.push(this.objDynamicDataTable);
  // }
  editControll(PanelId: number) {
    this.objPanelInfo = this.glbApplciationTypePanels.filter(x => x.PanelId == PanelId)[0];
  }
  getUserID() {
    var a = JSON.parse(localStorage.getItem("BPPobjlogin"));
    return a.ID;
  }
  getName() {
    var a = JSON.parse(localStorage.getItem("BPPobjlogin"));
    return a.UserName;
  }
  getFieldValuesByApptypeid() {

    var id = '';
    if (this.parameterID != '') {
      id = this.parameterID;
    }
    else {
      id = this.Applicationid.toString();
    }
    if (!this.isStringNullOrEmplty(id)) {
      this._svc.getGenericParmas(id, "ApplicationTypeId", 'Application/GetApplicationDetails').subscribe(
        data => {

          this.fieldData = data;
        });
    }

  }
  chkDatafunc(id: number) {
    this._svc.getGenericParmas(id, 'FK_FieldId', 'DynamicForm/GetAllFieldListItemsByFieldId').subscribe(
      data => {
        debugger;
        this.FieldListItemsData = [];
        this.ColoumnList = [];
        this.FieldListItemsData = data;
        this.pushdata(this.FieldListItemsData, id)

      }, (err) => {
        this.openDialog("Application", "Some Error has been occured.")
      }
    );
  }
  pushdata(FieldListItems: FieldListItems[], id: number) {

    this.objlistSelectData = new listSelectData();
    this.objlistSelectData.FieldListItems = FieldListItems;
    this.objlistSelectData.id = id;
    if (this.objlistSelectData.FieldListItems.length > 0) {
      var a = this.listSelectData.filter(x => x.id == id)
      if (a.length < 1) {
        this.listSelectData.push(this.objlistSelectData);

      }
    }
    for (let i = 0; i < this.objlistSelectData.FieldListItems.length; i++) {
      this.coloumns += this.objlistSelectData.FieldListItems[i].FieldText + ","
    }
    this.ColoumnList = this.coloumns.split(',');

  }
  GetAllDynamictableColoumns(id: number) {
    debugger;
    this._svc.getGenericParmas(id, 'FK_FieldId', 'DynamicForm/GetAllFieldListItemsByFieldId').subscribe(
      data => {
        debugger;
        this.FieldListItemsData = [];
        this.FieldListItemsData = data;
        // this.pushdata(this.FieldListItemsData, id)

        this.addDataInDynamicTables(id, data, this.FieldListItemsData);
      }, (err) => {
        // this.openDialog("Application", "Some Error has been occured.")
      }
    );
  }
  addDataInDynamicTables(id: number, datatable: any, columnName: any) {
    debugger;
    this.ColoumnList = [];
    this.ColoumnArray = [];
    this.coloumns = '';
    for (let i = 0; i < columnName.length; i++) {
      this.coloumns += columnName[i].FieldText + ","
    }
    this.ColoumnList = this.coloumns.split(',');

    for (let i = 0; i < this.ColoumnList.length; i++) {
      if (this.ColoumnList[i] != "") {
        this.DataFieldsArray.push({ name: this.ColoumnList[i], type: 'string' });
        this.ColoumnArray.push({ text: this.ColoumnList[i], dataField: this.ColoumnList[i], width: 200 });
      }
    }
    this.injectdata(id, this.ColoumnArray, this.objDynamicDataTable)
    //this.injectdata(id, this.ColoumnArray,columnName);
  }
  injectdata(id: number, ColoumnArray: any, ColoumnList: any) {
    debugger;
    this.objDynamicDataTable = new DynamicDataTable();
    this.objDynamicDataTable.id = id;
    this.objDynamicDataTable.ColumnName = ColoumnArray;
    this.objDynamicDataTable.Datatable = ColoumnList;
    this.DynamicDataTable.push(this.objDynamicDataTable);
  }
  GetAlltableColoumnsyFields(ColName: string) {
    debugger;
    var test = ColName;

  }




}
