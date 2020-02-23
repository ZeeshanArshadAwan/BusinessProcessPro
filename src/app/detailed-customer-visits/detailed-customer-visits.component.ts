import { Component, OnInit } from '@angular/core';
import { DetailedCustomerVisit } from '../Classes/DetailedCustomerVisit';
import { saveAs } from '../../assets/js/FileSaver.js';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { GlobalVariableService } from '../SharedServices/global-variable.service';

@Component({
  selector: 'app-detailed-customer-visits',
  templateUrl: './detailed-customer-visits.component.html',
  styleUrls: ['./detailed-customer-visits.component.css']
})
export class DetailedCustomerVisitsComponent implements OnInit {
  Gender: string[] = ['Male', 'Female'];
  report: string[] = ['PDF', 'Word', 'Excel'];
  FormName: string = '';
  showDashboard: boolean = false;
  Base64: string;
  FileName: any;
  extention: any;
  reportType: string = "";
  ObjDetailedCustomerVisit:DetailedCustomerVisit;
  constructor(public languageTranslateService: LanguageTranslateService , private _svc: SharedServicesService,public GlobalVariableService : GlobalVariableService) { 
  this.ObjDetailedCustomerVisit=new DetailedCustomerVisit();
  }
  ngOnInit() {
  }
  
  GenerateReport() {
    this.GetReport("Reports/DetailedCustomerVisit");
  }
  GetReport(ReportType: string) {
    if (localStorage.getItem("language") == "ar") {
      this.ObjDetailedCustomerVisit.Lang = 0;
    }
    else{
      this.ObjDetailedCustomerVisit.Lang = 1;
    }
  debugger;
    this._svc.GetReportForDetailedCustomerVisit(this.ObjDetailedCustomerVisit, ReportType).subscribe(
      data => {
        this.Base64 = data.split(",");
        this.FileName = this.Base64[1].split(',');
        this.extention = this.Base64[2].split(',');
  
        if (this.extention == "PDF") {
          const linkSource = 'data:application/pdf;base64,' + this.Base64[0];
          const downloadLink = document.createElement("a");
          const fileName = this.FileName[0] + ".pdf";
  
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }
        else if (this.extention.includes("Word")) {
          if (this.Base64[0]) {
            var blob = this.base64ToBlob(this.Base64[0], 'text/plain');
            saveAs(blob, this.FileName + ".doc");
          }
        }
        else {
          if (this.Base64[0]) {
            var blob = this.base64ToBlob(this.Base64[0], 'text/plain');
            saveAs(blob, this.FileName + ".xls");
          }
  
        }
  
      }
  
    )
    this.ObjDetailedCustomerVisit = new DetailedCustomerVisit();
  }
  public base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
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
    return new Blob(byteArrays, { type: contentType });
  }





}
