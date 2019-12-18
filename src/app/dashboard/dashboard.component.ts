import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js'
import * as Highcharts from 'highcharts';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { ApplicationDetailReport, ApplicationStatusPerCount } from '../Classes/application-review';
declare var require: any;
let accessibility = require('highcharts/modules/accessibility');
let series = require('highcharts/modules/series-label');
let exporting = require('highcharts/modules/exporting');
let exportData = require('highcharts/modules/export-data');


accessibility(Highcharts);
series(Highcharts);
exporting(Highcharts);
exportData (Highcharts);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit  {
    public AppPerStatusCount: any;
    canvas: any;
    ctx: any;
    objApplicationDetailReport : ApplicationDetailReport;
    lstApplicationStatusPerCount : ApplicationStatusPerCount [];
    constructor(private _svc: SharedServicesService,private GlobalVariableService : GlobalVariableService) 
    { 
      this.objApplicationDetailReport = new ApplicationDetailReport();
  
    }
  ngOnInit() {
    this.getGraph();
  }
  getGraph()
  { 
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
        Highcharts.chart('barchart', this.AppPerStatusCount);
      })
      
      
    
  }
  ngAfterViewInit() {
    // this.canvas = document.getElementById('myChart');
    // this.ctx = this.canvas.getContext('2d');
    // let myChart = new Chart(this.ctx, {
    //   type: 'pie',
    //   data: {
    //       labels: ["New", "In Progress", "On Hold"],
    //       datasets: [{
    //           label: '# of Votes',
    //           data: [1,2,3],
    //           backgroundColor: [
    //               'rgba(255, 99, 132, 1)',
    //               'rgba(54, 162, 235, 1)',
    //               'rgba(255, 206, 86, 1)'
    //           ],
    //           borderWidth: 1
    //       }]
    //   },
    //   options: {}
    // });
  }

  barchart = {
    chart: {
        id: 'MainChart',
        group: 'BacktestCharts',
        animations: {
            enabled: false
        },
        stacked: false,
        zoom: {
            type: 'x',
            enabled: true
        },
        toolbar: {
            autoSelected: 'zoom',
            show: true
        },
        background: '#fff'
    },
    annotations: {
        points: []
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
    },
    title: {
        text: 'Backtest Chart',
        align: 'left'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
        }
    },
    xaxis: {
        type: 'datetime',
    },
    stroke: {
        width: 1
    },

    tooltip: {
        shared: false,
        x: {
            format: 'dd MMM - HH : mm '
        }
    }
}
secondChartOptions = {
chart: {
id: `second`,
group: 'BacktestCharts',
animations: {
    enabled: false
},
stacked: false,
zoom: {
    type: 'x',
    enabled: true
},
background: '#fff',
toolbar: {
    show: false
}
},
annotations: {
points: []
},
dataLabels: {
enabled: false
},
markers: {
size: 0,
},
title: {
text: undefined,
align: 'left'
},
fill: {
type: 'gradient',
gradient: {
    shadeIntensity: 1,
    opacityFrom: 0.7,
    opacityTo: 0.9,
    stops: [0, 100]
}
},
xaxis: {
type: 'datetime',
},
stroke: {
width: 1
},

tooltip: {
shared: false,
x: {
    format: 'dd MMM - HH : mm '
}
}
}
}
