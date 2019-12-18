import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DefineGroup, DefineUserGroup } from 'src/app/Classes/define-group';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Sys_Modules, Sys_Forms } from 'src/app/Classes/login';
import { Sys_Groups } from 'src/app/Classes/application-work-flow-class';
import { GlobalVariableService } from 'src/app/SharedServices/global-variable.service';
import { SharedServicesService } from 'src/app/SharedServices/shared-services.service';
import { LanguageTranslateService } from 'src/app/SharedServices/language-translate.service';
import { BaseComponent } from 'src/app/SharedServices/base-component';

@Component({
  selector: 'app-define-group-modal',
  templateUrl: './define-group-modal.component.html',
  styleUrls: ['./define-group-modal.component.css']
})
export class DefineGroupModalComponent  extends BaseComponent implements OnInit, AfterViewInit {
  errorMessage: string = "";
  FormName : string =""
  modeFlage: string = '';
  DefineGroup: DefineGroup;
  objSys_Groups: Sys_Groups;
  ModuleList: Sys_Modules[];
  FormListToDisplay: Sys_Forms[];
  mainFormList: Sys_Forms[];
  ModuleID: string = '';
  DefineUserGroup: DefineUserGroup[];
  objDefineUserGroup: DefineUserGroup;
  

  constructor(public languageTranslateService: LanguageTranslateService ,public dialogRef: MatDialogRef<DefineGroupModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DefineGroupPopUp,
    private _svc: SharedServicesService, private globalservice: GlobalVariableService
  ) {
    super(languageTranslateService);
    this.DefineGroup = new DefineGroup();
    this.objSys_Groups = new Sys_Groups();
    this.DefineGroup = data.obj;
    this.objSys_Groups = data.objsysGroup;
    this.modeFlage = data.modeFlage;
    this.FormName = data.message;
    this.DefineUserGroup = [];
    this.objDefineUserGroup = new DefineUserGroup();
  }

  ngOnInit() {
    this.ModuleList = [];
    this.FormListToDisplay = [];
    this.ModuleList = this.DefineGroup.ModuleList;
    this.mainFormList = this.DefineGroup.FormList;
    this.selectionChange(0);
  }
  ngAfterViewInit() {
    
   for(var i = 0 ; i<  this.DefineGroup.FormList.length; i++){
     if(this.DefineGroup.FormList[i].seleted){
     }
    
   }
      }

  selectionChange(event) {
    
    var eventindex = 0;
    if (event.index == undefined) {
      eventindex = 0;
    } else {
      eventindex = event.index;
    }
    this.ModuleID = this.ModuleList[eventindex].ModuleID.toString();
   
  }
  valueChange(p: number) {
    
    //  this.FormListToDisplay[p].seleted = !this.FormListToDisplay[p].seleted;
    this.DefineGroup.FormList[p].seleted = !this.DefineGroup.FormList[p].seleted;
  }
  initialValidationDefineGroup(){
    if(this.globalservice.isStringNullOrEmplty(this.objSys_Groups.Desc_En)){
      this.errorMessage = "Please enter Group Name English.";
      return false;
    }
    else if(this.globalservice.isStringNullOrEmplty(this.objSys_Groups.Desc_Ar)){
      this.errorMessage = "Please enter Group Name Arabic.";
      return false;
    }
    else {
      return true;
    }
  }
  saveGroup() {
    if(this.initialValidationDefineGroup())
    {
    this.DefineUserGroup = [];
    if (this.globalservice.isNumberNullOrEmplty(this.objSys_Groups.GroupID)) {
      this.addDataList("GroupId", "");
    }
    else {
      this.addDataList("GroupId", this.objSys_Groups.GroupID.toString());
    }
    this.addDataList("Group Name", this.objSys_Groups.Desc_En);
    this.addDataList("Group Arabic Name", this.objSys_Groups.Desc_Ar)
    for (var i = 0; i < this.DefineGroup.FormList.length; i++) {
      if (this.DefineGroup.FormList[i].seleted == true) {
        this.addDataList(this.DefineGroup.FormList[i].FormID.toString(), this.DefineGroup.FormList[i].FormID.toString())
      }
    }
    this._svc.SaveDefineGroup(this.DefineUserGroup, 'Group/SaveDefineGroup').subscribe(
      data => {
        this.globalservice.openDialog("Define Group", "Record has been saved");
        this.dialogRef.close(false);
      })
    }
    else {
      this.globalservice.openDialog("Define Group",this.errorMessage)
    }
  }
  Cancel(){
    this.objSys_Groups = new Sys_Groups();
    for(var i = 0 ; i < this.DefineGroup.FormList.length ; i++){
      this.DefineGroup.FormList[i].seleted = false;
    } 
  }
  addDataList(name: string, value: string) {
    this.objDefineUserGroup = new DefineUserGroup();
    this.objDefineUserGroup.name = name;
    this.objDefineUserGroup.value = value;
    this.DefineUserGroup.push(this.objDefineUserGroup);
  }
}

//"Group/GroupDetail"


export class DefineGroupPopUp {

  constructor(public title: string, public message: string, public obj: DefineGroup, public objsysGroup: Sys_Groups, public modeFlage: string
  ) {
  }
}