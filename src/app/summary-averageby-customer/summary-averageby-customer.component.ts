import { Component, OnInit } from '@angular/core';
import { SummaryAversgeByCustomer } from '../Classes/SummaryAversgeByCustomer';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { saveAs } from '../../assets/js/FileSaver.js';

@Component({
  selector: 'app-summary-averageby-customer',
  templateUrl: './summary-averageby-customer.component.html',
  styleUrls: ['./summary-averageby-customer.component.css']
})
export class SummaryAveragebyCustomerComponent implements OnInit {
  report: string[] = ['PDF', 'Word', 'Excel'];
  FormName: string = '';
  showDashboard: boolean = false;
  Base64: string;
  FileName: any;
  extention: any;
  reportType: string = "";

  ObjSummeryAverageByCustomer:SummaryAversgeByCustomer
  constructor(public languageTranslateService: LanguageTranslateService , private _svc: SharedServicesService,public GlobalVariableService : GlobalVariableService) { 
    this.ObjSummeryAverageByCustomer=new SummaryAversgeByCustomer();
  }
  ngOnInit() {
  }



  
GenerateReport() {
  this.GetReport("Reports/SummaryAveragebyCustomer");
}
GetReport(ReportType: string) {
  if (localStorage.getItem("language") == "ar") {
    this.ObjSummeryAverageByCustomer.Lang = 0;
  }
  else{
    this.ObjSummeryAverageByCustomer.Lang = 1;
  }
debugger;
  this._svc.GetReportForSummaryCustomer(this.ObjSummeryAverageByCustomer, ReportType).subscribe(
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
  this.ObjSummeryAverageByCustomer = new SummaryAversgeByCustomer();
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
