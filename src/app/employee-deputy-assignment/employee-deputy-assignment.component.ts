import { Component, OnInit } from '@angular/core';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { BaseComponent } from '../SharedServices/base-component';
import { GetAllUsers } from '../Classes/login';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { OrgCompany, Sys_Groups } from '../Classes/application-work-flow-class';
import { OrgEntity } from '../Classes/organization-structure';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { EmployeeDeputyAssignment } from '../Classes/emp-deputy-assignment';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';

@Component({
  selector: 'app-employee-deputy-assignment',
  templateUrl: './employee-deputy-assignment.component.html',
  styleUrls: ['./employee-deputy-assignment.component.css']
})
export class EmployeeDeputyAssignmentComponent extends BaseComponent implements OnInit {
  bUserGroup: boolean = true;
  bOrganizationUnit: boolean = false;
  bSpecificUser: boolean = false;
  objGetAllUsers: GetAllUsers;
  lstOrgCompany: OrgCompany[];
  lstOrgEntity: OrgEntity[];
  vStatus_SysGroup: Sys_Groups[];
  UserId: number = 0;
  GroupId: number = 0;
  entityID: number = 0;
  userName: string = '';

  objEmployeeDeputyAssignment: EmployeeDeputyAssignment;

  public dataSource = new MatTableDataSource<EmployeeDeputyAssignment>();
  public displayedColumns = ['select','DeputyName', 'EmployeeName', 'StartDate', 'EndDate']
  selection = new SelectionModel<EmployeeDeputyAssignment>(true, []);


  constructor(public languageTranslateService: LanguageTranslateService, private _svc: SharedServicesService,
    public GlobalVariableService: GlobalVariableService , public dialog: MatDialog) {
    super(languageTranslateService);
    this.objGetAllUsers = new GetAllUsers();
    this.lstOrgCompany = [];
    this.lstOrgEntity = [];
    this.vStatus_SysGroup = [];
    this.objEmployeeDeputyAssignment = new EmployeeDeputyAssignment();
  }


  ngOnInit() {
    this.GetAllUsers();
    this.GetAllCompanies();
    this.groupsVisitStatus();
    this.GetAllDeputyAssignment();
  }
  Retrive() {
    if (this.userName.toLocaleLowerCase() == 'admin') {
      this.objEmployeeDeputyAssignment.DeputyName = 'Abdelrahman Al-Samadi';
    }
  }

  onSelect(index: number) {
    
    for(var i = 0 ; i< this.dataSource.data.length ; i++ ){
      if(this.dataSource.data[i].EmployeeDeputyAssignmentId == index){
        if(this.dataSource.data[i].selection == undefined || this.dataSource.data[i].selection == false){
          this.dataSource.data[i].selection= true;
        }
        else {
          this.dataSource.data[i].selection= false;
        }
      }
    }
  }
  ConfirmDelete(){
    const message = 'Are you sure you want to delete selected Records?';
    const dialogData = new CustomConfirmDialogModel("Employee Deputy Assignment", message);
    const dialogRef = this.dialog.open(CustomConfirmModalsComponent, {
      width: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.delete();
      }
    });
  }
  

  delete(){
    
    var idTodelete = '';
    if (this.dataSource.data.length > 0) {
      for (var i = 0; i < this.dataSource.data.length; i++) {

        if (this.dataSource.data[i].selection == true) {
          if ( idTodelete == '')
            idTodelete = this.dataSource.data[i].EmployeeDeputyAssignmentId.toString();
          else
            idTodelete = idTodelete + ',' + this.dataSource.data[i].EmployeeDeputyAssignmentId.toString();
        }
      }
      if (idTodelete == "") {
        this.GlobalVariableService.openDialog('Employee Deputy Assignment ', "Please select any record.");
        return;
      }
    }

    this._svc.getGenericParmas(idTodelete,'Ids', 'ApplicationType/DeleteEmployeeDeputyAssignment').subscribe(
      data => {
      this.GetAllDeputyAssignment();
      }, (err) => {
        this.GlobalVariableService.openDialog("Employee Deputy Assignment ", "Some Error has been occured while Getting All entities.")
      }
    );
  }

  SaveDuptyinfo() {
    
    //  ApplicationType/AddUpdateEmployeeDeputyAssignment   
    this._svc.AddUpdateEmployeeDeputyAssignment(this.objEmployeeDeputyAssignment, 'ApplicationType/AddUpdateEmployeeDeputyAssignment').subscribe(
      data => {
        this.GetAllDeputyAssignment();
      }, (err) => {
        this.GlobalVariableService.openDialog("Employee Deputy Assignment ", "Some Error has been occured while Getting All entities.")
      }
    );
  }


  handleChange(evt, key: number) {
    if (key == 1) {
      this.bUserGroup = true;
      this.bOrganizationUnit = false;
      this.bSpecificUser = false;
    }
    else if (key == 2) {
      this.bUserGroup = false;
      this.bOrganizationUnit = true;
      this.bSpecificUser = false;
    }
    else {
      this.bUserGroup = false;
      this.bOrganizationUnit = false;
      this.bSpecificUser = true;

    }

  }
  GetAllUsers() {
    this._svc.GetDetails("User/GetAllUsers").subscribe
      (
        data => {

          this.objGetAllUsers = data;
        }, (err) => {
          this.GlobalVariableService.openDialog("Employee Deputy Assignment", "Some Error has been occured while Getting All entities.")
        }
      );
  }
  GetEntitybyCompnayId(companyId: number) {
    
    this._svc.getGenericParmas(companyId, "id", 'Company/GetEntitybyCompnayId').subscribe(
      data => {
        this.lstOrgEntity = data;
      }, (err) => {
        this.GlobalVariableService.openDialog("Employee Deputy Assignment ", "Some Error has been occured while Getting All entities.")
      }
    );
  }
  GetAllCompanies() {
    this._svc.GetDetails('Company/GetAllCompanies').subscribe(
      data => {
        this.lstOrgCompany = data;
      }, (err) => {
        this.GlobalVariableService.openDialog("Application Type ", "Some Error has been occured while Getting All companies.")
      }
    );
  }

  groupsVisitStatus() {

    //GetAllGroups()
    this._svc.GetDetails('Company/GetAllGroups').subscribe(
      data => {
        
        this.vStatus_SysGroup = data;
      }
      , (err) => {
        this.GlobalVariableService.openDialog('Application Work Flow', err.toString())
      });

  }
  GetAllDeputyAssignment() {
    
    this._svc.GetDetails('ApplicationType/GetAllDeputyAssignment').subscribe(
      data => {
        
        this.dataSource.data = [];
        this.dataSource.data = data;
      }
      , (err) => {
        this.GlobalVariableService.openDialog('Application Work Flow', err.toString())
      });
  }

  selectOrgEntity(id: number) {

  }
  
}
