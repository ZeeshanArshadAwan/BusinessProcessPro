import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationType, Sys_Groups } from '../Classes/application-work-flow-class';
import { Sys_Users } from '../Classes/login';
import { ApplicationStatus, AllApplication, ApplicationInfo } from '../Classes/application-review';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { BaseComponent } from '../SharedServices/base-component';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-application-status-report',
  templateUrl: './application-status-report.component.html',
  styleUrls: ['./application-status-report.component.css']
})
export class ApplicationStatusReportComponent extends BaseComponent implements OnInit {

  showDetail: boolean = false;
  lstApplicationType: ApplicationType;
  lstSys_Groups: Sys_Groups[]
  lstSys_Users: Sys_Users[]
  lstApplicationStatus: ApplicationStatus[]
  objAllAplication: AllApplication;
  lstApplicationInfo: ApplicationInfo[];
  ListApplicationInfo: ApplicationInfo[];
  FormName: string = '';
  AssignedGroup: number;
  FK_AssignedUser: number

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
  constructor(public languageTranslateService: LanguageTranslateService, private _svc: SharedServicesService, public GlobalVariableService: GlobalVariableService, private router: Router) {
    super(languageTranslateService);
    this.objAllAplication = new AllApplication();
    this.ListApplicationInfo = [];
    this.AssignedGroup = 0;
    this.FK_AssignedUser = 0;
  }

  public dataSource = new MatTableDataSource<ApplicationInfo>();

  selection = new SelectionModel<any>(true, []);
  public displayedColumns = ['select', 'ApplicationNo', 'ApplicationTypeEn', 'StatusNameEn', 'ApplicationDate', 'action']
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    if (this.GlobalVariableService.isEn) {
      this.FormName = localStorage.getItem("BPPFromNameEn");
    }
    else {
      this.FormName = localStorage.getItem("BPPFromNameAr");
    }

    this.GlobalVariableService.isAllapplication = true;
    this.GlobalVariableService.AssignedApplication = false;
    this.GetApplicationTypeList();
    this.GetUserList();
    this.GetApplicationStatusList(0);
    this.GetAssignedGroupList();
    this.Search();
  }


  GetUserList() {
    this._svc.GetDetails("User/GetAll").subscribe(
      data => {

        this.lstSys_Users = data;
      }
    )

  }
  GetUserListByGroup(index: number = 0) {

    this._svc.getGenericParmas(index, 'GroupId', 'User/GetAllUsersByGroupId').subscribe(
      data => {
        this.lstSys_Users = data;
      })
  }
  GetApplicationTypeList() {
    this._svc.GetDetails("ApplicationType/GetAllApplicationTypes").subscribe(
      data => {

        this.lstApplicationType = data;
      }
    )
  }
  GetAssignedGroupList() {
    this._svc.GetDetails("Company/GetAllGroups").subscribe(
      data => {

        this.lstSys_Groups = data;
      }
    )
  }
  onSelect(LookUp: any) {

  }
  GetApplicationStatusList(index: number = 0) {
    this._svc.getGenericParmas(index, 'id', 'ApplicationType/GetAllApplicationStatusbyTypeid').subscribe(
      data => {
        this.lstApplicationStatus = data;
      })
  }
  NextPage() {
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
  filterChanged(selectedValue: any) {
    alert(selectedValue);

  }

  OnchangeApptype(id: any) {

    this.GetApplicationStatusList(id);
  }

  OnchangeAssigned(id: any) {
    this.GetUserListByGroup(id);
  }

  Search() {
    debugger;
    if (localStorage.getItem("BPPFromNameEn") == "Pending Application") {
      this.objAllAplication.ApplicationStatusType = 0;
    }
    if (localStorage.getItem("BPPFromNameEn") == "Closed Application") {
      this.objAllAplication.ApplicationStatusType = 1;
    }

    this.GlobalVariableService.blockUI.start();
    localStorage.setItem("BBPAllApplicationRequset", JSON.stringify(this.objAllAplication));
    this._svc.SearchApplications(this.objAllAplication, "Application/GetApplicationReportsByStatus").subscribe(

      data => {
        this.GlobalVariableService.blockUI.stop();
        //  this.lstCompanies = data;
        this.lstApplicationInfo = data;
        this.dataSource.data = this.lstApplicationInfo;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }, (err) => {
        this.GlobalVariableService.openDialog('Application', 'Error Occured while Getting Record.');
      });
  }

  GetApp(index: any = 0) {
    


    // this._svc.getGenericParmas(index,'id','ApplicationType/GetAllApplicationStatusbyTypeid').subscribe(
    //   data => {
    //     this.lstApplicationStatus = data;
    //   })  
    // this.GlobalVariableService.blockUI.start();
    this._svc.getGenericParmas(index, 'AppId', 'Application/GetApplicationDetails').subscribe(
      data => {
        
        // this.GlobalVariableService.blockUI.stop();
        this.GlobalVariableService.objApplicationInfo = new ApplicationInfo;
        this.GlobalVariableService.objApplicationInfo = data;
        this.GlobalVariableService.Applicationid = index;

        // console.log(data);
        this.GlobalVariableService.applicationdetaildiv = true;
        this.GlobalVariableService.isAllapplication = true;
        if (this.GlobalVariableService.objApplicationInfo.AllowTemplateDownload == true) {
          this.GlobalVariableService.IsTemplateDownLoad = true;
        }
        else {
          this.GlobalVariableService.IsTemplateDownLoad = false
        }
        if (this.GlobalVariableService.objApplicationInfo.AllowEdit == true) {
          this.GlobalVariableService.editProspectMode = true;
        }
        else {
          this.GlobalVariableService.editProspectMode = false;
        }
        if (this.GlobalVariableService.objApplicationInfo.AllowUploadDocuments == true) {
          this.GlobalVariableService.IsDocumentUpload = true;
        }
        else {
          this.GlobalVariableService.IsDocumentUpload = false;
        }
        if (this.GlobalVariableService.objApplicationInfo.ApplicationTypeCategory == 2 || this.GlobalVariableService.objApplicationInfo.ApplicationTypeCategory == 3) {
          this.GlobalVariableService.ApplicationTypeCategory = this.GlobalVariableService.objApplicationInfo.ApplicationTypeCategory;
          this.GlobalVariableService.AppDetailtable = true
        }
        else {
          this.GlobalVariableService.ApplicationTypeCategory = this.GlobalVariableService.objApplicationInfo.ApplicationTypeCategory;
          this.GlobalVariableService.AppDetailtable = false
        }
        this._svc.getGenericParmas(this.GlobalVariableService.objApplicationInfo.ApplicationId, 'ApplicationId', 'DynamicForm/GetApplicationValuesByApplicationId').subscribe(
          data => {
            // this.GlobalVariableService.editProspectMode = this.GlobalVariableService.editProspectMode == false?true:false;
            this.GlobalVariableService.ApplicationValues = data;
            this.GlobalVariableService.parameterID = this.GlobalVariableService.objApplicationInfo.ApplicationTypeId.toString();
            this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.objApplicationInfo.ApplicationTypeId, true);
            var myurl = `${"ApplicationDetail"}/${''}`;
            const that = this;
            that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              that.router.navigate([myurl])
            );
          })
      })

  }
  Clear() {
    this.objAllAplication = new AllApplication();
  }
}
