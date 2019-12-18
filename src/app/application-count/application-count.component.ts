import { Component, OnInit } from '@angular/core';
import { ApplicationType1, ApplicationDetailReport, ApplicationStatusPerCount } from '../Classes/application-review';
import { Sys_Users } from '../Classes/login';
import { FormControl, Validators } from '@angular/forms';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { saveAs } from '../../assets/js/FileSaver.js';
import * as Highcharts from 'highcharts';
import { parse } from 'path';

declare var require: any;
//let Boost = require('highcharts/highcharts');
let accessibility = require('highcharts/modules/accessibility');
let series = require('highcharts/modules/series-label');
let exporting = require('highcharts/modules/exporting');
let exportData = require('highcharts/modules/export-data');

//Boost(Highcharts);
accessibility(Highcharts);
series(Highcharts);
exporting(Highcharts);
exportData (Highcharts);


@Component({
  selector: 'app-application-count',
  templateUrl: './application-count.component.html',
  styleUrls: ['./application-count.component.css']
})
export class ApplicationCountComponent implements OnInit {
  public AppPerStatusCount: any;
  ////////////////////////////////////////////////
  lstApplicationType: ApplicationType1[];
  objApplicationDetailReport : ApplicationDetailReport;
  lstApplicationStatusPerCount : ApplicationStatusPerCount [];
  lstSys_Users : Sys_Users[]
  favoritereport: string;
  Base64:string;
  FileName:any;
  extention:any;
  report: string[] = ['PDF', 'Word', 'Excel'];
  IsGraph:boolean = false;
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
  ////////////////////////////////////////// Graph///////////////////////////////////
  
  ///////////////////////////////////////////////////////////////////////////////////
  constructor(private _svc: SharedServicesService,private GlobalVariableService : GlobalVariableService) 
  { 
    this.objApplicationDetailReport = new ApplicationDetailReport();

  }

  ngOnInit() {
   
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
    this.IsGraph = false;
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
      this._svc.GetReport(this.objApplicationDetailReport,"Reports/ApplicationCountPerStatus").subscribe(
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
        this.getGraph();
       
      }

    )  
   // this.objApplicationDetailReport = new ApplicationDetailReport(); 
  }
//////////////////////////////////// Graphs//////////////////////////////////////
getGraph()
{this.IsGraph = true;
  this._svc.GetReport(this.objApplicationDetailReport,"Reports/ApplicationCountPerStatusGraph").subscribe(
    data => {
      this.lstApplicationStatusPerCount = data;
      var chartData = [];  
                for (var i = 0; i < this.lstApplicationStatusPerCount.length; i++) {  
                    chartData.push({  
                        "name": this.lstApplicationStatusPerCount[i].ApplicationStatus,  
                        "y": this.lstApplicationStatusPerCount[i].ApplicationCount  
                        
                    })  
                }  
      this.AppPerStatusCount = {
      chart: {
        type: 'column'
    },
    credits: {
      enabled: false
  },
  exporting: {
    enabled: false
  },
    title: {
        text: 'Application Status Count'
    },
    
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Count'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Count: <b>{point.y:1f}</b>'
    },
    plotOptions: {
      column: { //working here
          colorByPoint: true,
         //stacking: 'percent',
      }
  },
    series: [{
        name: 'Status',
        data: chartData ,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
    }
    ////////////////////// Render Graph///////////////////////////
      Highcharts.chart('ChartContainer', this.AppPerStatusCount);
      
      this.objApplicationDetailReport = new ApplicationDetailReport(); 
    })
    
    
  
}

}
