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
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { BaseComponent } from '../SharedServices/base-component';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent extends BaseComponent implements OnInit {
  FormName: string = '';
  showDetail: boolean = false;
  lstApplicationType : ApplicationType
  lstSys_Groups: Sys_Groups[]
  lstSys_Users : Sys_Users[]
  lstApplicationStatus:ApplicationStatus[]
  objAllAplication : AllApplication
  lstApplicationInfo : ApplicationInfo []
  AssignedGroup:number = 0;
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
  
  constructor( public languageTranslateService: LanguageTranslateService ,   private _svc: SharedServicesService,public GlobalVariableService : GlobalVariableService,private router: Router) {
    super(languageTranslateService);
    this.objAllAplication = new AllApplication();
    
   }
  public dataSource = new MatTableDataSource<ApplicationInfo>();

  selection = new SelectionModel<any>(true, []);
  public displayedColumns = ['select', 'ApplicationNo', 'ApplicationTypeEn', 'StatusNameEn','ApplicationDate', 'action']
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    
    this.FormName = localStorage.getItem("BPPFromNameEn");
    this.GlobalVariableService.AssignedApplication= false;
    this.GlobalVariableService.isAllapplication= true;
    this.GetApplicationTypeList();
    this.GetUserList();
    this.GetApplicationStatusList(Number(this.GlobalVariableService.parameterID));
    this.GetAssignedGroupList();
    this.Search()
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
    
    this.objAllAplication.UserId = this.GlobalVariableService.getName();
    this._svc.SearchApplications(this.objAllAplication, "Application/GetMyApplicationsForSearch").subscribe(
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
  Clear(){

    this.objAllAplication=new AllApplication();
  }
// selectApp(id:number,typeId:number){
//   
//   this.GlobalVariableService.Applicationid=id;
//   this.GlobalVariableService.parameterID=typeId.toString();
//   this.GlobalVariableService.applicationdetaildiv=true;
//   this.GlobalVariableService.editProspectMode=true;
//   this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.Applicationid);
// var myurl = `${'ApplicationDetail'}/${''}`;
//     const that = this;
//     that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
//       that.router.navigate([myurl]));

// }

GetApp(index: any = 0) {
  

  // this._svc.getGenericParmas(index,'id','ApplicationType/GetAllApplicationStatusbyTypeid').subscribe(
  //   data => {
  //     this.lstApplicationStatus = data;
  //   })  
  this._svc.getGenericParmas(index, 'AppId', 'Application/GetApplicationDetails').subscribe(
    data => {
      debugger;
      this.GlobalVariableService.objApplicationInfo = new ApplicationInfo;
      this.GlobalVariableService.objApplicationInfo = data;
      this.GlobalVariableService.applicationdetaildiv = true;
      this.GlobalVariableService.isAllapplication = true;
      this.GlobalVariableService.Applicationid=data.ApplicationId;
      
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
      this._svc.getGenericParmas(this.GlobalVariableService.objApplicationInfo.ApplicationId, 'ApplicationId', 'DynamicForm/GetApplicationValuesByApplicationId').subscribe(
        data => {
         // this.GlobalVariableService.editProspectMode = this.GlobalVariableService.editProspectMode == false?true:false;
          this.GlobalVariableService.ApplicationValues = data;
          this.GlobalVariableService.parameterID = this.GlobalVariableService.objApplicationInfo.ApplicationTypeId.toString();
          this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.objApplicationInfo.ApplicationTypeId,false);
          var myurl = `${"ApplicationDetail"}/${''}`;
          const that = this;
          that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            that.router.navigate([myurl])
          );
        })
    })

}



}
