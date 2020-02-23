import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { LoadDynamicControllComponent } from '../load-dynamic-controll/load-dynamic-controll.component';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Applications, StatusForRadioButton } from '../Classes/Applications';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { ApplicationValues } from '../Classes/ApplicationValues';
import { ApplicationInfo } from '../Classes/ApplicationInfo';
import { ApplicationType } from '../Classes/application-work-flow-class';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ApplicationType_Documents } from '../Classes/ApplicationType_Documents';
import { DomSanitizer } from '@angular/platform-browser';
import { Application_Files } from '../Classes/Application_Files';
import { ApplicationTypeTemplate } from '../Classes/ApplicationTypeTemplate';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { BaseComponent } from '../SharedServices/base-component';
import jsPDF from 'jspdf';
import { PaymentServices } from '../Classes/PaymentServices';
import { FinesPayment } from '../Classes/FinesPayment ';
import { SelectionModel } from '@angular/cdk/collections';
import { GeoSpatialMaps } from '../Classes/GeoSpatialMaps';
import { saveAs } from '../../assets/js/FileSaver.js';
import { THIS_EXPR, NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Caption } from '../resources/english';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.css']
})
export class ApplicationDetailComponent extends BaseComponent implements OnInit, AfterViewInit {
  application: Applications;
  AppId: number;
  applicationtype: ApplicationType;
  applicationvalues: ApplicationValues;
  applicationvaluelist: ApplicationValues[];
  ApplicationId: number = 0;
  DocumentTypeId: number;
  statusforradiobotton: StatusForRadioButton[];
  ApplicationtypeDocuments: ApplicationType_Documents[];
  imageSrc: any;
  objSaveFiles: Application_Files;
  documentsavelist: Application_Files[];
  imagepath: string = "";
  FK_ActiveStatusId: number = 0;
  Remarks: string = "";
  FormName: string = '';
  apptypetemplate: ApplicationTypeTemplate;
  apptypetemplatearr: any;
  FileExtension: string = "";
  formhtml: any;

  FileName: string = "";
  DoctypeId: number = -1;
  DocumentList: any = [];
  previousClick: boolean = false;
  str: string = "";
  Remarksforaaprovalorrejection: string = "Remarks";
  lstPaymentServices: PaymentServices[];
  lstFinesPayment: FinesPayment[];
  mapType: string = 'ReadyMap';
  mainlistGeoSpatialMaps: GeoSpatialMaps[];
  isCustomMap: boolean = false;
  listGeoSpatialMaps: GeoSpatialMaps[];
  secondlistGeoSpatialMaps: GeoSpatialMaps[];
  objGeoSpatialMaps: GeoSpatialMaps;
  City: string = ''
  Sector: string = ''
  District: string = ''
  MapLayer: string = ''
  MapSize: string = '0'
  pushGeoSpatialMaps: GeoSpatialMaps;
  GeoSpecialDataList: GeoSpatialMaps[];
  Base64: string = "";

  extention: string = "";

  constructor(public languageTranslateService: LanguageTranslateService, public GlobalVariableService: GlobalVariableService, private _svc: SharedServicesService, private router: Router, private sanitizer: DomSanitizer) {
    super(languageTranslateService);
    this.application = new Applications();
    this.applicationvalues = new ApplicationValues();
    this.applicationtype = new ApplicationType();
    this.ApplicationtypeDocuments = [];
    this.applicationvaluelist = [];
    this.documentsavelist = [];
    this.GlobalVariableService.bDisplayControls = false;
    this.objSaveFiles = new Application_Files();
    this.statusforradiobotton = [];
    this.apptypetemplate = new ApplicationTypeTemplate();
    this.apptypetemplatearr = [];

    this.DocumentList = [];
    this.objGeoSpatialMaps = new GeoSpatialMaps();
    this.listGeoSpatialMaps = [];
    this.secondlistGeoSpatialMaps = [];
    this.mainlistGeoSpatialMaps = [];
    this.pushGeoSpatialMaps = new GeoSpatialMaps();
    this.GeoSpecialDataList = [];

  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  @ViewChild('LoadDynamicControll', { static: true }) LoadDynamicControll: LoadDynamicControllComponent;
  public dataSource = new MatTableDataSource<any>();
  public displayedColumnss = ['Document Type Name', 'Document Extension', 'action']
  public displayedColumn = ['Decision Maker', 'Date Time', 'Current Status', 'action']
  public AuditHistoryLst = new MatTableDataSource<any>();
  public AuditHistoryColumns = ['User_FullName', 'AuditDateTime', 'StatusNameEn', 'action']

  ngOnInit() {
    //this should be at start
    
    if(this.GlobalVariableService.isStringNullOrEmplty(this.GlobalVariableService.parameterID)){
      this.GlobalVariableService.parameterID =   sessionStorage.getItem("parameterID")
     }
     if(this.GlobalVariableService.ApplicationTypeCategory == 0){
      this.GlobalVariableService.ApplicationTypeCategory = Number(sessionStorage.getItem("ApplicationTypeCategory"));
     }

    this.GlobalVariableService.IsappDetails = true;
    this.GlobalVariableService.glbApplciationTypePanels = [];
    this.GlobalVariableService.controllsApplicationTypeFields = [];
    this.ApplicationId = this.GlobalVariableService.Applicationid;



    setTimeout(() => {
      debugger;
      if (this.GlobalVariableService.isEn) {
        this.FormName = localStorage.getItem("BPPFromNameEn");
      }
      else {
        this.FormName = localStorage.getItem("BPPFromNameAr");
      }
      this.GlobalVariableService.GetAllPanelsByApplicationTypeId(Number(this.GlobalVariableService.parameterID),false);
      this.GlobalVariableService.GetAllFieldsByAppTypeId(Number(this.GlobalVariableService.parameterID),false);
      this.GetAllApplicationtypeDetail(Number(this.GlobalVariableService.parameterID));
      this.GetAllApplicationDocumenttype(Number(this.GlobalVariableService.parameterID));

      if (this.GlobalVariableService.AssignedApplication == true) {
       
        this.getFieldValuesByApptypeid();
        this.GetStatusForRadioButtons(Number(this.GlobalVariableService.objApplicationInfo.ApplicationId));
        this.GetApplicationDocumentDetails(this.GlobalVariableService.objApplicationInfo.ApplicationId);
      }
      else if (this.GlobalVariableService.isAllapplication) {

        this.getFieldValuesByApptypeid();
        this.GetApplicationDocumentDetails(this.GlobalVariableService.objApplicationInfo.ApplicationId);
        this.GetAuditLog(this.GlobalVariableService.objApplicationInfo.ApplicationId);
      }
      else if (this.GlobalVariableService.isApplicationHistory) {

        this.getFieldValuesByApptypeid();
        this.GetApplicationDocumentDetails(this.GlobalVariableService.objApplicationInfo.ApplicationId);
        this.GetAuditLog(this.GlobalVariableService.objApplicationInfo.ApplicationId);
      }
    }, 10);

    if (this.GlobalVariableService.ApplicationTypeCategory == 2) {
      if(this.GlobalVariableService.isAllapplication || this.GlobalVariableService.AssignedApplication)
      {
        this.GetPaymentServiceByAppId(this.GlobalVariableService.Applicationid)

      }
      else{
        this.GetAllPaymentService();

      }
      // this.GetPaymentServiceByAppId(this.GlobalVariableService.Applicationid)
    }
    if (this.GlobalVariableService.ApplicationTypeCategory == 3) {
      if (this.GlobalVariableService.isAllapplication || this.GlobalVariableService.AssignedApplication) {
        this.GetAllFinepaymentsByAppId(this.GlobalVariableService.Applicationid)
      }

      else {
        this.GetAllFinepayments();


      }
    }
    if (this.GlobalVariableService.ApplicationTypeCategory == 4) {
      this.objGeoSpatialMaps.MapType = 'ReadyMap';
      this.GetAllGeospatialMapsListByAppId(this.GlobalVariableService.Applicationid);
    }

  }



  start() {

   
    this.GlobalVariableService.glbApplciationTypePanels = [];
    this.GlobalVariableService.controllsApplicationTypeFields = [];


    setTimeout(() => {
     
      this.FormName = localStorage.getItem("BPPFromNameEn");
      this.GlobalVariableService.GetAllPanelsByApplicationTypeId(Number(this.GlobalVariableService.parameterID),false);
      this.GlobalVariableService.GetAllFieldsByAppTypeId(Number(this.GlobalVariableService.parameterID),false);
      this.GetAllApplicationtypeDetail(Number(this.GlobalVariableService.parameterID));
      this.GetAllApplicationDocumenttype(Number(this.GlobalVariableService.parameterID));

      if (this.GlobalVariableService.AssignedApplication == true) {

        this.getFieldValuesByApptypeid();
        this.GetStatusForRadioButtons(Number(this.GlobalVariableService.objApplicationInfo.ApplicationId));
        this.GetAuditLog(this.GlobalVariableService.objApplicationInfo.ApplicationId);
      }
      else if (this.GlobalVariableService.isAllapplication) {

        this.getFieldValuesByApptypeid();
        this.GetApplicationDocumentDetails(this.GlobalVariableService.objApplicationInfo.ApplicationId);
        this.GetAuditLog(this.GlobalVariableService.objApplicationInfo.ApplicationId);
      }
      else if (this.GlobalVariableService.isApplicationHistory) {
        this.getFieldValuesByApptypeid();
        this.GetStatusForRadioButtons(Number(this.GlobalVariableService.objApplicationInfo.ApplicationId));
        this.GetAuditLog(this.GlobalVariableService.objApplicationInfo.ApplicationId);
      }
      setTimeout(() => {
        this.loadControll();
      }, 2000);
    }, 25);

    if (this.previousClick) {
      setTimeout(() => {

        if (this.applicationvaluelist.length > 0) {
          // setTimeout(() => {
          for (var i = 0; i < this.applicationvaluelist.length; i++) {
            var Control = this.applicationvaluelist[i].FK_FieldId;
            if (!this.GlobalVariableService.isNumberNullOrEmplty(Control)) {
              $('#' + Control).val(this.applicationvaluelist[i].Value);
            }
          }
        }
      }, 100);
    }
    if (this.applicationvaluelist.length > 0) {
      for (var i = 0; i < this.applicationvaluelist.length; i++) {
        var Control = this.applicationvaluelist[i].FK_FieldId;
        if (!this.GlobalVariableService.isNumberNullOrEmplty(Control)) {
          $('#' + Control).val(this.applicationvaluelist[i].Value);
        }
      }
    }

  }
  loadControll() {
   debugger;
    if (this.GlobalVariableService.isAllapplication || this.GlobalVariableService.AssignedApplication || this.GlobalVariableService.isApplicationHistory) {
      for (var i = 0; i < this.GlobalVariableService.ApplicationValues.length; i++) {
        var Control = this.GlobalVariableService.ApplicationValues[i].FK_FieldId;
        if (!this.GlobalVariableService.isNumberNullOrEmplty(Control)) {
          
          if (this.GlobalVariableService.ApplicationValues[i].FK_FieldType == 8) {
            var val = this.GlobalVariableService.ApplicationValues[i].Value;
            $("#" + val).prop('checked', true);
            this.GlobalVariableService.Showhidepanel(this.GlobalVariableService.ApplicationValues[i].Value,this.GlobalVariableService.ApplicationValues[i].FK_FieldId,false)

          }
          else if (this.GlobalVariableService.ApplicationValues[i].FK_FieldType == 9) {
            var value = this.GlobalVariableService.ApplicationValues[i].Value.split(",");
            for (var s = 0; s < value.length; s++) {
              $("#" + value[s]).attr('checked', true);

            }
          }
          else if (this.GlobalVariableService.ApplicationValues[i].FK_FieldType == 19) {
           
            var hasData = this.GlobalVariableService.DynamicDataTable.filter(x => x.id == Control)
            if (hasData.length > 0) {
              for (var data = 0; data < this.GlobalVariableService.DynamicDataTable.length; data++) {
                if (this.GlobalVariableService.DynamicDataTable[data].id == Control) {
                  var val = this.GlobalVariableService.ApplicationValues[i].Value;
                  this.GlobalVariableService.DynamicDataTable[data].Datatable = JSON.parse(val);
                }
              }
            }
          }
          else if (this.GlobalVariableService.ApplicationValues[i].FK_FieldType == 6) {
            $('#' + Control).val(this.GlobalVariableService.ApplicationValues[i].Value);
          }
          else if (this.GlobalVariableService.ApplicationValues[i].FK_FieldType == 20) {
            //binding datas 
            var hasData = this.GlobalVariableService.listRepeaterData.filter(x=> x.id == Control)
            if(hasData.length> 0){
              for (var data= 0 ; data< this.GlobalVariableService.listRepeaterData.length ; data++ ){
                if(this.GlobalVariableService.listRepeaterData[data].id == Control){
                  var val = this.GlobalVariableService.ApplicationValues[i].Value;
                  this.GlobalVariableService.listRepeaterData[data].Datatable = JSON.parse(val);
                }
              }
            }
          }
          else if(this.GlobalVariableService.ApplicationValues[i].FK_FieldType == 18){
            
           this.GlobalVariableService.controllsApplicationTypeFields.filter(h => h.FieldId == Control)[0].DefaultValue = this.GlobalVariableService.ApplicationValues[i].Value;
          }
          else if(this.GlobalVariableService.ApplicationValues[i].FK_FieldType == 13){

          }

          else {
            $('#' + Control).val(this.GlobalVariableService.ApplicationValues[i].Value);
          }
        }
      }
    }
  }
  ngAfterViewInit() {

    setTimeout(() => {
      this.loadControll();
    }, 2000);
  }
  CreateApplication() {
   
    if (this.GlobalVariableService.ApplicationTypeCategory == 1) {
     
      if (this.applicationvaluelist.length == 0) {
        this.saveData();
      }
      if (this.str != "") {
        this.GlobalVariableService.openDialog("Application Detail", "Please Fill the mentioned Fields. " + this.str)
      }
      else {
        if (this.GlobalVariableService.AssignedApplication) {
          var a = JSON.parse(localStorage.getItem("BPPobjlogin"));
          var UpdateStatus = {
            ApplicationId: this.GlobalVariableService.Applicationid,
            FK_ActiveStatus: this.FK_ActiveStatusId,
            Remarks: this.Remarks,
            LAST_UPDATED_BY: a.UserName,
            Applicant_Id: a.ID
          }
          this._svc.UpdateStatusAndRemarks(UpdateStatus, 'Application/UpdateStatusAndRemarks').subscribe(
            data => {
              this.ApplicationId = Number(data.split(':')[1]);
              this.SaveApplication();
            });
        }
        else {
          if (this.GlobalVariableService.ApplicationValues == null || this.GlobalVariableService.ApplicationValues == undefined || this.GlobalVariableService.ApplicationValues == [] || this.GlobalVariableService.ApplicationValues.length == 0) {
            var a = JSON.parse(localStorage.getItem("BPPobjlogin"));
            this.application.Applicant_Id = a.ID;
            this.application.FK_ApplicationTypeId = Number(this.GlobalVariableService.parameterID);
            this.application.ApplicationNo = this.applicationtype.ApplicationNoAbbreviation;
            this.application.FK_ActiveStatus = 1;
            this.application.StartDate = '';
            this.application.CREATED_BY = a.UserName;

            this._svc.CreateApplication(this.application, 'Application/CreateApplication').subscribe(
              data => {
                this.ApplicationId = Number(data.split(':')[1]);
                this.SaveApplication();
              });
          }
          else {
            this.SaveApplication();
          }
        }
      }
    }
    else {
      var a = JSON.parse(localStorage.getItem("BPPobjlogin"));
      var s = localStorage.getItem("BPPuserPrevillege");
      this.application.Applicant_Id = '25';
      this.application.ApplicationId = 0;
      this.application.FK_ApplicationTypeId = Number(this.GlobalVariableService.parameterID);
      this.application.FK_ActiveStatus = 1;
      this.application.StartDate = '';
      this.application.Remarks = this.Remarks;
      if(this.GlobalVariableService.isAllapplication||this.GlobalVariableService.AssignedApplication)
      {
        if (this.GlobalVariableService.ApplicationTypeCategory == 2) {
          var x = this.lstPaymentServices.filter(x => x.selected == true)
          if (x.length > 0) {
            this.SavePaymentServices();
          }
          else{
            this.GlobalVariableService.openDialog('Application Detail','Please select any record');
          }
        }
        else if (this.GlobalVariableService.ApplicationTypeCategory == 3) {
          var y = this.lstFinesPayment.filter(x => x.selected == true)
          if (y.length > 0) {
            this.SaveFinesPayment();
          }
          else{
            this.GlobalVariableService.openDialog('Application Detail','Please select any record');
          }
        }
        else if (this.GlobalVariableService.ApplicationTypeCategory == 4) {        
          var UpdateStatus = {
            ApplicationId: this.GlobalVariableService.Applicationid,
            FK_ActiveStatus: this.FK_ActiveStatusId,
            Remarks: this.Remarks,
            LAST_UPDATED_BY: a.UserName,
            Applicant_Id: a.ID
          }
          this._svc.UpdateStatusAndRemarks(UpdateStatus, 'Application/UpdateStatusAndRemarks').subscribe(
            data => {
              this.SaveGeoSpecialMaps();
            });
        }

      }
      else{
        var Hasseleted = ""
        if (this.GlobalVariableService.ApplicationTypeCategory == 2) {
          var x = this.lstPaymentServices.filter(x => x.selected == true)
          if (x.length > 0) {
            Hasseleted = "true";
          }
        }
        else if (this.GlobalVariableService.ApplicationTypeCategory == 3) {
          var y = this.lstFinesPayment.filter(x => x.selected == true)
          if (y.length > 0) {
            Hasseleted = "true";
          }
        }
        else if (this.GlobalVariableService.ApplicationTypeCategory == 4) {
          if (this.mainlistGeoSpatialMaps.length > 0) {
            Hasseleted = "true";
          }
        }
        if(Hasseleted=='true')
        {
          this._svc.CreateApplication(this.application, 'Application/CreateApplication').subscribe(
            data => {
              this.ApplicationId = Number(data.split(':')[1]);
              if (this.GlobalVariableService.ApplicationTypeCategory == 2) {
                var x = this.lstPaymentServices.filter(x => x.selected == true)
                if (x.length > 0) {
                  this.SavePaymentServices();
                }
                else{
                  this.GlobalVariableService.openDialog('Application Detail','Please select any record');
                }
              }
              else if (this.GlobalVariableService.ApplicationTypeCategory == 3) {
                var y = this.lstFinesPayment.filter(x => x.selected == true)
                if (y.length > 0) {
                  this.SaveFinesPayment();
                }
                else{
                  this.GlobalVariableService.openDialog('Application Detail','Please select any record');
                }
              }
              else if (this.GlobalVariableService.ApplicationTypeCategory == 4) {
                this.SaveGeoSpecialMaps();

              }
            });
        }
        else{
          this.GlobalVariableService.openDialog('Application Detail','Please select any record');

        }
        //     this._svc.CreateApplication(this.application, 'Application/CreateApplication').subscribe(
        //       data => {
        //
        //         this.ApplicationId = Number(data.split(':')[1]);
        //         if (this.GlobalVariableService.ApplicationTypeCategory == 2) { var x = this.lstPaymentServices.filter(x => x.selected == true)
        //           if (x.length > 0) {
        //           this.SavePaymentServices();
        //           }
        //           else{
        //             this.GlobalVariableService.openDialog('Application Detail','Please select any record');
        //           }
        //         }
        //         else if (this.GlobalVariableService.ApplicationTypeCategory == 3) { var y = this.lstFinesPayment.filter(x => x.selected == true)
        //           if (y.length > 0) {
        //           this.SaveFinesPayment();
        //           }
        //           else{
        //             this.GlobalVariableService.openDialog('Application Detail','Please select any record');
        //           }
        //         }
        //         else if (this.GlobalVariableService.ApplicationTypeCategory == 4) {
        //           this.SaveGeoSpecialMaps();
        //         }
        //       });
      }
    }


  }


  checkIsMendatory() {

    this.str = "";
    var mendatoryFieldOther = this.GlobalVariableService.controllsApplicationTypeFields.filter(x => x.IsMandatory == true && x.FK_FieldType != 6
      && x.FK_FieldType != 8
      && x.FK_FieldType != 9)
    for (var i = 0; i < mendatoryFieldOther.length; i++) {
      var x = this.applicationvaluelist.filter(x => x.FK_FieldId == mendatoryFieldOther[i].FieldId)
      if (x.length == 0) {
        this.str = this.str + ", " + mendatoryFieldOther[i].FieldCaption;
      }
    }

    var mendatoryList = this.GlobalVariableService.controllsApplicationTypeFields.filter(x => x.IsMandatory == true
      && (x.FK_FieldType == 6 || x.FK_FieldType == 8 || x.FK_FieldType == 9))
    for (var i = 0; i < mendatoryList.length; i++) {

      //For Radio
      if (mendatoryList[i].FK_FieldType == 8) {
        var checkbox = this.GlobalVariableService.listSelectData.filter(x => x.id == mendatoryList[i].FieldId)
        for (var c = 0; c < checkbox.length; c++) {
          if (mendatoryList[i].FieldId = checkbox[c].id) {
            var x = this.applicationvaluelist.filter(x => x.FK_FieldId == checkbox[c].id)
            if (x.length == 0) {
              this.str = this.str + ", " + mendatoryList[i].FieldCaption;
            }
          }
        }
      }

      //For check box
      if (mendatoryList[i].FK_FieldType == 9) {
        var Radiolist = this.GlobalVariableService.listSelectData.filter(x => x.id == mendatoryList[i].FieldId)
        for (var c = 0; c < Radiolist.length; c++) {
          if (mendatoryList[i].FieldId = Radiolist[c].id) {
            var x = this.applicationvaluelist.filter(x => x.FK_FieldId == Radiolist[c].id)
            if (x.length == 0) {
              this.str = this.str + ", " + mendatoryList[i].FieldCaption;
            }
          }
        }
      }

      //for list
      if (mendatoryList[i].FK_FieldType == 6) {
        var selectList = this.applicationvaluelist.filter(x => x.FK_FieldId == mendatoryList[i].FieldId)
      }
    }
  }

  saveData() {
    
    for (var i = 0; i < this.GlobalVariableService.controllsApplicationTypeFields.length; i++) {
      if (this.GlobalVariableService.controllsApplicationTypeFields[i].FK_FieldType == 8) {

        var fieldid = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId.toString();
        var Caption = $("input[name='" + fieldid + "']:checked").val();
        var FieldId = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId;
        if (!this.GlobalVariableService.isStringNullOrEmplty(Caption) && !this.GlobalVariableService.isNumberNullOrEmplty(FieldId)) {
          this.pushData(FieldId, Caption);
        }
      }
      else if (this.GlobalVariableService.controllsApplicationTypeFields[i].FK_FieldType == 9) {
        var checkboxData = '';
        for (let k = 0; k < this.GlobalVariableService.listSelectData.length; k++) {
          if (this.GlobalVariableService.listSelectData[k].id == this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId) {
            for (var list = 0; list < this.GlobalVariableService.listSelectData[k].FieldListItems.length; list++) {

              var ItmId = this.GlobalVariableService.listSelectData[k].FieldListItems[list].ItemId;
              var fieldid = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId.toString();
              if ($('#' + ItmId).is(":checked")) {
                if (checkboxData == "") {
                  checkboxData = "" + ItmId;
                }
                else {
                  checkboxData = checkboxData + "," + ItmId;
                }
              }
            }
          }
        }
        if (!this.GlobalVariableService.isStringNullOrEmplty(checkboxData) && !this.GlobalVariableService.isNumberNullOrEmplty(FieldId)) {
          var FieldId = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId;
          this.pushData(FieldId, checkboxData);
        }

      }
      else if (this.GlobalVariableService.controllsApplicationTypeFields[i].FK_FieldType == 19) {
        //table 
        for (var tbl = 0; tbl < this.GlobalVariableService.DynamicDataTable.length; tbl++) {
          if (this.GlobalVariableService.DynamicDataTable[tbl].id == this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId) {
            var FieldId = this.GlobalVariableService.DynamicDataTable[tbl].id;
            var tblId = this.GlobalVariableService.DynamicDataTable[tbl].id;
            var ColumnName = this.GlobalVariableService.DynamicDataTable[tbl].ColumnName;
            var datatable = this.GlobalVariableService.DynamicDataTable[tbl].Datatable;
            var selectedrec: any = [];
            $('#' + tblId + ' tbody>tr').each(function (i, row) {
              var $row = $(row),
                $check = $row.find('input:checked');
              if ($check.length == 1) {
                var a = datatable[i];
                selectedrec.push(datatable[i]);
              }
            });
            this.pushData(FieldId, JSON.stringify(selectedrec));
            // console.log(selectedrec);
          }
        }
      }
      else if (this.GlobalVariableService.controllsApplicationTypeFields[i].FK_FieldType == 20) {
        var filter = this.GlobalVariableService.listRepeaterData.filter(x => x.id == this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId)[0]
        this.pushData(filter.id, JSON.stringify(filter.Datatable));
      }
      else if (this.GlobalVariableService.controllsApplicationTypeFields[i].FK_FieldType == 6) {
            var fieldid = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId.toString();
            var Caption = $('#' + fieldid).val();
            var FieldId = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId;
            var selectedval = $("#" + fieldid).text();
            this.GlobalVariableService.controllsApplicationTypeFields[i].DefaultValue = selectedval;

            var Dropdowm = this.GlobalVariableService.listSelectData.filter(x => x.id == FieldId)
            if (Dropdowm.length > 0) {
              var Dropdowmlist;
              if (this.GlobalVariableService.isEn) {
                Dropdowmlist = Dropdowm[0].FieldListItems.filter(x => x.FieldText == selectedval)
              } else {
                Dropdowmlist = Dropdowm[0].FieldListItems.filter(x => x.FieldTextAr.trim() == selectedval.trim())
              }

              if (Dropdowmlist.length > 0) {
                Caption = Dropdowmlist[0].ItemId;
              }
            }
            if (!(this.GlobalVariableService.isStringNullOrEmplty(Caption) || this.GlobalVariableService.isNumberNullOrEmplty(FieldId))) {
              this.pushData(FieldId, Caption);
            }

        ////////////////////
      }
      else if(this.GlobalVariableService.controllsApplicationTypeFields[i].FK_FieldType == 18){
         var Caption  = this.GlobalVariableService.controllsApplicationTypeFields[i].DefaultValue;
         var FieldId  = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId;
         if (!this.GlobalVariableService.isStringNullOrEmplty(Caption) && !this.GlobalVariableService.isNumberNullOrEmplty(FieldId)) {
          this.pushData(FieldId, Caption);
        }
      }
      else {
        var fieldid = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId.toString();
        var Caption = $('#' + fieldid).val();
        var FieldId = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId;
        if (!this.GlobalVariableService.isStringNullOrEmplty(Caption) && !this.GlobalVariableService.isNumberNullOrEmplty(FieldId)) {
          this.pushData(FieldId, Caption);
        }
      }
    }
  }
  pushData(FK_FieldId: number, Caption: string) {
    this.applicationvalues = new ApplicationValues();
    this.applicationvalues.ApplicationValuesID = 0;
    this.applicationvalues.FK_FieldId = FK_FieldId;
    this.applicationvalues.Value = Caption;
    var x = this.applicationvaluelist.filter(x => x.FK_FieldId == FK_FieldId)
    if (x.length == 0) {
      this.applicationvaluelist.push(this.applicationvalues);
    }
  }

  SaveApplication() {
    for (var j = 0; j < this.applicationvaluelist.length; j++) {
      this.applicationvaluelist[j].FK_ApplicationId = this.ApplicationId;
      var a = this.GlobalVariableService.ApplicationValues.filter(a => a.FK_FieldId == this.applicationvaluelist[j].FK_FieldId)

      if (a.length == 0) {
        this.applicationvaluelist[j].ApplicationValuesID = 0;
      }
      else {
        this.applicationvaluelist[j].ApplicationValuesID = a[0].ApplicationValuesID;
        this.applicationvaluelist[j].FK_ApplicationId = a[0].FK_ApplicationId;
      }

    }
    this._svc.SaveApplicationValues(this.applicationvaluelist, 'DynamicForm/SaveApplicationValues').subscribe(
      data => {
        this.SaveDocumentFile();
      });
  }
  SaveDocumentFile() {
    if (this.DocumentList.length > 0) {
      for (var i = 0; i < this.DocumentList.length; i++) {
        if (this.DocumentList[i].Image == "" || this.DocumentList[i].Image == undefined || this.DocumentList[i].Image == null) {
        }
        else {
          this.DocumentList[i].FK_ApplicationId = this.ApplicationId;
        }
      }
      this._svc.SaveDocumentFiles(this.DocumentList, 'Application/SaveApplicationDocuments').subscribe(
        data => {
          
          var myurl;
          if (this.GlobalVariableService.AssignedApplication) {
            myurl = `${'AssignedApplication'}/${''}`;
          }
          else {
            myurl = `${'MyApplications'}/${''}`;
          }
          const that = this;
          that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            that.router.navigate([myurl])
          ), (err) => {
            this.GlobalVariableService.openDialog("Application Detail", "Some Error Occured While Saving")
          };
        }, (err) => {
          this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured while Getting All Application Type Detail.")
        });
    }
    else {

      var myurl;
      if (this.GlobalVariableService.AssignedApplication) {
        myurl = `${'AssignedApplication'}/${''}`;
      }
      else {
        myurl = `${'MyApplications'}/${''}`;
      }
      const that = this;
      that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        that.router.navigate([myurl])

      )
    }
  }
  GetAllApplicationtypeDetail(parameterID: number) {
    // this.GlobalVariableService.blockUI.start();
    this._svc.getGenericParmas(parameterID, "id", 'ApplicationType/GetApplicationTypebyId').subscribe(
      data => {
        // this.GlobalVariableService.blockUI.stop();
        this.applicationtype = data;
        // this.GlobalVariableService.ApplicationTypeCategory=this.applicationtype.ApplicationTypeCategory;
      }, (err) => {
        //  this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured while Getting All Application Type Detail.")
      });
  }
  selectData(ApplicationFileId: number) {


  }


  GetAllApplicationDocumenttype(parameterID: number) {
    this._svc.getGenericParmas(parameterID, "id", 'ApplicationType/GetAllApplicationTypeDocumentsByApptypeid').subscribe(
      data => {
       
        this.ApplicationtypeDocuments = data;

      }, (err) => {
        this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured while Getting All Application Type Detail.")
      });

  }

  handleInputChange(e, id: any = '') {
    
    // var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
   
    //var reader = new FileReader();
    // if (!file.type.match(pattern)) {
    //   alert('invalid format');
    //   return;
    // }
    let me = this;
    let file = e.target.files[0];
    this.FileName = file.name;
    this.FileExtension = this.FileName.split('.')[1];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = this._handleReaderLoaded.bind(this, id);
    // reader.readAsDataURL(e.target.files[0]);
  }
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + this.imagepath);//data:image/jpg;base64, 
  }
  _handleReaderLoaded(id: any, e) {
    
    let reader = e.target;
    this.imageSrc = reader.result;
    this.objSaveFiles.Image = reader.result;
    this.imagepath = this.objSaveFiles.Image.replace('data:image/png;base64,', '');
    this.transform();
    var item = this.secondlistGeoSpatialMaps.filter(a => a.GeoMapId == id)
    if (item == null || item == undefined || item.length == 0) {
      var item1 = this.listGeoSpatialMaps.filter(b => b.GeoMapId == id)
      item1.filter(c => c.UploadedMap = this.imagepath);

    }
    else {
      item.filter(c => c.UploadedMap = this.imagepath);
    }
    var a = this.GlobalVariableService.controllsApplicationTypeFields;
    this.GlobalVariableService.controllsApplicationTypeFields = [];
    this.GlobalVariableService.controllsApplicationTypeFields = a;
  }
  adddocumentinlist() {
   
    var a = this.objSaveFiles.FK_ApplicationType_DocumentId;
    this.objSaveFiles.ApplicationFileId = 0;
    this.objSaveFiles.FK_ApplicationId = this.ApplicationId;
    this.objSaveFiles.FK_ApplicationType_DocumentId = this.objSaveFiles.FK_ApplicationType_DocumentId;
    this.objSaveFiles.Image = this.imageSrc;
    // this.FileName = this.objSaveFiles.DocumentTypeName;
    var i = this.ApplicationtypeDocuments.filter(x => x.DocumentTypeId == this.DoctypeId)[0];
    this.objSaveFiles.DocumentTypeName = this.FileName.split('.')[0];
    this.objSaveFiles.FK_ApplicationType_DocumentId = i.DocumentTypeId;
    
    this.DocumentList.push({
      // ApplicationFileId: this.documentsavelist[i].ApplicationFileId,
      // FileName: this.documentsavelist[i].FileName,
      // DocumentTypeName: this.documentsavelist[i].DocumentTypeName,
      // DocumentExtension: this.documentsavelist[i].FileExtension,
      // action: ""
      ApplicationFileId: 0,
      FK_ApplicationId: this.objSaveFiles.FK_ApplicationId,
      DocumentExtension: this.FileExtension,
      DocumentTypeName: this.objSaveFiles.DocumentTypeName,
      Image: this.objSaveFiles.Image
    })


    this.dataSource.data = [];
    this.dataSource.data = this.DocumentList;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.pushdocfile(this.objSaveFiles.ApplicationFileId, this.ApplicationId, a, this.imageSrc);
  }
  getFieldValuesByApptypeid() {
    this.GlobalVariableService.getFieldValuesByApptypeid();
  }
  GetStatusForRadioButtons(paramterID: number) {

    this._svc.getGenericParmas(paramterID, "ApplicationId", 'Application/GetStatusForRadioButton').subscribe(
      data => {

        this.statusforradiobotton = data;

        var a = this.statusforradiobotton;
        this.statusforradiobotton = [];
        for (var i = 0; i < a.length; i++) {
          if (a[i].StatusId != 0) {
            this.statusforradiobotton.push(a[i]);
          }
        }

      }, (err) => {
        this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured while Getting All Application Type Detail.")
      });
  }
  GetApplicationDocumentDetails(id: number) {
    this._svc.getGenericParmas(id, "AppId", 'Application/GetApplicationDocumentDetails').subscribe(
      data => {
       
        this.DocumentList = [];
        this.documentsavelist = data;

        for (let i = 0; i < this.documentsavelist.length; i++) {
          this.DocumentList.push({
            ApplicationFileId: this.documentsavelist[i].ApplicationFileId,
            FileName: this.documentsavelist[i].FileName,
            DocumentTypeName: this.documentsavelist[i].FileName,
            DocumentExtension: this.documentsavelist[i].FileExtension,
            action: ""
          });
        }
        this.dataSource.data = this.DocumentList;
        // this.DocumentList=[];

      }, (err) => {
        this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured while Getting All Application Type Detail.")
      });

  }
  GetAuditLog(ApplicationId: number) {

    this._svc.getGenericParmas(ApplicationId, "ApplicationId", 'Application/GetAuditLog').subscribe(
      data => {
        //   this.statusforradiobotton = data;
        this.AuditHistoryLst = data;
      }, (err) => {
        this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured while Getting All Application Type Detail.")
      });
  }
  onItemChange(value, Name) {

    this.FK_ActiveStatusId = value;
    if (Name.includes("Reject")) {
      this.Remarksforaaprovalorrejection = "Rejection Reason";
    }
    else {
      this.Remarksforaaprovalorrejection = "Remarks";
    }
    {


    }
  }
  Downloadtemp() {

    let doc = new jsPDF('p', 'pt', 'a4', true);
    doc.fromHTML(this.formhtml, 15, 15, {
      'width': 500
    }, function (dispose) {
      doc.save('thisMotion.pdf');
    });
  }
  DownloadTempalte() {

    var applicationtypeid = this.GlobalVariableService.parameterID;
    this._svc.getGenericParmas(applicationtypeid, "FK_ApplicationTypeId", 'ApplicationType/GetTemplateByApplicationTypeId').subscribe(
      data => {

        // this.statusforradiobotton = data;
        this.apptypetemplate = data;
        var lang = localStorage.getItem("language");
        if (lang == "en") {
          this.formhtml = this.apptypetemplate[0].TemplateEn;
        }
        else {
          this.formhtml = this.apptypetemplate[0].TemplateAr;
        }
        // var avlues= this.GlobalVariableService.ApplicationValues;

        for (let i = 0; i < this.GlobalVariableService.controllsApplicationTypeFields.length; i++) {
          var fieldValues = this.GlobalVariableService.ApplicationValues.filter(a => a.FK_FieldId == this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId);
          if (fieldValues.length != 0) {
            this.apptypetemplatearr.push({ FieldId: fieldValues[0].FK_FieldId, Name: this.GlobalVariableService.controllsApplicationTypeFields[i].FieldCaption, Value: fieldValues[0].Value })
          }

        }
        for (let i = 0; i < this.apptypetemplatearr.length; i++) {

          this.formhtml = this.formhtml.replace('{{' + this.apptypetemplatearr[i].Name + '}}', this.apptypetemplatearr[i].Value)


        }
        this.Downloadtemp();



      }, (err) => {
        this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured while Getting All Application Type Detail.")
      });


  }
  DownloadDocument(id: any) {
   
    var r = id;
    this._svc.getGenericParmas(id, "ApplicationFileId", 'Application/DownloadApplicationDocument').subscribe(
      data => {
       
        //  var DownloadedDocuments = data;

        this.Base64 = data.split(",");
        var FileNamee = this.Base64[1].split(',');
        var Extention = this.Base64[2].split(',').toString();

        if (Extention == "PDF" || Extention == "pdf" ) {

          const linkSource = 'data:application/pdf;base64,' + this.Base64[0];
          const downloadLink = document.createElement("a");
          const fileName = FileNamee[0] + ".pdf";

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }
        else if(Extention.toUpperCase() == "PNG" || Extention.toUpperCase() == "JPG" ) {

          const linkSource = 'data:application/pdf;base64,' + this.Base64[0];
          const downloadLink = document.createElement("a");
          const fileName = FileNamee[0] + "." + Extention;

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }
        else if (Extention.includes("Word")) {
          if (this.Base64[0]) {
            var blob = this.base64ToBlob(this.Base64[0], 'text/plain');
            saveAs(blob, this.FileName + ".doc");
          }
          // var URL = 'http://localhost:10248/ReportsDoc/'+this.FileName+'.doc';

          // window.open(URL, null);  
        }
        else {
          if (this.Base64[0]) {
            var blob = this.base64ToBlob(this.Base64[0], 'text/plain');
            saveAs(blob, this.FileName + ".xls");
          }

        }
        // this.servicePayment = new MatTableDataSource<PaymentServices>(this.lstPaymentServices);
      }, (err) => {
      });

  }

  public base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
    //b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  GetPaymentServiceByAppId(id: any) {
    this._svc.getGenericParmas(id, "id", 'Application/GetAllPaymentServicesByApplicationId').subscribe(
      data => {
       
        this.lstPaymentServices = data;
        for (var i = 0; i < this.lstPaymentServices.length; i++) {
          this.lstPaymentServices[i].selected = false;
        }
        this.servicePayment = new MatTableDataSource<PaymentServices>(this.lstPaymentServices);
      }, (err) => {
      });

  }
  GetAllPaymentService() {
   
    this._svc.getGenericParmas("re", "EidNo", 'AjmanApi/Get_Individual_Pending_Payment_Application').subscribe(
      data => {
       
        this.lstPaymentServices = data;
        for (var i = 0; i < this.lstPaymentServices.length; i++) {
          this.lstPaymentServices[i].selected = false;
        }
        this.servicePayment.data = this.lstPaymentServices;
        this.servicePayment.sort = this.sortservicePayment;
        this.servicePayment.paginator = this.paginatorservicePayment;
        // this.servicePayment = new MatTableDataSource<PaymentServices>(this.lstPaymentServices);
      }, (err) => {
      });


  }



  SavePaymentServices() {
   
    var UserId = localStorage.getItem("BPPUserName");
    if (this.GlobalVariableService.isAllapplication || this.GlobalVariableService.AssignedApplication) {
      this._svc.SavePaymentServices(this.lstPaymentServices, 'Application/SavePaymentServices').subscribe(
        data => {
          this.GlobalVariableService.openDialog("SavePaymentServices", "Application has been saved successfully")
          if (this.GlobalVariableService.AssignedApplication) {
            // this.router.navigateByUrl('/AssignedApplication');
            var myurl = `${"AssignedApplication"}/${''}`;
            const that = this;
            that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              that.router.navigate([myurl]));
          }
          else {
            // this.router.navigateByUrl('/AssignedApplication');
            var myurl = `${"ReviewApplications"}/${''}`;
            const that = this;
            that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              that.router.navigate([myurl]));

          }
        }, (err) => {
          alert("Some Errors occured while saving application.");
        });
    }

    else if (!this.GlobalVariableService.isAllapplication || !this.GlobalVariableService.AssignedApplication) {
      var a = this.lstPaymentServices.filter(x => x.selected == true)

      if (a.length > 0) {
        if (a.length > 0) {
          for (var i = 0; i < a.length; i++) {
            a[i].PaymentServiceId = 0
          }
        }
        for (var j = 0; j < a.length; j++) {

          a[j].FK_ApplicationId = this.ApplicationId;
          a[j].CreatedBy = UserId;
          a[j].LastUpdatedBy = UserId;
        }
        this._svc.SavePaymentServices(a, 'Application/SavePaymentServices').subscribe(
          data => {
            this.GlobalVariableService.openDialog("SavePaymentServices", "Application has been saved successfully")
            // swal({
            //   title: 'Application',
            //   imageUrl: "./assets/images/logo.png",
            //   imageWidth: 100,
            //   imageHeight: 100,
            //   text: "Application has been saved successfully.",
            //   position: 'bottom-right',
            //   confirmButtonColor: '#3085d6',
            // }).then(function () {
            // })
            if (this.GlobalVariableService.AssignedApplication) {
              // this.router.navigateByUrl('/AssignedApplication');
              var myurl = `${"AssignedApplication"}/${''}`;
              const that = this;
              that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                that.router.navigate([myurl]));
            }
            else {
              // this.router.navigateByUrl('/AssignedApplication');
              var myurl = `${"ReviewApplications"}/${''}`;
              const that = this;
              that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                that.router.navigate([myurl]));

            }
          }, (err) => {
            alert("Some Errors occured while saving application.");
          });
      }
    }
    else {
      this.GlobalVariableService.openDialog("SavePaymentServices", "Please select any record.")
      // swal({
      //   title: 'Application',
      //   imageUrl: "./assets/images/logo.png",
      //   imageWidth: 100,
      //   imageHeight: 100,
      //   text: "Please select any record.",
      //   position: 'bottom-right',
      //   confirmButtonColor: '#3085d6',
      // }).then(function () {
      // })
    }

  }
  GetAllFinepayments() {
    this._svc.getGenericParmas("re", "EidNo", 'AjmanApi/Get_Individual_Fines').subscribe(
      data => {
        this.lstFinesPayment = data;
        for (var i = 0; i < this.lstFinesPayment.length; i++) {
          this.lstFinesPayment[i].selected = false;
        }
        this.finepayment.data = this.lstFinesPayment;
        this.finepayment.sort = this.sortfinePayment;
        this.finepayment.paginator = this.paginatorfinePayment;
        // this.finepayment = new MatTableDataSource<FinesPayment>(this.lstFinesPayment);
      }, (err) => {
      });

  }
  GetAllFinepaymentsByAppId(id: any) {
    this._svc.getGenericParmas(id, "id", 'Application/GetAllFinesPaymentsbyApplicationId').subscribe(
      data => {
        this.lstFinesPayment = data;
        for (var i = 0; i < this.lstFinesPayment.length; i++) {
          this.lstFinesPayment[i].selected = false;
        }
        this.finepayment = new MatTableDataSource<FinesPayment>(this.lstFinesPayment);
      }, (err) => {
      });

  }
  SaveFinesPayment() {
    var UserId = localStorage.getItem("BPPUserName");
    if (this.GlobalVariableService.isAllapplication || this.GlobalVariableService.AssignedApplication) {
      this._svc.SaveFinesPayment(this.lstFinesPayment, 'Application/SaveFinesPayment').subscribe(
        data => {
          this.GlobalVariableService.openDialog("SaveFinesPayment", "Application has been saved successfully.")
          if (this.GlobalVariableService.AssignedApplication) {
            // this.router.navigateByUrl('/AssignedApplication');
            var myurl = `${"AssignedApplication"}/${''}`;
            const that = this;
            that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              that.router.navigate([myurl]));
          }
          else {
            // this.router.navigateByUrl('/AssignedApplication');
            var myurl = `${"ReviewApplications"}/${''}`;
            const that = this;
            that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              that.router.navigate([myurl]));

          }

        }, (err) => {
          alert("Some Errors occured while saving application.");
        });








    }
    else if (!this.GlobalVariableService.isAllapplication || !this.GlobalVariableService.AssignedApplication) {
      var a = this.lstFinesPayment.filter(x => x.selected == true)
      if (a.length > 0) {
        for (var i = 0; i < a.length; i++) {
          a[i].FinesPaymentId = 0
        }

        for (var j = 0; j < a.length; j++) {
          a[j].FK_ApplicationId = this.ApplicationId;
          a[j].CreatedBy = UserId;
          a[j].LastUpdatedBy = UserId;
        }
        this._svc.SaveFinesPayment(a, 'Application/SaveFinesPayment').subscribe(
          data => {
            this.GlobalVariableService.openDialog("SaveFinesPayment", "Application has been saved successfully.")
            if (this.GlobalVariableService.AssignedApplication) {
              // this.router.navigateByUrl('/AssignedApplication');
              var myurl = `${"AssignedApplication"}/${''}`;
              const that = this;
              that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                that.router.navigate([myurl]));
            }
            else {
              // this.router.navigateByUrl('/AssignedApplication');
              var myurl = `${"ReviewApplications"}/${''}`;
              const that = this;
              that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                that.router.navigate([myurl]));

            }

          }, (err) => {
            alert("Some Errors occured while saving application.");
          });
      }
    }

    else {
      this.GlobalVariableService.openDialog("SaveFinesPayment", "Please select any record.")
      // swal({
      //   title: 'Application',
      //   imageUrl: "./assets/images/logo.png",
      //   imageWidth: 100,
      //   imageHeight: 100,
      //   text: "Please select any record.",
      //   position: 'bottom-right',
      //   confirmButtonColor: '#3085d6',
      // }).then(function () {
      // })
    }
  }
  SelectservicePayment(id: any) {

   
    for (var i = 0; i < this.lstPaymentServices.length; i++) {
      if (id == this.lstPaymentServices[i].PaymentServiceId) {
        this.lstPaymentServices[i].selected = !this.lstPaymentServices[i].selected;
      }
    }
  }
  SelectFinePaymentPayment(id: any) {
    for (var i = 0; i < this.lstFinesPayment.length; i++) {
      if (id == this.lstFinesPayment[i].FinesPaymentId) {
        this.lstFinesPayment[i].selected = !this.lstFinesPayment[i].selected;
      }
    }
  }
  addValue() {
   
    if (this.isCustomMap) {
      this.Sector = this.objGeoSpatialMaps.Sector;
      this.District = this.objGeoSpatialMaps.District;
      this.MapLayer = this.objGeoSpatialMaps.MapLayer;
      this.MapSize = this.objGeoSpatialMaps.MapSize;

      var GeoMapId = 0;
      var FK_ApplicationId = 0;
      var mapType = '';
      var City = '';
      var UploadedMap = '';
      var CreatedDate = Date.now().toString();
      var CreatedBy = 'admin';
      var LastUpdatedBy = 'admin';
      var LastUpdatedDate = Date.now().toString();
      this.pushGeospatialMaps(this.Sector, this.District, this.MapLayer, this.MapSize, GeoMapId, FK_ApplicationId, mapType, City,
        UploadedMap, CreatedDate, CreatedBy, LastUpdatedBy, LastUpdatedDate)
    }
    else {
      var Sector = '';
      var District = '';
      var MapLayer = '';
      this.MapSize = this.objGeoSpatialMaps.MapSize;
      var GeoMapId = 0;
      var FK_ApplicationId = 0;
      var mapType = '';
      this.City = this.objGeoSpatialMaps.City;
      var UploadedMap = '';
      var CreatedDate = Date.now().toString();
      var CreatedBy = 'admin';
      var LastUpdatedBy = 'admin';
      var LastUpdatedDate = Date.now().toString();
      this.pushGeospatialMaps(Sector, District, MapLayer, this.MapSize, GeoMapId, FK_ApplicationId, mapType, this.City,
        UploadedMap, CreatedDate, CreatedBy, LastUpdatedBy, LastUpdatedDate)

    }
  }
  changemapType(mapType: string) {
   
    if (mapType == "ReadyMap") {
      this.isCustomMap = false;
    }
    else {
      this.isCustomMap = true;
    }
  }



  initializeDatasorce() {
    // if (this.GlobalVariableService.ApplicationTypeCategory == 0) {
    //   this.GlobalVariableService.ApplicationTypeCategory = Number(sessionStorage.getItem('ApplicationTypeCategory'))
    // }
    this.dataSource.data = [];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.GeospatialMaps.data = [];
    this.GeospatialMaps.paginator = this.paginatorGeospatialMaps;
    this.GeospatialMaps.sort = this.sortsecondGeospatialMaps;

    this.secondGeospatialMaps.data = [];
    this.secondGeospatialMaps.sort = this.sortsecondGeospatialMaps;
    this.secondGeospatialMaps.paginator = this.paginatorsecondGeospatialMaps;

    this.servicePayment.data = [];
    this.servicePayment.sort = this.sortservicePayment;
    this.servicePayment.paginator = this.paginatorservicePayment;

    this.servicePayment.data = [];
    this.servicePayment.sort = this.sortservicePayment;
    this.servicePayment.paginator = this.paginatorservicePayment;

    this.finepayment.data = [];
    this.finepayment.sort = this.sortfinePayment;
    this.finepayment.paginator = this.paginatorfinePayment;
  }





  //   //#region servicePayment
  //   public servicePaymentColumns: string[] = ['ApplicationType', 'ApplicationNumber', 'ApplicationDate', 'Amount', 'Status','Select'];
  //   public servicePayment = new MatTableDataSource<PaymentServices>();
  //   public servicePaymentselection = new SelectionModel<PaymentServices>(true, []);
  //   //#endregion

  //   //#region FinePayment
  //   public finePaymentColumns: string[] = ['ApplicationNumber', 'Fine', 'FineTerm', 'FineType', 'PaymentStatus','FineDate', 'FineAmount','Select'];
  //   public finepayment = new MatTableDataSource<FinesPayment>();
  //   public finePaymentselection = new SelectionModel<FinesPayment>(true, []);
  //   //#endregion
  //  //#region Geospatial
  //  //if(this.GlobalVariableService.AppDetailtable)
  //  public GeospatialMapsColumns: string[] = ['City', 'MapSize', 'Select','Upload'];
  //  public GeospatialMaps = new MatTableDataSource<GeoSpatialMaps>();
  //  public GeospatialMapsSelection = new SelectionModel<GeoSpatialMaps>(true, []);

  //  public secondGeospatialMapsColumns: string[] = ['Sector', 'District', 'MapLayer', 'Select','Upload'];
  //  public secondGeospatialMaps = new MatTableDataSource<GeoSpatialMaps>();
  //  public secondGeospatialMapsSelection = new SelectionModel<GeoSpatialMaps>(true, []);
  //  //#endregion
















  // SavePayments(){
  //   if (this.GlobalVariableService.ApplicationTypeCategory == 2) {
  //     this.SavePaymentServices();
  //   }
  //   else if (this.GlobalVariableService.ApplicationTypeCategory == 3) {
  //     this.SaveFinesPayment();
  //   }
  //   else if (this.GlobalVariableService.ApplicationTypeCategory == 4) {

  //   }


  // }

  //#region servicePayment
  public servicePaymentColumns: string[] = ['ApplicationType', 'ApplicationNumber', 'ApplicationDate', 'Amount', 'Status', 'Select'];
  public servicePayment = new MatTableDataSource<PaymentServices>();
  public servicePaymentselection = new SelectionModel<PaymentServices>(true, []);
  @ViewChild(MatSort, { static: false }) sortservicePayment: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginatorservicePayment: MatPaginator;

  //#endregion

  //#region FinePayment
  public finePaymentColumns: string[] = ['ApplicationNumber', 'Fine', 'FineTerm', 'FineType', 'PaymentStatus', 'FineDate', 'FineAmount', 'Select'];
  public finepayment = new MatTableDataSource<FinesPayment>();
  public finePaymentselection = new SelectionModel<FinesPayment>(true, []);
  @ViewChild(MatSort, { static: false }) sortfinePayment: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginatorfinePayment: MatPaginator;
  //#endregion

  //#region Geospatial
  public GeospatialMapsColumns: string[] = ['City', 'MapSize', 'Select', 'Upload'];
  public GeospatialMaps = new MatTableDataSource<GeoSpatialMaps>();
  public GeospatialMapsSelection = new SelectionModel<GeoSpatialMaps>(true, []);
  @ViewChild(MatSort, { static: false }) sortGeospatialMaps: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginatorGeospatialMaps: MatPaginator;


  public secondGeospatialMapsColumns: string[] = ['Sector', 'District', 'MapLayer', 'MapSize', 'Select', 'Upload'];
  public secondGeospatialMaps = new MatTableDataSource<GeoSpatialMaps>();
  public secondGeospatialMapsSelection = new SelectionModel<GeoSpatialMaps>(true, []);
  @ViewChild(MatSort, { static: false }) sortsecondGeospatialMaps: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginatorsecondGeospatialMaps: MatPaginator;
  //#endregion


  SaveGeoSpecialMaps() {
    if (!this.GlobalVariableService.isAllapplication || !this.GlobalVariableService.AssignedApplication) {
      for (var j = 0; j < this.mainlistGeoSpatialMaps.length; j++) {
        this.mainlistGeoSpatialMaps[j].FK_ApplicationId = this.ApplicationId;
      }
    }
    this._svc.SaveGeoSpecialMaps(this.mainlistGeoSpatialMaps, 'Application/SaveGeoSpecialMaps').subscribe(
      data => {
        // swal({
        //   title: 'Application',
        //   imageUrl: "./assets/images/logo.png",
        //   imageWidth: 100,
        //   imageHeight: 100,
        //   text: "Application has been saved successfully.",
        //   position: 'bottom-right',
        //   confirmButtonColor: '#3085d6',
        // }).then(function () {
        // })
        this.GlobalVariableService.openDialog("Applications", 'Application has been saved successfully');
        if (this.GlobalVariableService.AssignedApplication) {
          // this.router.navigateByUrl('/AssignedApplication');
          var myurl = `${"AssignedApplication"}/${''}`;
          const that = this;
          that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            that.router.navigate([myurl]));
        }
        else {
          // this.router.navigateByUrl('/AssignedApplication');
          var myurl = `${"ReviewApplications"}/${''}`;
          const that = this;
          that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            that.router.navigate([myurl]));

        }



      }, (err) => {
        alert("Some Errors occured while saving application.");
      });

  }

  pushGeospatialMaps(Sector: any, District: any, MapLayer: any, MapSize: any, GeoMapId: any,
    FK_ApplicationId: any, mapType: any, City: any,
    UploadedMap: any, CreatedDate: any, CreatedBy: any, LastUpdatedBy: any, LastUpdatedDate: any) {
    this.pushGeoSpatialMaps = new GeoSpatialMaps();
    this.pushGeoSpatialMaps.Sector = Sector;
    this.pushGeoSpatialMaps.District = District;
    this.pushGeoSpatialMaps.MapLayer = MapLayer;
    this.pushGeoSpatialMaps.MapSize = MapSize;
    this.pushGeoSpatialMaps.GeoMapId = GeoMapId;
    this.pushGeoSpatialMaps.FK_ApplicationId = FK_ApplicationId;
    this.pushGeoSpatialMaps.MapType = mapType;
    this.pushGeoSpatialMaps.City = City;
    this.pushGeoSpatialMaps.UploadedMap = UploadedMap;
    this.pushGeoSpatialMaps.CreatedDate = CreatedDate;
    this.pushGeoSpatialMaps.CreatedBy = CreatedBy;
    this.pushGeoSpatialMaps.LastUpdatedBy = LastUpdatedBy;
    this.pushGeoSpatialMaps.LastUpdatedDate = LastUpdatedDate;

    if (this.isCustomMap) {
      this.mainlistGeoSpatialMaps.push(this.pushGeoSpatialMaps);
      this.secondlistGeoSpatialMaps.push(this.pushGeoSpatialMaps);
      this.secondGeospatialMaps = new MatTableDataSource<GeoSpatialMaps>(this.secondlistGeoSpatialMaps);
    }

    else {
      this.mainlistGeoSpatialMaps.push(this.pushGeoSpatialMaps);
      this.listGeoSpatialMaps.push(this.pushGeoSpatialMaps);
      this.GeospatialMaps = new MatTableDataSource<GeoSpatialMaps>(this.listGeoSpatialMaps);
    }
  }
  // handleInputChange(e) {

  //   var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  //   var pattern = /image-*/;
  //   var reader = new FileReader();
  //   if (!file.type.match(pattern)) {
  //     alert('invalid format');
  //     return;
  //   }
  //   reader.onload = this._handleReaderLoaded.bind(this);
  //   reader.readAsDataURL(file);
  // }

  // _handleReaderLoaded(e) {

  //   let reader = e.target;
  //   this.imageSrc = reader.result;
  //   this.objappSetting.Companyimage = reader.result;
  //   this.imagepath = this.objappSetting.Companyimage.replace('data:image/png;base64,', '');
  //   this.transform();
  // }
  // transform() {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + this.imagepath);//data:image/jpg;base64, 
  // }

  selectApp(id: any) {

  }




  GetAllGeospatialMapsListByAppId(id: any) {
   
    this._svc.getGenericParmas(id,"id",'Application/GetAllByGeoMapId').subscribe(
      data => {
       
        this.mainlistGeoSpatialMaps=data;
        //  for(let i=0; i<this.GeoSpecialDataList.length; i++)
        //  {

        this.secondlistGeoSpatialMaps=this.mainlistGeoSpatialMaps.filter(a => a.City == "");
        this.secondGeospatialMaps = new MatTableDataSource<GeoSpatialMaps>(this.secondlistGeoSpatialMaps);
        setTimeout(() => {
          this.listGeoSpatialMaps = this.mainlistGeoSpatialMaps.filter(a => a.City !== "");
          this.GeospatialMaps = new MatTableDataSource<GeoSpatialMaps>(this.listGeoSpatialMaps);
        }, 300);
        //  }
        //this.GlobalVariableService.openDialog("Applications",'Application has been saved successfully');
        // this.router.navigateByUrl('/AllApplications');

      }, (err) => {
        alert("Some Errors occured while saving application.");
      });
  }


}


