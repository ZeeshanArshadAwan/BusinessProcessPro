import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { WorkFlowApi } from '../Classes/WorkFlowApi';
import $ from 'jquery';
import { url } from 'inspector';
import { Options } from 'selenium-webdriver/chrome';
import { ApplicationType, ApplciationTypePanels } from '../Classes/application-work-flow-class';
import { ApplicationStatus } from '../Classes/application-review';
import { PopupModalComponent, PopUpModal } from './popup-modal/popup-modal.component';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';

@Component({
  selector: 'app-work-flow-api',
  templateUrl: './work-flow-api.component.html',
  styleUrls: ['./work-flow-api.component.css']
})
export class WorkFlowApiComponent implements OnInit {
  FormName: string = '';
  WorkFlowApi:WorkFlowApi;
  WorkFlowList:WorkFlowApi[];
  ApplicationTypeList:ApplicationType[];
  ApplicationStatusList:ApplicationStatus[];
  ApplicationPanelList:ApplciationTypePanels[];
  DivAppType:boolean=false;
  DivWorkFlowAPI:boolean=false;
  ApplicationTypeId:number=0;
  WorkFlowAPIId:number=0;
  IdsList:any=[];



  
  constructor(private httpclient: HttpClient,private _svc: SharedServicesService, private GlobalVariableService: GlobalVariableService,public dialog: MatDialog, private cdRef: ChangeDetectorRef) {
    this.WorkFlowApi=new WorkFlowApi();
    this.WorkFlowList=[];
    this.ApplicationTypeList=[];
    this.ApplicationStatusList=[];
    this.ApplicationPanelList=[];
   }
  public dataSource = new MatTableDataSource<WorkFlowApi>();
  public displayedColumns = ['select', 'CallType', 'Api', 'action','Test','Parameter'];
  public AppTypelist=new MatTableDataSource<ApplicationType>();
  public displayedColumnss = ['ApplicationNoAbbreviation','ApplicationTypeEn', 'ApplicationTypeAr', 'action'];
  
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.FormName = localStorage.getItem("BPPFromNameEn");
    this.DivAppType=true;
  this.GetAllApplicationType();
  }
  GetAllApis(id:any){
    
    this._svc.getGenericParmas(id,"id",'DynamicApi/GetAllWorkFlowApiByApptypeId').subscribe(
      data => {
        
        this.WorkFlowList = data;
        this.dataSource.data= this.WorkFlowList;
      }
    );

  }

  GetAllApplicationType(){
    this._svc.GetDetails("ApplicationType/GetAllApplicationTypes").subscribe(

      data => {
        //  this.lstCompanies = data;
        
        this.ApplicationTypeList = data;
        this.AppTypelist.data=this.ApplicationTypeList;
      //  this.GetAllApis();
        // this.dataSource.data = this.WorkFlowApi;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;

      }, (err) => {
        this.GlobalVariableService.openDialog('Application', 'Error Occured while Getting Record.');
      });


  }
  GetAllApplicationTypeStatusByTypeId(typeid:number){
    this._svc.getGenericParmas(typeid,"id","ApplicationType/GetAllApplicationStatusbyTypeid").subscribe(
      data => {
        //  this.lstCompanies = data;
        
        this.ApplicationStatusList = data;
        
       this.GetAllApis(typeid);
        // this.dataSource.data = this.WorkFlowApi;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;

      }, (err) => {
        this.GlobalVariableService.openDialog('Application', 'Error Occured while Getting Record.');
      });


  }
  GetAllAplicationPanelsbyTypeId(typeid:number){
    this._svc.getGenericParmas(typeid,"ApplicationTypeId","DynamicForm/GetAllPanelsByApplicationTypeId").subscribe(
      data => {
        //  this.lstCompanies = data;
        
        this.ApplicationPanelList = data;
        // this.dataSource.data = this.WorkFlowApi;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;

      }, (err) => {
        this.GlobalVariableService.openDialog('Application', 'Error Occured while Getting Record.');
      });

  }
  Clear(){
    this.WorkFlowApi=new WorkFlowApi();
  }
  
  SaveWorkFlowApi(){
    
  this.WorkFlowApi.CREATED_BY=this.GlobalVariableService.getUserID();
  this.WorkFlowApi.LAST_UPDATED_BY=this.GlobalVariableService.getUserID();
  this.WorkFlowApi.FK_ApplicationTypeId=this.ApplicationTypeId;
    this._svc.SaveworkFlowApi(this.WorkFlowApi, "Application/SaveWorkFlowApi").subscribe(

      data => {
        //  this.lstCompanies = data;
        this.WorkFlowApi = data;
       this.GetAllApis(this.ApplicationTypeId);
        // this.dataSource.data = this.WorkFlowApi;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;

      }, (err) => {
        this.GlobalVariableService.openDialog('Application', 'Error Occured while Getting Record.');
      });
  }
  GetApiDetail(){
    this._svc.GetDetails('Application/GetAllWorkFlowApi').subscribe(
      data => {
        
        this.WorkFlowApi = data;
        // var worlflowlength=this.workflowapi;
         for(let i=0; i<data.length; i++)
          {
        if(this.WorkFlowApi[i].CallType=="Get")
        {
          var body=this.WorkFlowApi[i].Body.split(':')[0];
          // var parameter=JSON.parse(body.toString()); 
          var parameter= body.replace('[{',"");
          var paramName=parameter.replace(/"/g, "");
          // var paramNamee=paramName;
          // let param1 = new HttpParams().set(paramName,1);
        //  var dataa= this.httpclient.get(this.workflowapi[i].Api, { params: param1 });
  
          
        this._svc.getGenericParmasfordynamicapi(2,paramName,this.WorkFlowApi[i].Api).subscribe(
          dataa => {
            
            // this.workflowapi = data[0];
           alert(dataa);
          }, (err) => {
            this.GlobalVariableService.openDialog(this.FormName, "Error Occured while requesting Api.")
          }
        );
      }
      else{
  
  
        // const xmlhttp = new XMLHttpRequest();
        // xmlhttp.open('POST', this.workflowapi.Api, true);
        // const input_element = <HTMLInputElement> document.getElementById('choosenNumber');
    
        // // console.log('chVal : ' + input_element.value);
        // // const choosenNumberValue = input_element.value;
    
        // // The following variable contains the xml SOAP request.
        // const sr =
        //     `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mat="http://mathsutility.test.com/">
        //        <soapenv:Header/>`+
        //         this.workflowapi.Body;
        //         +
        //       `</soapenv:Envelope>`;
    
        // xmlhttp.onreadystatechange =  () => {
        //     if (xmlhttp.readyState == 4) {
        //         if (xmlhttp.status == 200) {
        //             const xml = xmlhttp.responseXML;
        //             // Here I'm getting the value contained by the <return> node.
        //             const response_number = parseInt(xml.getElementsByTagName('return')[0].childNodes[0].nodeValue);
        //             // Print result square number.
        //             console.log(response_number);
        //         }
        //     }
        // }
        // // Send the POST request.
        // xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        // xmlhttp.responseType = 'document';
        // xmlhttp.send(sr);
     
  
  
  
  
  
  
  
  
  
        // const headers = new HttpHeaders({responseType: 'text' , 'Content-Type': this.workflowapi.Header });
        // let body=this.workflowapi.Body;
        // const hdr = {headers:headers , body:body};
        // var body=JSON.stringify(this.workflowapi.Body);
         var newObject = $.parseJSON(this.WorkFlowApi[i].Body);
         this._svc.postDynamicApi(newObject , this.WorkFlowApi[i].Api).subscribe(
          data => {
            alert(data);
            // this.FormName = data.FormName;
         
          }, (err) => {
            this.GlobalVariableService.openDialog(this.FormName, "Error Occured while getting logo.")
          }
        );
      }
     }
      }, (err) => {
        this.GlobalVariableService.openDialog(this.FormName, "Error Occured while getting details.")
      }
    );
  }
SaveWorkFloApiwithHeaders(id:any){
  
var Api=this.dataSource.data.filter(x => x.WorkFlowApiId == id)[0];
if(Api.CallType=="Get")
{
  var body=Api.Body.split(':')[0];
        // var parameter=JSON.parse(body.toString()); 
        var parameter= body.replace('[{',"");
        var paramName=parameter.replace(/"/g, "");
  this._svc.getGenericParmas(23,paramName,'ApplicationType/GetApplicationTypebyId').subscribe(
    data => {
      
      var test=data;
       test=JSON.stringify(test);
     alert(test);
      // var worlflowlength=this.workflowapi;
    // else{
    //    var newObject = $.parseJSON(this.WorkFlowApi[i].Body);
    //    this._svc.postDynamicApi(newObject , this.WorkFlowApi[i].Api).subscribe(
    //     data => {
    //       alert(data);
    //       // this.FormName = data.FormName;
    //     }, (err) => {
    //       this.GlobalVariableService.openDialog(this.FormName, "Error Occured while getting logo.")
    //     }
    //   );
    // }
   //}
    }, (err) => {
      this.GlobalVariableService.openDialog(this.FormName, "Error Occured while getting details.")
    }
  );
  }

  else{
    var newObject = $.parseJSON(Api.Body);
    // var StatusAndremarks={
    //   ApplicationId:0,
    //   Remarks:"",
    //   FK_ActiveStatus:1
    // }
    
        // var parameter=JSON.parse(body.toString()); 
        var parameter= Api.Header.replace('{{',"");
        var parameterr= parameter.replace('}}',"");
        var paramName=parameterr.replace(/"/g, "");
        var headersSplit=paramName.split(',');
        let options;
        let headers = new HttpHeaders();
        for(let i=0; i<headersSplit.length; i++)
        {
          var ParamSplit=headersSplit[i].split(':');
          var Param=ParamSplit[0].toString();
          var Value=ParamSplit[1].toString();
          // let headers =new HttpHeaders().set(Param, Value);
         headers=headers.set(Param,Value);
        }
        // var total =headersparam.replace(/"/g, ''); 
        options = { headers: headers};
        let url = `${Api.Api}/post`;
        // this.httpclient.post(url, {Custom:"test",goo:"loo"}).subscribe(res => console.log(res));
        this.httpclient.post(url, newObject,options).subscribe(res => alert(res));
  }
}
AddApiParameters(id:number){

this.WorkFlowAPIId=id;
  const message = "PopUp";
  const title = "Add Parameters"
  // const dialogData = new EcslationModel(id, title);
  const dialogData = new PopUpModal(title,this.ApplicationTypeId,this.WorkFlowAPIId);
  const dialogRef = this.dialog.open(PopupModalComponent, { disableClose: true,
    width: '80%',
    maxHeight: '70%',
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(result => {
  });
}

  GetApp(id:number){
    
this.WorkFlowApi=this.WorkFlowList.filter(a=>a.WorkFlowApiId==id)[0];
this.WorkFlowApi.ApiType=this.WorkFlowApi.ApiType.toString();
  }


  AddApiForm(id:number){

    this.ApplicationTypeId=id;
    this.GetAllApplicationTypeStatusByTypeId(this.ApplicationTypeId);
    this.GetAllAplicationPanelsbyTypeId(this.ApplicationTypeId);
    this.GlobalVariableService.GetAllFieldsByAppTypeId(this.ApplicationTypeId);
    this.GetAllApis(this.ApplicationTypeId);
    this.DivWorkFlowAPI=true;
    this.DivAppType=false;
     


  }

  Multipledeletion(event,id:number){

if (event.checked) {
  this.IdsList.push(id)
}
else
{
  const index: number = this.IdsList.indexOf(id);
  if (index !== -1) {
      this.IdsList.splice(index, 1);
  }        
  
}

  }

  Delete() {
    this.confirmDialog();
  }
  confirmDialog(): void {

    const message = 'Are you sure you want to delete?';
    const dialogData = new CustomConfirmDialogModel("Application", message);
    const dialogRef = this.dialog.open(CustomConfirmModalsComponent, {
      maxWidth: "90%",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {


      if (dialogResult) {
        this.confirmDelete();
      }
    });
  }
  confirmDelete() {
    
    var IdList= JSON.stringify(this.IdsList);
    this._svc.getGenericParmas(IdList.toString(),"Ids", 'DynamicApi/DeleteWorkFlowApi').subscribe(
      data => {
        this.GetAllApis(this.ApplicationTypeId);
        this.GlobalVariableService.openDialog("Application", data);

      }, (err) => {
        this.GlobalVariableService.openDialog("Application", "Some Error has been occured while Getting All entities.")
      }
    );

  }





}


