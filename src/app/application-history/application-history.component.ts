import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { ApplicationType, Sys_Groups } from '../Classes/application-work-flow-class';
import { Sys_Users } from '../Classes/login';
import { Validators, FormControl } from '@angular/forms';
import { ApplicationStatus, AllApplication, ApplicationInfo } from '../Classes/application-review';
import { Router } from '@angular/router';
import { BaseComponent } from '../SharedServices/base-component';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';

@Component({
  selector: 'app-application-history',
  templateUrl: './application-history.component.html',
  styleUrls: ['./application-history.component.css']
})
export class ApplicationHistoryComponent   extends BaseComponent implements OnInit {
  FormName: string = '';
  showDetail: boolean = false;
  lstApplicationType : ApplicationType
  lstSys_Groups: Sys_Groups[]
  lstSys_Users : Sys_Users[]
  lstApplicationStatus:ApplicationStatus[]
  objAllAplication : AllApplication
  lstApplicationInfo : ApplicationInfo []
  AssignedGroup:number=0;
  FK_AssignedUser:number = 0;
  ////////////////////Validation////////////////
  errorMsg: string = '';
  ApplicationType = new FormControl('', [
    Validators.required
  ]);
  Applicant = new FormControl('', [
    Validators.required
  ]);
  ApplicationStatus = new FormControl('', [
    Validators.required
  ]);

  // AssignedGroup = new FormControl('', [
  //   Validators.required
  // ]);
  datePipe: any;
  
  constructor(public languageTranslateService: LanguageTranslateService ,private _svc: SharedServicesService,public GlobalVariableService : GlobalVariableService,private router: Router) {
    super(languageTranslateService);
    this.objAllAplication = new AllApplication();
    
   }
  public dataSource = new MatTableDataSource<ApplicationInfo>();

  selection = new SelectionModel<any>(true, []);
  public displayedColumns = ['select', 'ApplicationNo', 'ApplicationTypeEn', 'StatusNameEn','ApplicationDate', 'action']
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    if(this.GlobalVariableService.isEn){
      this.FormName = localStorage.getItem("BPPFromNameEn");
    }
    else {
      this.FormName = localStorage.getItem("BPPFromNameAr");
    }
    this.GetApplicationTypeList();
    this.GetUserList();
    this.GetApplicationStatusList(0);
    this.GetAssignedGroupList();
    this.Search();
    //this.objAllAplication.FromDate = this.datePipe.transform(this.objAllAplication.FromDate, 'yyyy-MM-dd');
  }

  GetUserList() {
    this._svc.GetDetails("User/GetAll").subscribe(
      data => {
        
        this.lstSys_Users = data;
      } 
    )

  }
  GetUserListByGroup(index: number = 0) {

    this._svc.getGenericParmas(index,'GroupId','User/GetAllUsersByGroupId').subscribe(
      data => {
        this.lstSys_Users = data;
      })
  }
  GetApplicationTypeList() {
    this._svc.GetDetails("ApplicationType/GetAllApplicationTypes").subscribe(
      data => {
        
        this.lstApplicationType= data;
      } 
    )
  }
  GetAssignedGroupList() {
    this._svc.GetDetails("Company/GetAllGroups").subscribe(
      data => {
        
        this.lstSys_Groups  = data;
      } 
    )
  }
  GetApplicationStatusList(index: number = 0)
  {
    this._svc.getGenericParmas(index,'id','ApplicationType/GetAllApplicationStatusbyTypeid').subscribe(
      data => {
        this.lstApplicationStatus = data;
      })  
  }
  NextPage(){
    this.showDetail = !this.showDetail;
  }
  
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {

    let reader = e.target;
    //this.imageSrc = reader.result;
    //this.objappSetting.Companyimage = reader.result;
    //this.imagepath = this.objappSetting.Companyimage.replace('data:image/png;base64,', '');
    //this.transform();
  }
  Clear(){
    this.objAllAplication = new AllApplication();
  }

  filterChanged (selectedValue: any)
  {
     alert (selectedValue);

  }

  OnchangeApptype(id: any)
  {
    
    this.GetApplicationStatusList(id);
  }

  OnchangeAssigned(id: any)
  {
    this.GetUserListByGroup(id);
  }
  Search()
  {
    var a = JSON.parse(localStorage.getItem("BPPobjlogin"));
    this.objAllAplication.UserId=a.ID;
    this._svc.SearchApplications(this.objAllAplication, "Application/GetAllApplicationsForViewWorked").subscribe(
      data => {
        //  this.lstCompanies = data;
          this.lstApplicationInfo = data;
          this.dataSource.data = this.lstApplicationInfo;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
       
      }, (err) => {
        this.GlobalVariableService.openDialog('Application', 'Error Occured while Getting Record.')
      });

  }
  selectApp(id:number){
   
    
     this.GlobalVariableService.blockUI.start();
    this._svc.getGenericParmas(id, 'AppId', 'Application/GetApplicationDetails').subscribe(
      data => {
       debugger;
       this.GlobalVariableService.blockUI.stop();
        this.GlobalVariableService.objApplicationInfo = new ApplicationInfo;
        this.GlobalVariableService.objApplicationInfo = data;
        this.GlobalVariableService.Applicationid=id;
      
        // console.log(data);
        this.GlobalVariableService.applicationdetaildiv = true;
        this.GlobalVariableService.isApplicationHistory=true;
        if(this.GlobalVariableService.objApplicationInfo.AllowTemplateDownload==true)
      {
        this.GlobalVariableService.IsTemplateDownLoad=true;
      }
      else{
        this.GlobalVariableService.IsTemplateDownLoad=false
      }
      if(this.GlobalVariableService.objApplicationInfo.AllowEdit==true)
      {
      this.GlobalVariableService.editProspectMode=true;
      }
      else
      {
      this.GlobalVariableService.editProspectMode=false;
      }
      if(this.GlobalVariableService.objApplicationInfo.AllowUploadDocuments==true)
      {
        this.GlobalVariableService.IsDocumentUpload=true;
      }
      else{
        this.GlobalVariableService.IsDocumentUpload=false;
      }
      if(this.GlobalVariableService.objApplicationInfo.ApplicationTypeCategory==2||this.GlobalVariableService.objApplicationInfo.ApplicationTypeCategory==3)
      {
        this.GlobalVariableService.ApplicationTypeCategory=this.GlobalVariableService.objApplicationInfo.ApplicationTypeCategory;
        this.GlobalVariableService.AppDetailtable=true
      }
      else{
        this.GlobalVariableService.ApplicationTypeCategory=this.GlobalVariableService.objApplicationInfo.ApplicationTypeCategory;
        this.GlobalVariableService.AppDetailtable=false
      }
        this._svc.getGenericParmas(this.GlobalVariableService.objApplicationInfo.ApplicationId, 'ApplicationId', 'DynamicForm/GetApplicationValuesByApplicationId').subscribe(
          data => {
            // this.GlobalVariableService.editProspectMode = this.GlobalVariableService.editProspectMode == false?true:false;
            this.GlobalVariableService.ApplicationValues = data;
            this.GlobalVariableService.parameterID = this.GlobalVariableService.objApplicationInfo.ApplicationTypeId.toString();
          this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.objApplicationInfo.ApplicationTypeId,false);
          //this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.objApplicationInfo.ApplicationId,false);
              var myurl = `${"ApplicationDetail"}/${''}`;
              const that = this;
              that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                that.router.navigate([myurl])
              );  
          })
      })


      }

}
