import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { ApplicationType, Sys_Groups } from '../Classes/application-work-flow-class';
import { Sys_Users } from '../Classes/login';
import { Validators, FormControl } from '@angular/forms';
import { ApplicationStatus, AllApplication, ApplicationInfo } from '../Classes/application-review';

@Component({
  selector: 'app-app-type-applicatons',
  templateUrl: './app-type-applicatons.component.html',
  styleUrls: ['./app-type-applicatons.component.css']
})
export class AppTypeApplicatonsComponent implements OnInit {

  showDetail: boolean = false;
  lstApplicationType : ApplicationType
  lstSys_Groups: Sys_Groups[]
  lstSys_Users : Sys_Users[]
  lstApplicationStatus:ApplicationStatus[]
  objAllAplication : AllApplication
  lstApplicationInfo : ApplicationInfo []
  disableSelect : boolean
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

  AssignedGroup = new FormControl('', [
    Validators.required
  ]);
  datePipe: any;
  
  constructor(private _svc: SharedServicesService,private GlobalVariableService : GlobalVariableService) {
    this.objAllAplication = new AllApplication();
    
   }
  public dataSource = new MatTableDataSource<ApplicationInfo>();

  selection = new SelectionModel<any>(true, []);
  public displayedColumns = ['select', 'ApplicationNo', 'ApplicationTypeEn', 'StatusNameEn','ApplicationDate', 'action']
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.GetApplicationTypeList();
    this.GetUserList();
    this.GetApplicationStatusList(0);
    this.GetAssignedGroupList();
    //this.objAllAplication.FromDate = this.datePipe.transform(this.objAllAplication.FromDate, 'yyyy-MM-dd');
  }
  Clear(){

    this.objAllAplication = new AllApplication();
    this.objAllAplication.ApplicationTypeId= 0;
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
        this.objAllAplication.ApplicationTypeId = 17;
        this.GetApplicationStatusList(17);
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
    this.objAllAplication.UserId = this.GlobalVariableService.userPrevilieges.ID
    this._svc.SearchApplications(this.objAllAplication, "Application/GetAllApplicationsForSearch").subscribe(
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

}
