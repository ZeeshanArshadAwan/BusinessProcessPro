import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js'
//import * as Highcharts from 'highcharts';
import * as Highcharts from 'highcharts/highcharts';
const HighchartsMore = require("highcharts/highcharts-more.src");
HighchartsMore(Highcharts);
const HC_solid_gauge = require("highcharts/modules/solid-gauge.src");
HC_solid_gauge(Highcharts);
// Now init modules:
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { ApplicationDetailReport, ApplicationStatusPerCount, ApplicationsCount } from '../Classes/application-review';
declare var require: any;
let accessibility = require('highcharts/modules/accessibility');
let series = require('highcharts/modules/series-label');
let exporting = require('highcharts/modules/exporting');
let exportData = require('highcharts/modules/export-data');
let solidgauge = require('highcharts/modules/solid-gauge');
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { BaseComponent } from '../SharedServices/base-component';
accessibility(Highcharts);
series(Highcharts);
exporting(Highcharts);
exportData(Highcharts);
solidgauge(Highcharts)
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent  implements OnInit, AfterViewInit {
    public AppPerStatusCount: any;
    public AppPerStatusCount1: any;
    public AppPerStatusCount2: any;
    canvas: any;
    ctx: any;
    id: string = '';
    User: string = '';
    TOTAL_APPLICATIONS: number = 0;
    TOTAL_APP_PENDING: number = 0;
    TOTAL_APP_COMPLETED: number = 0;
    TOTAL_APP_REJECTED: number = 0;
    TOTAL_TODAY_APP_PENDING: number = 0;
    TOTAL_TODAY_APP_COMPLETED: number = 0;
    objApplicationDetailReport: ApplicationDetailReport;
    lstApplicationStatusPerCount: ApplicationStatusPerCount[];
    lstApplicationSCount: ApplicationsCount[];
    constructor(public languageTranslateService: LanguageTranslateService,private _svc: SharedServicesService, public GlobalVariableService: GlobalVariableService) {
        super(languageTranslateService);
        this.objApplicationDetailReport = new ApplicationDetailReport();

    }
    ngOnInit() {
       
        this.getcounts();
        this.getGraph();
        this.id = this.GlobalVariableService.parameterID;
        this.User = localStorage.getItem("BPPUserName");
    }
    getcounts() {
        this._svc.GetCounts("Reports/ApplicationsCount").subscribe(
            data => {
               
                this.lstApplicationSCount = data;
                if (this.lstApplicationSCount.length > 0) {
                    this.TOTAL_APPLICATIONS = this.lstApplicationSCount[0].TOTAL_APPLICATIONS;
                    this.TOTAL_APP_PENDING = this.lstApplicationSCount[0].TOTAL_APP_PENDING;
                    this.TOTAL_APP_COMPLETED = this.lstApplicationSCount[0].TOTAL_APP_COMPLETED;
                    this.TOTAL_APP_REJECTED = this.lstApplicationSCount[0].TOTAL_APP_REJECTED;
                    this.TOTAL_TODAY_APP_PENDING = this.lstApplicationSCount[0].TOTAL_TODAY_APP_PENDING;
                    this.TOTAL_TODAY_APP_COMPLETED = this.lstApplicationSCount[0].TOTAL_TODAY_APP_COMPLETED;
                    this.getchart2();
                    this.getchart1();
                   
                }
        })
    }
    // getchart1(){
    //     function renderIcons() {

    //         // Exercise icon
    //         if (!this.series[0].icon) {
    //             this.series[0].icon = this.renderer.path(
    //                 ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
    //                     'M', 8, -8, 'L', 16, 0, 8, 8]
    //             )
    //                 .attr({
    //                     stroke: '#ffffff',
    //                     'stroke-linecap': 'round',
    //                     'stroke-linejoin': 'round',
    //                     'stroke-width': 2,
    //                     zIndex: 10
    //                 })
    //                 .add(this.series[1].group);
    //         }
    //         this.series[0].icon.translate(
    //             this.chartWidth / 2 - 10,
    //             this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
    //             (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
    //         );

    //         // Stand icon
    //         if (!this.series[2].icon) {
    //             this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
    //                 .attr({
    //                     stroke: '#303030',
    //                     'stroke-linecap': 'round',
    //                     'stroke-linejoin': 'round',
    //                     'stroke-width': 2,
    //                     zIndex: 10
    //                 })
    //                 .add(this.series[1].group);
    //         }

    //         this.series[2].icon.translate(
    //             this.chartWidth / 2 - 10,
    //             this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
    //             (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
    //         );
    //     }
    //     this.AppPerStatusCount1 = {
    //         chart: {
    //             type: 'solidgauge',
    //             height: '80%',
    //             events: {
    //                 render: renderIcons
    //             }
    //         }, exporting: {
    //             enabled: false
    //         },
    //         credits: {
    //             enabled: false
    //         },
    //         title: {
    //             text: '',
    //             style: {
    //                 fontSize: '24px'
    //             }
    //         },

    //         tooltip: {
    //             borderWidth: 0,
    //             backgroundColor: 'none',
    //             shadow: false,
    //             style: {
    //                 fontSize: '12px'
    //             },
    //             valueSuffix: '',
    //             pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
    //             positioner: function (labelWidth) {
    //                 return {
    //                     x: (this.chart.chartWidth - labelWidth) / 2,
    //                     y: 88
    //                 };
    //             }
    //         },

    //         pane: {
    //             center: ['50%', '50%'],
    //             size: '110%',
    //             startAngle: 0,
    //             endAngle: 360,
    //             background: [{ // Track for Exercise
    //                 outerRadius: '112%',
    //                 innerRadius: '88%',
    //                 backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get(),
    //                 borderWidth: 0
    //             }, { // Track for Stand
    //                 outerRadius: '87%',
    //                 innerRadius: '63%',
    //                 backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1]).setOpacity(0).get(),
    //                 borderWidth: 0
    //             }]
    //         },

    //         yAxis: {
    //             min: 0,
    //             max: 100,
    //             lineWidth: 0,
    //             tickPositions: []
    //         },

    //         plotOptions: {
    //             solidgauge: {
    //                 dataLabels: {
    //                     enabled: false
    //                 },
    //                 linecap: 'round',
    //                 stickyTracking: false,
    //                 rounded: true
    //             }
    //         },

    //         series: [{
    //             name: 'Approve',
    //             data: [{
    //                 color: '#00597b',
    //                 radius: '87%',
    //                 innerRadius: '63%',
    //                 y: this.TOTAL_APP_COMPLETED
    //             }]
    //         }, {
    //             name: 'Pending',
    //             data: [{
    //                 color: '#b8dfac',
    //                 radius: '62%',
    //                 innerRadius: '38%',
    //                 y: this.TOTAL_APP_PENDING
    //             }]
    //         }]
    //     }
    //     Highcharts.chart('barchart1', this.AppPerStatusCount1);
    // }
    getchart1(){
        this.AppPerStatusCount1 = {
            chart: {
                type: 'solidgauge',
                height: '110%'
            },
            exporting: {
                         enabled: false
                     },
            title: {
                text: '',
                style: {
                    fontSize: '0px'
                }
            },
        credits:{
            enabled:false
        },
        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '14px'
            },
            valueSuffix: '',
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
            positioner: function (labelWidth) {
                return {
                    x: (this.chart.chartWidth - labelWidth) / 1.9,
                    y: (this.chart.plotHeight / 2) -15
                };
            }
        },
        
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{ // Track for Move
                    outerRadius: '112%',
                    innerRadius: '88%',
                    backgroundColor: Highcharts.color('#00597b')
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, { // Track for Exercise
                    outerRadius: '87%',
                    innerRadius: '63%',
                    backgroundColor: Highcharts.color('#b8dfac')
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }]
            },
        
            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },
        
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },
            series: [{
                name: 'Approved',
                data: [{
                    color: '#00597b',
                    radius: '112%',
                    innerRadius: '88%',
                    y: this.TOTAL_APP_COMPLETED
                }]
            }, {
                name: 'Pending',
                data: [{
                    color: '#b8dfac',
                    radius: '87%',
                    innerRadius: '63%',
                    y: this.TOTAL_APP_PENDING
                }]
            }]
        };
    
       
        // this.AppPerStatusCount1 = {
        //     chart: {
        //         type: 'solidgauge',
        //         height: '90%',
        //         events: {
        //             render: renderIcons1
        //         }
        //     }, exporting: {
        //         enabled: false
        //     },
        //     credits: {
        //         enabled: false
        //     },
        //     title: {
        //         text: '',
        //         style: {
        //             fontSize: '12px'
        //         }
        //     },

        //     tooltip: {
        //         borderWidth: 0,
        //         backgroundColor: 'none',
        //         shadow: false,
        //         style: {
        //             fontSize: '14px'
        //         },
        //         valueSuffix: '',
        //         pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
                
        //         positioner: function (labelWidth) {
        //             return {
                        
        //                 x: (this.chart.chartWidth - labelWidth) / 2,
        //                 y: 88
        //             };
        //         }
        //     },

        //     pane: {
        //         startAngle: 0,
        //         endAngle: 360,
        //         background: [{ // Track for Move
        //             outerRadius: '112%',
        //             innerRadius: '88%',
        //             backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
        //                 .setOpacity(0)
        //                 .get(),
        //             borderWidth: 0
        //         }, { // Track for Exercise
        //             outerRadius: '87%',
        //             innerRadius: '63%',
        //             backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
        //                 .setOpacity(0)
        //                 .get(),
        //             borderWidth: 0
        //         }]
        //     },

        //     yAxis: {
        //         min: 0,
        //         max: 100,
        //         lineWidth: 0,
        //         tickPositions: []
        //     },

        //     plotOptions: {
        //         solidgauge: {
        //             dataLabels: {
        //                 enabled: false
        //             },
        //             linecap: 'round',
        //             stickyTracking: false,
        //             rounded: true
        //         }
        //     },

        //     series: [{
        //         name: 'Approved',
        //         data: [{
        //             color: '#00597b',
        //             radius: '112%',
        //             innerRadius: '88%',
        //             y: this.TOTAL_APP_COMPLETED
        //         }]
        //     }, {
        //         name: 'Pending',
        //         data: [{
        //             color: '#b8dfac',
        //             radius: '87%',
        //             innerRadius: '63%',
        //             y: this.TOTAL_APP_PENDING
        //         }]
        //     }]
        // }
        Highcharts.chart('barchart1', this.AppPerStatusCount1);
    }
    getchart2(){
       
        this.AppPerStatusCount2 =  {

            chart: {
                type: 'solidgauge',
                height: '110%'
                
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: '',
                style: {
                    fontSize: '0px'
                }
            },
        
            tooltip: {
                borderWidth: 0,
                backgroundColor: 'none',
                shadow: false,
                style: {
                    fontSize: '14px'
                },
                valueSuffix: '',
                pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
                positioner: function (labelWidth) {
                    return {
                        x: (this.chart.chartWidth - labelWidth) / 1.9,
                        y: (this.chart.plotHeight / 2) -15
                    };
                }
            },
        
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{ // Track for Move
                    outerRadius: '112%',
                    innerRadius: '88%',
                    backgroundColor: Highcharts.color('#00597b')
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, { // Track for Exercise
                    outerRadius: '87%',
                    innerRadius: '63%',
                    backgroundColor: Highcharts.color('#b8dfac')
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, { // Track for Stand
                    outerRadius: '62%',
                    innerRadius: '38%',
                    backgroundColor: Highcharts.color('#f7a35c')
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }]
            },
        
            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },
        
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },
        
            series: [{
                name: 'Approved',
                data: [{
                    color: '#00597b',
                    radius: '112%',
                    innerRadius: '88%',
                    y: this.TOTAL_APP_COMPLETED
                }]
            }, {
                name: 'Pending',
                data: [{
                    color: '#b8dfac',
                    radius: '87%',
                    innerRadius: '63%',
                    y: this.TOTAL_APP_PENDING
                }]
            }, {
                name: 'Rejected',
                data: [{
                    color: '#f7a35c',
                    radius: '62%',
                    innerRadius: '38%',
                    y: this.TOTAL_APP_REJECTED
                }]
            }]
        }
        


        // this.AppPerStatusCount2 = {
        //     chart: {
        //         type: 'solidgauge',
        //         height: '90%',
        //     }, exporting: {
        //         enabled: false
        //     },
        //     credits: {
        //         enabled: false
        //     },
        //     title: {
        //         text: '',
        //         style: {
        //             fontSize: '12px'
        //         }
        //     },

        //     tooltip: {
        //         borderWidth: 0,
        //         backgroundColor: 'none',
        //         shadow: false,
        //         style: {
        //             fontSize: '14px'
        //         },
        //         valueSuffix: '',
        //         pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
                
        //         positioner: function (labelWidth) {
        //             return {
                        
        //                 x: (this.chart.chartWidth - labelWidth) / 2,
        //                 y: 88
        //             };
        //         }
        //     },

        //     pane: {
        //         startAngle: 0,
        //         endAngle: 360,
        //         background: [{ // Track for Move
        //             outerRadius: '112%',
        //             innerRadius: '88%',
        //             backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
        //                 .setOpacity(0)
        //                 .get(),
        //             borderWidth: 0
        //         }, { // Track for Exercise
        //             outerRadius: '87%',
        //             innerRadius: '63%',
        //             backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
        //                 .setOpacity(0)
        //                 .get(),
        //             borderWidth: 0
        //         }, { // Track for Stand
        //             outerRadius: '62%',
        //             innerRadius: '38%',
        //             backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
        //                 .setOpacity(0)
        //                 .get(),
        //             borderWidth: 0
        //         }]
        //     },

        //     yAxis: {
        //         min: 0,
        //         max: 100,
        //         lineWidth: 0,
        //         tickPositions: []
        //     },

        //     plotOptions: {
        //         solidgauge: {
        //             dataLabels: {
        //                 enabled: false
        //             },
        //             linecap: 'round',
        //             stickyTracking: false,
        //             rounded: true
        //         }
        //     },

        //     series: [{
        //         name: 'Approved',
        //         data: [{
        //             color: '#00597b',
        //             radius: '112%',
        //             innerRadius: '88%',
        //             y: this.TOTAL_APP_COMPLETED
        //         }]
        //     }, {
        //         name: 'Pending',
        //         data: [{
        //             color: '#b8dfac',
        //             radius: '87%',
        //             innerRadius: '63%',
        //             y: this.TOTAL_APP_PENDING
        //         }]
        //     }, {
        //         name: 'Rejected',
        //         data: [{
        //             color: '#f7a35c',
        //             radius: '62%',
        //             innerRadius: '38%',
        //             y: this.TOTAL_APP_REJECTED
        //         }]
        //     }]
        // }
        Highcharts.chart('barchart2', this.AppPerStatusCount2);
    }
    getGraph() {
        this._svc.GetReport(this.objApplicationDetailReport, "Reports/ApplicationCountPerStatusGraph").subscribe(
            data => {
               
                this.lstApplicationStatusPerCount = data;
                var chartData = [];
                for (var i = 0; i < this.lstApplicationStatusPerCount.length; i++) {
                    chartData.push({
                        "name": this.lstApplicationStatusPerCount[i].ApplicationTypeEn,
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
                        text: '',
                        enabled: false
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
                            text: 'Status Count'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: 'Status Count: <b>{point.y:1f}</b>'
                    },
                    plotOptions: {
                        column: { //working here
                            colorByPoint: true,
                            //stacking: 'percent',
                        }
                    },
                    series: [{
                        name: 'Status',
                        data: chartData,
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
