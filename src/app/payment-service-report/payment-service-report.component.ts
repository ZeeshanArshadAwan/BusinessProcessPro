import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { BaseComponent } from '../SharedServices/base-component';
import { ApplicationDetailReport, ApplicationType1, ApplicationsCount } from '../Classes/application-review';
import { saveAs } from '../../assets/js/FileSaver.js';
import { Router } from '@angular/router';
//import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-payment-service-report',
  templateUrl: './payment-service-report.component.html',
  styleUrls: ['./payment-service-report.component.css']
})
export class PaymentServiceReportComponent extends BaseComponent implements OnInit {
  FormName: string = '';
  showDashboard: boolean = false;
  Base64: string;
  FileName: any;
  extention: any;
  reportType: string = "";
  lstApplicationType: ApplicationType1[];
  objApplicationDetailReport: ApplicationDetailReport;
  report: string[] = ['PDF', 'Word', 'Excel'];
  ////////////////////Validation////////////////
  errorMsg: string = '';



  // public BarChart: any;
  // public PieChart: any;
  // chartData = [];
  // lstApplicationSCount: ApplicationsCount[];
  // TOTAL_APP_PENDING: number = 0;
  // TOTAL_APP_COMPLETED: number = 0;
  // TOTAL_APP_REJECTED: number = 0;
  // public AppPerStatusCount2: any;
  // TOTAL_APPLICATIONS: number = 0;
  // TOTAL_TODAY_APP_PENDING: number = 0;
  // TOTAL_TODAY_APP_COMPLETED: number = 0;
  // lstTotalApps: any[];
  ////////////////////Validation////////////////




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
  constructor(public languageTranslateService: LanguageTranslateService, private _svc: SharedServicesService, public GlobalVariableService: GlobalVariableService
    , private router: Router) {
    super(languageTranslateService);
    this.objApplicationDetailReport = new ApplicationDetailReport();
    this.lstApplicationType = [];
  }

  ngOnInit() {
    if (!this.GlobalVariableService.isStringNullOrEmplty(this.GlobalVariableService.parameterID)) {
      this.reportType = this.GlobalVariableService.parameterID;
    } else {
      this.reportType = sessionStorage.getItem("parameterID");
    }
    if (this.reportType == "") {
      this.logout()
    }
    if (this.GlobalVariableService.isEn) {
      this.FormName = localStorage.getItem("BPPFromNameEn");
    }
    else {
      this.FormName = localStorage.getItem("BPPFromNameAr");
    }


    this.GetApplicationTypeList();
  }

  callEvent() {
    if (this.reportType == "TotalRevenuesPerServicesReport") {
      this.TotalRevenuesPerServicesReport();
    }
    if (this.reportType == "DetailedRevenuesPerServicesReport") {
      this.DetailedRevenuesPerServicesReport();
    }
    if (this.reportType == "KPIDashboardReport") {
      this.KPIDashboardReport();
    }
    if (this.reportType == "CustomerFeedbackReport") {
      this.CustomerFeedbackReport()
    }
  }

  GetApplicationTypeList() {
    this._svc.GetDetails("ApplicationType/GetAllApplicationTypes").subscribe(
      data => {

        this.lstApplicationType = data;
      }
    )

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

  TotalRevenuesPerServicesReport() {
    this.GetReport("Reports/TotalRevenuesPerServicesReport");
  }

  DetailedRevenuesPerServicesReport() {
    this.GetReport("Reports/DetailedRevenuesPerServicesReport");
  }
  KPIDashboardReport() {
    this.GetReport("Reports/KPIDashboardReport");
  }
  CustomerFeedbackReport() {
    this.GetReport("Reports/CustomerFeedbackReport");
  }

  GetReport(ReportType: string) {
    if (localStorage.getItem("language") == "ar") {
      this.objApplicationDetailReport.Lang = 0;
    }

    this._svc.GetReport(this.objApplicationDetailReport, ReportType).subscribe(
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
    this.objApplicationDetailReport = new ApplicationDetailReport();
  }
  Clear() {
    this.objApplicationDetailReport = new ApplicationDetailReport();
  }

  logout() {
    localStorage.removeItem("BPPUserName");
    localStorage.removeItem("BPPassword");
    localStorage.removeItem("BPPuserPrevillege");
    localStorage.removeItem("isLoggedin");
    this.router.navigateByUrl('/login');
  }
  //charts
  getAllCharts() {
    
    this.showDashboard = true;
    this.GlobalVariableService.GetApplicationCount();
    this.GlobalVariableService.getcounts();
  }
}
