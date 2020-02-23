import { Component, OnInit } from '@angular/core';
import { ApplicationType1, ApplicationDetailReport, ApplicationStatus } from '../Classes/application-review';
import { Sys_Users } from '../Classes/login';
import { FormControl, Validators } from '@angular/forms';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { saveAs } from '../../assets/js/FileSaver.js';
import { BaseComponent } from '../SharedServices/base-component';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';

@Component({
  selector: 'app-application-per-service-source',
  templateUrl: './application-per-service-source.component.html',
  styleUrls: ['./application-per-service-source.component.css']
})
export class ApplicationPerServiceSourceComponent  extends BaseComponent  implements OnInit {
  FormName: string = '';
  lstApplicationType: ApplicationType1[];
  objApplicationDetailReport : ApplicationDetailReport;
  lstApplicationStatus : ApplicationStatus[]
  favoritereport: string;
  Base64:string;
  FileName:any;
  extention:any;
  showDashboard: boolean = false;
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
  
  constructor(public languageTranslateService: LanguageTranslateService ,private _svc: SharedServicesService,public GlobalVariableService : GlobalVariableService) 
  { 
    super(languageTranslateService);
    this.objApplicationDetailReport = new ApplicationDetailReport();

  }

  ngOnInit() {
    if(this.GlobalVariableService.isEn){
      this.FormName = localStorage.getItem("BPPFromNameEn");
    }
    else {
      this.FormName = localStorage.getItem("BPPFromNameAr");
    }
   this.GetApplicationTypeList();
   this.GetApplicationStatusList(0);
  }
  GetApplicationTypeList() {
    this._svc.GetDetails("ApplicationType/GetAllApplicationTypes").subscribe(
      data => {
        this.lstApplicationType = data;
      } 
    )

  }
  GetApplicationStatusList(index: number = 0) {
    this._svc.getGenericParmas(index,'id','ApplicationType/GetAllApplicationStatusbyTypeid').subscribe(
      data => {
        
        this.lstApplicationStatus = data;
      } 
    )

  }
  Cancel() {
    this.objApplicationDetailReport = new ApplicationDetailReport();

  }
  public base64ToBlob(b64Data, contentType='', sliceSize=512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
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
  
      this._svc.GetReport(this.objApplicationDetailReport,"Reports/ApplicationPerServiceSource").subscribe(
      data => {
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
  OnchangeApptype(id: any)
  {
    this.GetApplicationStatusList(id);
  }

  getAllCharts(){
    this.showDashboard = true;
    this.GlobalVariableService.GetApplicationCount();
    this.GlobalVariableService.getcounts();
  }
  

}
