import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { GetAllUsers, Sys_Users } from 'src/app/Classes/login';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { SharedServicesService } from 'src/app/SharedServices/shared-services.service';
import { Sys_Groups, OrgCompany, OrgEntity } from 'src/app/Classes/application-work-flow-class';
import { GlobalVariableService } from 'src/app/SharedServices/global-variable.service';
import { LanguageTranslateService } from 'src/app/SharedServices/language-translate.service';
import { BaseComponent } from 'src/app/SharedServices/base-component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-new-user-pop-up',
  templateUrl: './new-user-pop-up.component.html',
  styleUrls: ['./new-user-pop-up.component.css']
})
export class NewUserPopUpComponent extends BaseComponent implements OnInit ,AfterViewInit{

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  errorMsg: string = '';
  header: string = 'Create User';

  Sys_Users: Sys_Users;
  sysGroup: Sys_Groups[];
  OrgCompany: OrgCompany[];
  OrgEntity: OrgEntity[];

  GetAllUsers: GetAllUsers;
  confirmPWD: string = '';
  modeFlage: string = '';
  constructor( public  languageTranslateService: LanguageTranslateService ,private globalVariables: GlobalVariableService,
    public dialogRef: MatDialogRef<NewUserPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewUserPopUp,
    private _svc: SharedServicesService) {
      super(languageTranslateService);
    this.Sys_Users = new Sys_Users();
    this.GetAllUsers = new GetAllUsers();
    this.GetAllUsers = data.obj;
    this.header = data.title;
    this.modeFlage = data.modeFlage;
    if (this.modeFlage == "edit") {
      this.Sys_Users = data.UsersList;
    }
    this.sysGroup = [];
    this.OrgEntity = [];
  }

  ngOnInit() {
    
    this.GetAllGroups();
    this.GetAllCompanies();
  }
  ngAfterViewInit(){
    this.CompanyChanged(this.Sys_Users.FK_CompanyId);
  }
  GetAllGroups() {
    //'Company/GetAllGroups'

    this._svc.GetDetails('Company/GetAllGroups').subscribe(
      data => {
        this.sysGroup = data;
      })
  }
  GetAllCompanies() {

    this._svc.GetDetails('Company/GetAllCompanies').subscribe(
      data => {
        this.OrgCompany = data;
      })
  }
  GetEntitybyCompnayId(id: any) {

    this._svc.getGenericParmas(id, "id", 'Company/GetEntitybyCompnayId').subscribe(
      data => {
        this.OrgEntity = data;
      })
  }
  CompanyChanged(id: any) {
    this.GetEntitybyCompnayId(id);
  }
  selectUser(userId: number){
    this.Sys_Users.UserType = userId;
  }
  AddUser() {
    if (this.initialValidation()) {
      // 'User/AddUser'
      this._svc.AddUser(this.Sys_Users, 'User/AddUser').subscribe(
        data => {
          
          this.Sys_Users = data;
          this.globalVariables.openDialog(this.header, "Record has been saved.");
          this.cancel();
        })
    }
    else {
      this.globalVariables.openDialog(this.header, "Please Fill Mentioned Fields : " + this.errorMsg);
    }
  }
  initialValidation() {
    this.errorMsg = "";
    

    if (this.globalVariables.isStringNullOrEmplty(this.Sys_Users.UserID)) {
      this.errorMsg = this.errorMsg + ' User ID ,';

    }
    if (this.globalVariables.isStringNullOrEmplty(this.Sys_Users.UserEmail)) {
      this.errorMsg = this.errorMsg + ' Email Address ,';
    }
    if (this.globalVariables.isStringNullOrEmplty(this.Sys_Users.User_FullName)) {
      this.errorMsg = this.errorMsg + ' User Full Name ,';
    }

    if (this.globalVariables.isNumberNullOrEmplty(this.Sys_Users.UserType)) {
      this.errorMsg = this.errorMsg + ' User Type ,';
    }

    if (this.globalVariables.isStringNullOrEmplty(this.Sys_Users.UserPwd)) {
      this.errorMsg = this.errorMsg + ' User Password ,';
    }

    if (this.globalVariables.isNumberNullOrEmplty(this.Sys_Users.GroupID)) {
      this.errorMsg = this.errorMsg + '  Group ID ,';
    }

    if (this.globalVariables.isNumberNullOrEmplty(this.Sys_Users.FK_CompanyId)) {
      this.errorMsg = this.errorMsg + ' Company ,';
    }

    if (this.globalVariables.isStringNullOrEmplty(this.Sys_Users.PhoneNo)) {
      this.errorMsg = this.errorMsg + ' Phone No ,';
    }

    if (this.globalVariables.isStringNullOrEmplty(this.Sys_Users.JobDesc)) {
      this.errorMsg = this.errorMsg + ' Job Description ,';
    }

    if (this.errorMsg == "") {
      this.errorMsg = "";
      return true;
    }
    else {
      this.errorMsg = this.errorMsg.substring(0, this.errorMsg.length - 1);
      return false;
    }
  }
  onRadioChange(event) {
    
    this.Sys_Users.UserType = event.inex;
  }
  MatchPassword() {

    if (this.confirmPWD != this.Sys_Users.UserPwd) {
      this.globalVariables.openDialog(this.header, "Password not matched.")
    }
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
export class NewUserPopUp {

  constructor(public title: string, public obj: GetAllUsers, public UsersList: Sys_Users, public modeFlage: string
  ) {
  }
}