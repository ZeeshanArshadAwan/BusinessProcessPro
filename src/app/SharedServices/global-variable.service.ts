import { Injectable } from '@angular/core';
import { Login, Sys_Modules, FormsAgainstModuleId, Sys_Forms } from '../Classes/login';
import { CommonDialogModel, CommonModalsComponent } from '../common-modals/common-modals.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
// import { StorageService } from 'ngx-webstorage-service';
import { SharedServicesService } from './shared-services.service';
// import { AppSetting } from '../Classes/app-setting';
// import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationTools, ApplicationTypeFields, ApplicationInfo, ApplicationsCount } from '../Classes/application-review';
import { ApplciationTypePanels, FieldListItems, listSelectData, FieldListGroups } from '../Classes/application-work-flow-class';
import { DisplayControls, DynamicDataTable, RepeaterData } from '../Classes/Applications';
import { ApplicationValues } from '../Classes/ApplicationValues';
import * as $ from 'jquery';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as Highcharts from 'highcharts';
//StorageServiceModule


@Injectable({
  providedIn: 'root'
})

export class GlobalVariableService {

  @BlockUI() blockUI: NgBlockUI;
  STORAGE_KEY = 'local_todolist';

  //Number Section
  Applicationid: number = 0;
  ApplicationTypeCategory: number = 0;
  FieldID: number;
  ApplicationTypeId: number;
  AppDetailtable: boolean = false;
  isEn: boolean = true;
  IsappDetails: boolean = false;
  editProspectMode: boolean = true;
  IsTemplateDownLoad: boolean = false;
  IsDocumentUpload: boolean = false;
  applicationdetaildiv: boolean = false;
  bDisplayControls: boolean = true;
  ApplicationTools: ApplicationTools;
  AssignedApplication: boolean = false;
  isAllapplication: boolean = false;
  isApplicationHistory: boolean = false;

  //String Section
  activeMenue: string = "";
  parameterID: string = '';
  coloumns: string = "";
  jsoncoloumnarray: string = "";
  jsondatafield: string = "";
  ItemList: any;

  //List Section 
  FieldListItemsData: FieldListItems[];
  ApplicationValues: ApplicationValues[];
  listSelectData: listSelectData[];
  ListFieldItems: FieldListItems[];
  ColoumnList: any = [];
  ColoumnArray = [];
  DataFieldsArray = [];
  DynamicDataTable: DynamicDataTable[];
  GetDatatableColoumns: DynamicDataTable[];
  glbApplciationTypePanels: ApplciationTypePanels[];
  controllsApplicationTypeFields: ApplicationTypeFields[];
  fieldData: ApplicationTypeFields[];
  listRepeaterData: RepeaterData[];

  //Object Section 
  objDynamicDataTable: DynamicDataTable;
  formtoDisplay: FormsAgainstModuleId;
  objApplicationInfo: ApplicationInfo;
  objlistSelectData: listSelectData;
  FieldListItems: FieldListItems;
  objPanelInfo: ApplciationTypePanels;
  objRepeaterData: RepeaterData;
  userPrevilieges: Login;
  Sys_Forms: Sys_Forms;


  ///for charts
  public BarChart: any;
  public PieChart: any;
  chartData = [];
  lstApplicationSCount: ApplicationsCount[];
  TOTAL_APP_PENDING: number = 0;
  TOTAL_APP_COMPLETED: number = 0;
  TOTAL_APP_REJECTED: number = 0;
  ////////////////////Validation////////////////
  lstTotalApps: any[]  
  //End Charts

  //****charts**** */
  public AppPerStatusCount2: any;
  TOTAL_APPLICATIONS: number = 0;
  TOTAL_TODAY_APP_PENDING: number = 0;
  TOTAL_TODAY_APP_COMPLETED: number = 0;
  //****** */
  constructor(public dialog: MatDialog, private _svc: SharedServicesService) {
    // this.ipLink = '"http://192.168.168.144/VMSService/api/definition/';
    this.formtoDisplay = new FormsAgainstModuleId();
    this.Sys_Forms = new Sys_Forms();
    // this.GroupSySModule = [];
    this.objlistSelectData = new listSelectData;
    this.listSelectData = [];
    this.FieldListItemsData = [];
    this.ApplicationTools = new ApplicationTools();
    this.FieldListItems = new FieldListItems();
    this.objPanelInfo = new ApplciationTypePanels();
    this.glbApplciationTypePanels = [];
    this.fieldData = [];
    this.objApplicationInfo = new ApplicationInfo();
    this.ApplicationValues = [];
    this.ListFieldItems = [];
    this.DynamicDataTable = [];
    this.GetDatatableColoumns = [];
    // this.lstformtoDisplay = [];
    this.objDynamicDataTable = new DynamicDataTable();

    this.objRepeaterData = new RepeaterData();
    this.listRepeaterData = [];
  }
  public dataSource = new MatTableDataSource<FieldListGroups>();



  openDialog(title: string, Msg: string): void {
    const message = Msg;
    const dialogData = new CommonDialogModel(title, message);

    const dialogRef = this.dialog.open(CommonModalsComponent, {
      width: '640px', disableClose: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {


    });

  }
  isStringNullOrEmplty(val: string) {
    if (val == null || val == "" || val == undefined)
      return true;
    else
      return false;
  }
  isNumberNullOrEmplty(val: number) {
    if (val == null || val == undefined)
      return true;
    else
      return false;
  }
  saveLocalstporage(key: string, values: FormsAgainstModuleId) {
    // this.STORAGE_KEY = key;
    // this.storage.set(this.STORAGE_KEY, values);
    // console.log(this.storage.get(this.STORAGE_KEY) || 'LocaL storage is empty');
    // this.LocalstorageService.saveLocalstporage(key,values);
  }


  GetAllPanelsByApplicationTypeId(ApplicationTypeId: number, Is_Global: boolean) {
    debugger;
    this.glbApplciationTypePanels = [];
    
    this.controllsApplicationTypeFields = [];
    this.blockUI.start();
    this._svc.getGenericParmas(ApplicationTypeId, "ApplicationTypeId", 'DynamicForm/GetAllPanelsByApplicationTypeId').subscribe(
      data => {
        
        this.blockUI.stop();
        this.glbApplciationTypePanels = [];
        this.glbApplciationTypePanels = data;
        this.GetAllFieldsByAppTypeId(ApplicationTypeId, Is_Global);
      }, (err) => {
        this.openDialog("Service Type ", "Some Error has been occured while Getting All entities.")
      }
    );
  }

  GetAllFieldsByAppTypeId(ApplicationTypeId: number, Is_from_Global: boolean) {

    this.DynamicDataTable = [];
    this.blockUI.start();
    this._svc.getGenericParmas(ApplicationTypeId, "ApplicationTypeId", 'DynamicForm/GetAllFieldsByAppTypeId').subscribe(
      data => {
        this.blockUI.stop();
        this.controllsApplicationTypeFields = [];
        this.controllsApplicationTypeFields = data;

        var x = this.controllsApplicationTypeFields.filter(x => x.FK_FieldType == 8);
        if (x.length > 0) {
          if (!Is_from_Global) {
            if (this.IsappDetails) {
              for (var i = 0; i < this.ItemList.length; i++) {
                for (var k = 0; k < this.controllsApplicationTypeFields.length; k++) {
                  if (this.ItemList[i].FK_FieldId == this.controllsApplicationTypeFields[k].FieldId)
                    this.controllsApplicationTypeFields[k].IsHidden = true;
                }
              }
            }
            else {
              for (var k = 0; k < this.controllsApplicationTypeFields.length; k++) {
                if (this.controllsApplicationTypeFields[k].FK_FieldType == 8) {
                  this.controllsApplicationTypeFields[k].IsHidden = false;
                } else {
                  this.controllsApplicationTypeFields[k].IsHidden = true;
                }
              }
            }
          }
        }
        this.listSelectData = [];
        setTimeout(() => {

          for (var i = 0; i < this.controllsApplicationTypeFields.length; i++) {

            if (this.controllsApplicationTypeFields[i].FK_FieldType == 6
              || this.controllsApplicationTypeFields[i].FK_FieldType == 9
              || this.controllsApplicationTypeFields[i].FK_FieldType == 8
            ) {
              this.chkDatafunc(this.controllsApplicationTypeFields[i].FieldId)
            }
            if (this.controllsApplicationTypeFields[i].FK_FieldType == 19) {
              this.GetAllDynamictableColoumns(this.controllsApplicationTypeFields[i].FieldId);
            }
            if (this.controllsApplicationTypeFields[i].FK_FieldType == 20) {

              var panel = this.controllsApplicationTypeFields[i].FK_PanelId;
              var filteredData = this.controllsApplicationTypeFields.filter(f => f.FK_PanelId = panel)
              var RepeaterColumName = "";
              for (var rd = 0; rd < filteredData.length; rd++) {

                if (filteredData[rd].FK_FieldType != 20) {
                  if (RepeaterColumName == "") {
                    RepeaterColumName = filteredData[rd].FieldCaption;
                  } else {
                    RepeaterColumName = RepeaterColumName + "," + filteredData[rd].FieldCaption;
                  }
                }
                // console.log("repeaters Colums ", RepeaterColumName)
              }
              this.pushDataIntoRepeater(this.controllsApplicationTypeFields[i].FieldId, RepeaterColumName, RepeaterColumName);

            }
            // if (this.controllsApplicationTypeFields[i].FK_FieldType == 20 )
            //  {
            //   for (let k = 0; k < this.glbApplciationTypePanels.length; k++) {
            //     var FieldList = this.controllsApplicationTypeFields.filter(a => a.FK_PanelId == this.glbApplciationTypePanels[k].PanelId)
            //     var colText = [];
            //     if (FieldList.length > 0) {
            //       for (let l = 0; l < FieldList.length; l++) {
            //         colText.push(FieldList[l].FieldCaption);
            //       }
            //     }
            //   }
            // }
          }
        }, 10);
      }, (err) => {
        this.openDialog("Service Type ", "Some Error has been occured while Getting All entities.")
      }
    );
  }
  pushDataIntoRepeater(id: any, Datatable: any, ColumnName: any) {
    this.objRepeaterData = new RepeaterData();
    this.objRepeaterData.id = id;
    // this.objRepeaterData.Datatable = Datatable;
    var x = ColumnName.split(",");
    this.objRepeaterData.ColumnName = x;
    this.objRepeaterData.Datatable = [];
    var hasrow = this.listRepeaterData.filter(s => s.id == this.objRepeaterData.id)
    if (hasrow.length == 0) {
      this.listRepeaterData.push(this.objRepeaterData);
      // this.listRepeaterData[0].Datatable = ;
    }
    else {
      for (var data = 0; data < this.listRepeaterData.length; data++) {
        if (this.listRepeaterData[data].id == this.objRepeaterData.id) {
          this.listRepeaterData[data] = this.objRepeaterData;
          // this.listRepeaterData[data].Datatable = [];
        }
      }
    }
  }
  // GetAllDynamictableColoumns(id: number) {
  //   
  //   this._svc.getGenericParmas(id, 'FK_FieldId', 'DynamicForm/GetAllFieldListItemsByFieldId').subscribe(
  //     data => {
  //       
  //       this.FieldListItemsData = [];
  //       this.FieldListItemsData = data;
  //       // this.pushdata(this.FieldListItemsData, id)

  //       this.addDataInDynamicTables(id, data, this.FieldListItemsData);
  //     }, (err) => {
  //       this.openDialog("Application", "Some Error has been occured.")
  //     }
  //   );
  // }
  // addDataInDynamicTables(id: number, datatable: any, columnName: any) {
  //   
  //   this.ColoumnList = [];
  //   this.ColoumnArray = [];
  //   this.coloumns = '';
  //   for (let i = 0; i < columnName.length; i++) {
  //     this.coloumns += columnName[i].FieldText + ","
  //   }
  //   this.ColoumnList = this.coloumns.split(',');

  //   for (let i = 0; i < this.ColoumnList.length; i++) {
  //     if (this.ColoumnList[i] != "") {
  //       this.DataFieldsArray.push({ name: this.ColoumnList[i], type: 'string' });
  //       this.ColoumnArray.push({ text: this.ColoumnList[i], dataField: this.ColoumnList[i], width: 200 });
  //     }
  //   }
  //  this.injectdata(id, this.ColoumnArray,this.objDynamicDataTable )

  // }
  // injectdata(id:number ,ColoumnArray: any , ColoumnList: any ){

  //   this.objDynamicDataTable = new DynamicDataTable();
  //   this.objDynamicDataTable.id = id;
  //   this.objDynamicDataTable.ColumnName = this.ColoumnArray;
  //   this.objDynamicDataTable.Datatable = this.ColoumnList;
  //   this.DynamicDataTable.push(this.objDynamicDataTable);
  // }
  getdata() {

    var a = this.FieldID;
    this._svc.GetDetails('DynamicForm/GetAllApplicationFieldsGroup').subscribe
      (
        data => {
          this.ItemList = data;
        }, (err) => {
          this.openDialog("Application", "Some Error has been occured.")
        }
      );
  }

  Showhidepanel(ItemId: any, fieldId: any, Is_Global: boolean) {

    if (!Is_Global) {
      var x = this.listSelectData.filter(x => x.id == fieldId);
      var y = [];
      if (x.length > 0) {
        for (var r = 0; r < x[0].FieldListItems.length; r++) {
          if (x[0].FieldListItems[r].FK_FieldId == fieldId) {
            y.push(x[0].FieldListItems[r])
          }
        }
      }

      if (this.ItemList.length > 0) {
        for (var k = 0; k < this.controllsApplicationTypeFields.length; k++) {
          var z = this.ItemList.filter(f => f.FK_FieldId == this.controllsApplicationTypeFields[k].FieldId
            && f.FK_ItemId == ItemId);
          if (z.length > 0) {
            if (this.controllsApplicationTypeFields[k].FieldId == z[0].FK_FieldId) {
              this.controllsApplicationTypeFields[k].IsHidden = false;
            }
            else {
              this.controllsApplicationTypeFields[k].IsHidden = true;

            }
          }
          else {
            var m = [];
            for (var j = 0; j < this.ItemList.length; j++) {
              for (var t = 0; t < y.length; t++)
                if (this.ItemList[j].FK_ItemId == y[t].ItemId) {
                  m.push(this.ItemList[j])
                }
            }
            if (m.length > 0) {
              for (var v = 0; v < m.length; v++) {
                if (this.controllsApplicationTypeFields[k].FieldId == m[v].FK_FieldId
                  && m[v].FK_ItemId == ItemId) {
                  this.controllsApplicationTypeFields[k].IsHidden = false;
                }
                else {
                  if (m[v].FK_ItemId != ItemId && m[v].FK_FieldId != fieldId) {
                    if (this.controllsApplicationTypeFields[k].FieldId == m[v].FK_FieldId
                      && this.controllsApplicationTypeFields[k].FK_FieldType != 8)
                      this.controllsApplicationTypeFields[k].IsHidden = true;
                  }
                }
              }
            }
            else {
              if (this.controllsApplicationTypeFields[k].FK_FieldType == 8) {
                this.controllsApplicationTypeFields[k].IsHidden = false;
              } else if (this.controllsApplicationTypeFields[k].FK_PanelId == fieldId) {
                this.controllsApplicationTypeFields[k].IsHidden = true;
              }
            }
          }
        }
      }
    }
  }
  editControll(PanelId: number) {
    this.objPanelInfo = this.glbApplciationTypePanels.filter(x => x.PanelId == PanelId)[0];
  }
  getUserID() {
    var a = JSON.parse(localStorage.getItem("BPPobjlogin"));
    return a.ID;
  }
  getName() {
    var a = JSON.parse(localStorage.getItem("BPPobjlogin"));
    return a.UserName;
  }
  getFieldValuesByApptypeid() {
debugger;
    var id = '';
    if (this.parameterID != '') {
      id = this.parameterID;
    }
    else {
      id = this.Applicationid.toString();
    }
    //test comment below
    if(this.isApplicationHistory){
      id = this.Applicationid.toString();
    } 
    
    if (!this.isStringNullOrEmplty(id) && id != "0") {
      this._svc.getGenericParmas(id, "AppId", 'Application/GetApplicationDetails').subscribe(
        data => {
          this.fieldData = data;
        });
    }

  }
  chkDatafunc(id: number) {
    this._svc.getGenericParmas(id, 'FK_FieldId', 'DynamicForm/GetAllFieldListItemsByFieldId').subscribe(
      data => {

        this.FieldListItemsData = [];
        this.ColoumnList = [];
        this.FieldListItemsData = data;
        this.pushdata(this.FieldListItemsData, id)
      }, (err) => {
        this.openDialog("Application", "Some Error has been occured.")
      }
    );
  }
  pushdata(FieldListItems: FieldListItems[], id: number) {

    this.objlistSelectData = new listSelectData();
    this.objlistSelectData.FieldListItems = FieldListItems;
    this.objlistSelectData.id = id;
    if (this.objlistSelectData.FieldListItems.length > 0) {
      var a = this.listSelectData.filter(x => x.id == id)
      if (a.length < 1) {
        this.listSelectData.push(this.objlistSelectData);

      }
    }
    for (let i = 0; i < this.objlistSelectData.FieldListItems.length; i++) {
      this.coloumns += this.objlistSelectData.FieldListItems[i].FieldText + ","
    }
    this.ColoumnList = this.coloumns.split(',');

  }
  GetAllDynamictableColoumns(id: number) {
    this._svc.getGenericParmas(id, 'FK_FieldId', 'DynamicForm/GetAllFieldListItemsByFieldId').subscribe(
      data => {

        this.FieldListItemsData = [];
        this.FieldListItemsData = data;
        this.addDataInDynamicTables(id, data, this.FieldListItemsData);
      }, (err) => {
      }
    );
  }
  addDataInDynamicTables(id: number, datatable: any, columnName: any) {
    this.ColoumnList = [];
    this.ColoumnArray = [];
    this.coloumns = '';
    for (let i = 0; i < columnName.length; i++) {
      this.coloumns += columnName[i].FieldText + ","
    }
    this.ColoumnList = this.coloumns.split(',');

    for (let i = 0; i < this.ColoumnList.length; i++) {
      if (this.ColoumnList[i] != "") {
        this.DataFieldsArray.push({ name: this.ColoumnList[i], type: 'string' });
        this.ColoumnArray.push({ text: this.ColoumnList[i], dataField: this.ColoumnList[i], width: 200 });
      }
    }
    this.injectdata(id, this.ColoumnArray, this.objDynamicDataTable)
  }
  injectdata(id: number, ColoumnArray: any, ColoumnList: any) {
    this.objDynamicDataTable = new DynamicDataTable();
    this.objDynamicDataTable.id = id;
    this.objDynamicDataTable.ColumnName = ColoumnArray;
    this.objDynamicDataTable.Datatable = ColoumnList;
    var hasVal = this.DynamicDataTable.filter(x => x.id == id)
    if (hasVal.length == 0) {
      this.DynamicDataTable.push(this.objDynamicDataTable);
    }
  }
  GetAlltableColoumnsyFields(ColName: string) {

    var test = ColName;

  }


  //For Charts
  
GetApplicationCount() {
  this._svc.GetDetails("ApplicationType/GetAllApplicationCount").subscribe(
    data => {
      
      this.lstTotalApps = data;

      for (var i = 0; i < this.lstTotalApps.length; i++) {
        this.chartData.push({
          "name": this.lstTotalApps[i].App_Date,
          "y": this.lstTotalApps[i].Total_Apps
        })
      }
      this.GetChart();
    }
  )

}  
GetChart() {
  this.BarChart = {
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
      text: 'Total Applications Datewise',
      enabled: false
    },
    colors: ['#1d2b36'],
    subtitle: {
      text: ''
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
        text: 'Total Applications'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Applications: <b>{point.y}</b>'
    },
    series: [{
      name: 'Total Applications',
      data: this.chartData,
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y}', // one decimal
        y: 1, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    }]
  }
  Highcharts.chart('barchart', this.BarChart);
}

GetPieChart() {
  this.PieChart = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    title: {
      text: 'Applications Status'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: [{
        name: 'Approved',
        y: this.TOTAL_APP_COMPLETED,
        sliced: true,
        selected: true
      }, {
        name: 'Pending',
        y: this.TOTAL_APP_PENDING
      }, {
        name: 'Rejected',
        y: this.TOTAL_APP_REJECTED
      }]
    }]
  }
  Highcharts.chart('piechart', this.PieChart);
}

//******************** */
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
          }
  })
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
          text: 'Application Statistics',
          style: {
              fontSize: '18px'
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
  Highcharts.chart('barchart2', this.AppPerStatusCount2);
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

//************************ */

}
