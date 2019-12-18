import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ApplicationType1,ApplicationDetailReport } from '../Classes/application-review';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { Sys_Users } from '../Classes/login';
import { saveAs } from '../../assets/js/FileSaver.js';
@Component({
  selector: 'app-application-detail-report',
  templateUrl: './application-detail-report.component.html',
  styleUrls: ['./application-detail-report.component.css']
})
export class ApplicationDetailReportComponent implements OnInit {
  lstApplicationType: ApplicationType1[];
  FormName: string = '';
  objApplicationDetailReport : ApplicationDetailReport;
  lstSys_Users : Sys_Users[]
  favoritereport: string;
  Base64:string;
  FileName:any;
  extention:any;
  report: string[] = ['PDF', 'Word', 'Excel'];
  ////////////////////Validation////////////////
  errorMsg: string = '';
  ApplicationType = new FormControl('', [
    Validators.required
  ]);
  Applicant = new FormControl('', [
    Validators.required
  ]);
  Format = new FormControl('', [
    Validators.required
  ]);
  ApplicantionNo = new FormControl('', [
    Validators.required
  ]);
  
  constructor(private _svc: SharedServicesService,private GlobalVariableService : GlobalVariableService) 
  { 
    this.objApplicationDetailReport = new ApplicationDetailReport();

  }

  ngOnInit() {
    this.FormName = localStorage.getItem("BPPFromNameEn");
   this.GetApplicationTypeList();
   this.GetUserList();
  }
  GetApplicationTypeList() {
    this._svc.GetDetails("ApplicationType/GetAllApplicationTypes").subscribe(
      data => {
        
        this.lstApplicationType = data;
      } 
    )

  }
  GetUserList() {
    this._svc.GetDetails("User/GetAll").subscribe(
      data => {
        
        this.lstSys_Users = data;
      } 
    )

  }
  Cancel() {
    this.objApplicationDetailReport = new ApplicationDetailReport();

  }
  public base64ToBlob(b64Data, contentType='', sliceSize=512) {
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
    return new Blob(byteArrays, {type: contentType});
}
  GetReport() {
   
    if (localStorage.getItem("language")=="ar")
    {
      this.objApplicationDetailReport.Lang=0;
    }
      this._svc.GetReport(this.objApplicationDetailReport,"Reports/ApplicationDetailsReport").subscribe(
      data => {
        debugger;
        this.Base64= data.split(",");
        this.FileName=this.Base64[1].split(',');
        this.extention = this.Base64[2].split(',');
        
        if (this.extention == "PDF")
        {
        const linkSource = 'data:application/pdf;base64,'+this.Base64[0];
        const downloadLink = document.createElement("a");
        const fileName = this.FileName[0]+ ".pdf";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        }
        else if (this.extention.includes("Word"))
        {
          if (this.Base64[0]) {
            var blob = this.base64ToBlob(this.Base64[0], 'text/plain');
           saveAs(blob, this.FileName + ".doc" );
          }
          // var URL = 'http://localhost:10248/ReportsDoc/'+this.FileName+'.doc';
            
          // window.open(URL, null);  
        }
        else
        {
           if (this.Base64[0]) {
            var blob = this.base64ToBlob(this.Base64[0], 'text/plain');
           saveAs(blob, this.FileName + ".xls" );
          }
            
        }
      }

    )   
    this.objApplicationDetailReport = new ApplicationDetailReport();
  }
}
