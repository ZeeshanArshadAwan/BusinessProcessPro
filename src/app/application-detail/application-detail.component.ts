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
  DocumentArr: any;
  FileName: string = "";
  DoctypeId: number = -1;
  DocumentList: any = [];
  previousClick: boolean = false;
  str: string = "";
  Remarksforaaprovalorrejection:string="Remarks";

  constructor(public languageTranslateService: LanguageTranslateService, private GlobalVariableService: GlobalVariableService, private _svc: SharedServicesService, private router: Router, private sanitizer: DomSanitizer) {
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
    this.DocumentArr = [];
    this.DocumentList = [];
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  @ViewChild('LoadDynamicControll', { static: true }) LoadDynamicControll: LoadDynamicControllComponent;
  public dataSource = new MatTableDataSource<any>();
  public displayedColumnss = ['FileName', 'Document Type Name', 'Document Extension', 'action']
  public displayedColumn = ['Decision Maker', 'Date Time', 'Current Status', 'action']
  public AuditHistoryLst = new MatTableDataSource<any>();
  public AuditHistoryColumns = ['User_FullName', 'AuditDateTime', 'StatusNameEn', 'action']

  ngOnInit() {
    
    this.GlobalVariableService.glbApplciationTypePanels = [];
    this.GlobalVariableService.controllsApplicationTypeFields = [];
    this.ApplicationId=this.GlobalVariableService.Applicationid


    setTimeout(() => {
      this.FormName = localStorage.getItem("BPPFromNameEn");
      this.GlobalVariableService.GetAllPanelsByApplicationTypeId(Number(this.GlobalVariableService.parameterID));
      this.GlobalVariableService.GetAllFieldsByAppTypeId(Number(this.GlobalVariableService.parameterID));
      this.GetAllApplicationtypeDetail(Number(this.GlobalVariableService.parameterID));
      this.GetAllApplicationDocumenttype(Number(this.GlobalVariableService.parameterID));

      if (this.GlobalVariableService.AssignedApplication == true) {

        this.getFieldValuesByApptypeid();
        this.GetStatusForRadioButtons(Number(this.GlobalVariableService.objApplicationInfo.ApplicationId));
      }
      else if (this.GlobalVariableService.isAllapplication) {

        this.getFieldValuesByApptypeid();
        this.GetApplicationDocumentDetails(this.GlobalVariableService.objApplicationInfo.ApplicationId);
        this.GetAuditLog(this.GlobalVariableService.objApplicationInfo.ApplicationId);
      }
      // setTimeout(() => {
      //   this.loadControll();
      // }, 500);
    }, 10);
  }

  start() {
    

    this.GlobalVariableService.glbApplciationTypePanels = [];
    this.GlobalVariableService.controllsApplicationTypeFields = [];


    setTimeout(() => {
      this.FormName = localStorage.getItem("BPPFromNameEn");
      this.GlobalVariableService.GetAllPanelsByApplicationTypeId(Number(this.GlobalVariableService.parameterID));
      this.GlobalVariableService.GetAllFieldsByAppTypeId(Number(this.GlobalVariableService.parameterID));
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

    if(this.previousClick){
      setTimeout(() => {

    if (this.applicationvaluelist.length > 0) {
      // setTimeout(() => {

      for (var i = 0; i < this.applicationvaluelist.length; i++) {
        var Control = this.applicationvaluelist[i].FK_FieldId;
        if (!this.GlobalVariableService.isNumberNullOrEmplty(Control)) {
          console.log($('#' + Control).val(this.applicationvaluelist[i].Value));
          $('#' + Control).val(this.applicationvaluelist[i].Value);
          // }
        }
      }
      // }, 320);
    }
  }, 100);
}
if (this.applicationvaluelist.length > 0) {
  for (var i = 0; i < this.applicationvaluelist.length; i++) {
    var Control = this.applicationvaluelist[i].FK_FieldId;
    if (!this.GlobalVariableService.isNumberNullOrEmplty(Control)) {
      console.log($('#' + Control).val(this.applicationvaluelist[i].Value));
      $('#' + Control).val(this.applicationvaluelist[i].Value);
      
    }
  }
}

  }
  loadControll() {
    debugger;
    if(this.GlobalVariableService.isAllapplication ||  this.GlobalVariableService.AssignedApplication){
    for (var i = 0; i < this.GlobalVariableService.ApplicationValues.length; i++) {
      var Control = this.GlobalVariableService.ApplicationValues[i].FK_FieldId;
      if (!this.GlobalVariableService.isNumberNullOrEmplty(Control)) {
        if (this.GlobalVariableService.ApplicationValues[i].FK_FieldType == 8 ) {
          var val = this.GlobalVariableService.ApplicationValues[i].Value;
          
          $("#" + val ).prop('checked', true);
        }
        else if(this.GlobalVariableService.ApplicationValues[i].FK_FieldType == 9){
          var value = this.GlobalVariableService.ApplicationValues[i].Value.split(",");
          for(var s = 0; s< value.length ; s++){
            $("#" + value[s]).attr('checked', true);
          }
        }
        else {
          debugger;
         // console.log($('#' + Control).val(this.GlobalVariableService.ApplicationValues[i].Value));
          $('#' + Control).val(this.GlobalVariableService.ApplicationValues[i].Value);
         // $('#' + Control+'ApplicationValuesID').val(this.GlobalVariableService.ApplicationValues[i].ApplicationValuesID);
          //console.log( $('#' + Control+'ApplicationValuesID').val(this.GlobalVariableService.ApplicationValues[i].ApplicationValuesID))

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
    debugger;
    
    if (this.applicationvaluelist.length == 0) {
      this.saveData();
    }
    // this.checkIsMendatory();
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
        LAST_UPDATED_BY:a.UserName,
        Applicant_Id:a.ID
      }
      this._svc.UpdateStatusAndRemarks(UpdateStatus, 'Application/UpdateStatusAndRemarks').subscribe(
        data => {
          this.ApplicationId = Number(data.split(':')[1]);
          this.SaveApplication();
        });
    }
    else {
      if(this.GlobalVariableService.ApplicationValues==null ||this.GlobalVariableService.ApplicationValues==undefined||this.GlobalVariableService.ApplicationValues==[])
      {
      var a = JSON.parse(localStorage.getItem("BPPobjlogin"));
      this.application.Applicant_Id =a.ID;
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
      else{
        this.SaveApplication();

      }
    }
  }
  }
  // checkIsMendatory() {

  //   this.str = "";
  //   var mendatoryField = this.GlobalVariableService.controllsApplicationTypeFields.filter(x => x.IsMandatory == true)
  //   for (var i = 0; i < mendatoryField.length; i++) {
  //     var found = "";
  //     for (var j = 0; j < this.applicationvaluelist.length; j++) {
  //       if (this.applicationvaluelist[j].FK_FieldId == mendatoryField[i].FieldId) {
  //         if (mendatoryField[i].FK_FieldType != 6 && mendatoryField[i].FK_FieldType != 8 && mendatoryField[i].FK_FieldType != 9) {

  //           // if (this.GlobalVariableService.ApplicationValues[i].FK_FieldType == 8) {

  //           // }
  //           // else if (this.GlobalVariableService.ApplicationValues[i].FK_FieldType == 9) {
  //             found = "true"
  //           // }
  //         }
  //         else {
  //          //
  //         }
  //       }
  //     }
  //     if (found == "") {
  //       this.str = this.str + ", " + mendatoryField[i].FieldCaption;
  //     }
  //   }
  // }

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

    debugger;
    this.applicationvaluelist = [];
    for (var i = 0; i < this.GlobalVariableService.controllsApplicationTypeFields.length; i++) {
      if (this.GlobalVariableService.controllsApplicationTypeFields[i].FK_FieldType == 8) {

        var fieldid = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId.toString();
        var Caption = $("input[name='" + fieldid + "']:checked").val();
        var FieldId = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId;
       // var ApplicationValuesID=this.GlobalVariableService.controllsApplicationTypeFields[i].;
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
        debugger;
        for (var tbl = 0; tbl < this.GlobalVariableService.DynamicDataTable.length; tbl++) {
          if (this.GlobalVariableService.DynamicDataTable[tbl].id == this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId) {
            var FieldId = this.GlobalVariableService.DynamicDataTable[tbl].id;
            var tblId = this.GlobalVariableService.DynamicDataTable[tbl].id;
            var ColumnName = this.GlobalVariableService.DynamicDataTable[tbl].ColumnName;
            //#region Comment
            //working for HTML
            // var th = $('#' + tblId + ' th').eq($(this).index());
            // var html_table_data = "";
            // var html_tabl_body = " <tbody><tr> <td>";
            // var bRowStarted = true;

            // $('#' + tblId + ' thead>tr').each(function () {
            //   html_table_data = ' <div class="mt-4 table-responsive table-bordered table-hover">  <table class="table"  style="border: 1px solid;" > <thead> <tr> <th >'
            //   $('th', this).each(function () {
            //     if (html_table_data.length == 0 || bRowStarted == true) {
            //       html_table_data += $(this).text();
            //       bRowStarted = false;
            //     }
            //     else
            //       html_table_data += "</th><th>" + $(this).text();
            //   });
            //   html_table_data += "\n";
            //   html_table_data += '</th> </tr> </thead>'

            //   var bRowStarted = true;

            //   var id = 0;
            //   $('#' + tblId + ' tbody>tr').each(function (i, row) {
            //     debugger;
            //     var $row = $(row),
            //       $check = $row.find('input:checked');
            //     var hasrow = ''
            //     if ($check.length == 1) {
            //       $('td', this).each(function () {
            //         hasrow = 'found'
            //         if (html_tabl_body.length == 0 || bRowStarted == true) {
            //           html_tabl_body += $(this).text();
            //           bRowStarted = false;
            //         }
            //         else
            //           html_tabl_body += " </td><td> " + $(this).text();
            //       });
            //     }
            //     if (hasrow == 'found') {
            //       html_tabl_body += "</td></tr><tr><td>";
            //     }

            //     bRowStarted = true;
            //   });
            //   debugger;
            //   var newStr = html_tabl_body.substring(0, html_tabl_body.length - 13);
            //   html_tabl_body = newStr;
            //   html_table_data += html_tabl_body;
            //   html_table_data += ' </tr>  </tbody></table> </div>'
            //   bRowStarted = true;
            // });
            // console.log(html_table_data)
            // this.pushData(FieldId, html_table_data);
            //working for HTML


            //working for XML
            //   var html_tabl_body = '<xml version="1.0" encoding="UTF-8" ?> <root>'
            //   var bRowStarted = true;
            //   $('#' + tblId + ' tbody>tr').each(function (i, row) {
            //     var $row = $(row),
            //       $check = $row.find('input:checked');
            //     if ($check.length == 1) {
            //       html_tabl_body += "<rows>"
            //       $('td', this).each(function (j, row) {
            //         debugger;
            //         if (html_tabl_body.length == 0 || bRowStarted == true) {
            //           var colName = "<" + ColumnName[j].text + ">";
            //           html_tabl_body += colName;
            //           html_tabl_body += $(this).text();
            //           bRowStarted = false;
            //         }
            //         else {
            //           if (j < ColumnName.length) {
            //             html_tabl_body += " </" + ColumnName[j - 1].text + "> <" + ColumnName[j].text + "> " + $(this).text();
            //             if (j == ColumnName.length - 1) {
            //               html_tabl_body += " </" + ColumnName[j].text + ">";
            //             }
            //           }
            //         }
            //       });
            //       html_tabl_body += "</rows>"
            //     }
            //     bRowStarted = true;
            //   });
            //#endregion
            var datatable = this.GlobalVariableService.DynamicDataTable[tbl].Datatable;
            var selectedrec: any = [];
            $('#' + tblId + ' tbody>tr').each(function (i, row) {
              var $row = $(row),
                $check = $row.find('input:checked');
              if ($check.length == 1) {
                debugger;
                var a = datatable[i];
                selectedrec.push(datatable[i]);
              }
            });
            this.pushData(FieldId, JSON.stringify(selectedrec));
            console.log(selectedrec);
          }
        }
      }
      else {
        var fieldid = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId.toString();
        var Caption = $('#' + fieldid).val();
       // var ApplicationValuesID = $('#'+ fieldid + 'ApplicationValuesID').val();
        
        //this.GlobalVariableService.controllsApplicationTypeFields[i].FieldCaption = Caption;
        var FieldId = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId;
        if (!this.GlobalVariableService.isStringNullOrEmplty(Caption) && !this.GlobalVariableService.isNumberNullOrEmplty(FieldId)) {
          this.pushData(FieldId, Caption);
        }
      }

    }
    // this.checkIsMendatory();
    // if (this.str != "") {

    //   this.GlobalVariableService.openDialog("Application Detail", "Please Fill the mentioned Fields. " + this.str)
    
    //   return;
    // }
  }

  pushData(FK_FieldId: number, Caption: string) {
    this.applicationvalues = new ApplicationValues();
    this.applicationvalues.ApplicationValuesID=0;
    this.applicationvalues.FK_FieldId = FK_FieldId;
    this.applicationvalues.Value = Caption;
    var x = this.applicationvaluelist.filter(x => x.FK_FieldId == FK_FieldId)
    if (x.length == 0) {
    this.applicationvaluelist.push(this.applicationvalues);
    }
  }

  SaveApplication() {
debugger;
    for (var j = 0; j < this.applicationvaluelist.length; j++) {
      this.applicationvaluelist[j].FK_ApplicationId = this.ApplicationId;
      var a=this.GlobalVariableService.ApplicationValues.filter(a=>a.FK_FieldId==this.applicationvaluelist[j].FK_FieldId)

if(a.length==0)
{
  this.applicationvaluelist[j].ApplicationValuesID=0;
}
else{
  this.applicationvaluelist[j].ApplicationValuesID=a[0].ApplicationValuesID;
  this.applicationvaluelist[j].FK_ApplicationId=a[0].FK_ApplicationId;
}

    }
    this._svc.SaveApplicationValues(this.applicationvaluelist, 'DynamicForm/SaveApplicationValues').subscribe(
      data => {

        this.SaveDocumentFile();
      });
  }
  SaveDocumentFile() {

    if (this.DocumentArr.length > 0) {

      for (var i = 0; i < this.DocumentArr.length; i++) {
        this.DocumentArr[i].FK_ApplicationId = this.ApplicationId;

      }
      this._svc.SaveDocumentFiles(this.DocumentArr, 'Application/SaveApplicationDocuments').subscribe(
        data => {
          var myurl = `${'MyApplications'}/${''}`;
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
      var myurl = `${'MyApplications'}/${''}`;
      const that = this;
      that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        that.router.navigate([myurl])

      )
    }
  }
  GetAllApplicationtypeDetail(parameterID: number) {
    this._svc.getGenericParmas(parameterID, "id", 'ApplicationType/GetApplicationTypebyId').subscribe(
      data => {
        this.applicationtype = data;
      }, (err) => {
        //  this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured while Getting All Application Type Detail.")
      });
  }
  selectData(ApplicationFileId: number){
    

  }


  GetAllApplicationDocumenttype(parameterID: number) {
    this._svc.getGenericParmas(parameterID, "id", 'ApplicationType/GetAllApplicationTypeDocumentsByApptypeid').subscribe(
      data => {
        this.ApplicationtypeDocuments = data;
       
      }, (err) => {
        this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured while Getting All Application Type Detail.")
      });

  }











  handleInputChange(e) {
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

    reader.onload = this._handleReaderLoaded.bind(this);
    // reader.readAsDataURL(e.target.files[0]);
  }
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + this.imagepath);//data:image/jpg;base64, 
  }
  _handleReaderLoaded(e) {

    let reader = e.target;
    this.imageSrc = reader.result;
    this.objSaveFiles.Image = reader.result;
    this.imagepath = this.objSaveFiles.Image.replace('data:image/png;base64,', '');
    this.transform();
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
    this.FileName = this.FileName.split('.')[0];
    var i = this.ApplicationtypeDocuments.filter(x => x.DocumentTypeId == this.DoctypeId)[0];
    this.objSaveFiles.DocumentTypeName = i.DocumentNameEN;
    this.objSaveFiles.FK_ApplicationType_DocumentId = i.DocumentTypeId;
    this.DocumentArr.push({ ApplicationFileId: 0, FK_ApplicationId: this.ApplicationId, FileName: this.FileName, DocumentExtension: this.FileExtension, DocumentTypeName: this.objSaveFiles.DocumentTypeName, Image: this.imageSrc })


    this.dataSource.data = [];
    this.dataSource.data = this.DocumentArr;
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
        debugger;
        this.DocumentList=[];
        this.documentsavelist = data;
          
        for (let i = 0; i < this.documentsavelist.length; i++) {
          this.DocumentList.push({
            ApplicationFileId:this.documentsavelist[i].ApplicationFileId,
            FileName: this.documentsavelist[i].FileName,
            DocumentTypeName: this.documentsavelist[i].DocumentTypeName,
            DocumentExtension: this.documentsavelist[i].FileExtension,
            action: ""
          });
        }
        this.dataSource.data = this.DocumentList;
     
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
  onItemChange(value,Name) {
    
    this.FK_ActiveStatusId = value;
    if(Name.includes("Reject"))
    {
      this.Remarksforaaprovalorrejection="Rejection Reason";
    }
    else{
      this.Remarksforaaprovalorrejection="Remarks";
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
  DownloadDocumet(id:any){
debugger;
var r =id;

  }
}