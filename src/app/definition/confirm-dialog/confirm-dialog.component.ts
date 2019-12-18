import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { CatagoryClass } from '../Classes/catagory-class';
import { SharedServicesService } from '../../SharedServices/shared-services.service';
import { GlobalVariableService } from '../../SharedServices/global-variable.service';
import { CatagoryClass } from '../../Classes/definition';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string = '';
  message: string = '';
  objCatagoryClass: CatagoryClass;
  modeFlage: string = '';
  errorMsg: string = "";

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
    , private _svc: SharedServicesService, private GlobalVariableService: GlobalVariableService) {
    // Update view with given values

    this.objCatagoryClass = new CatagoryClass();
    this.objCatagoryClass = data.obj;
    this.title = data.title;
    this.message = data.message;
    this.modeFlage = data.modeFlage;

  }

  ngOnInit() {
  }

  onConfirm(): void {
    
    if (this.initialValidations()) {
      this.objCatagoryClass.FK_LookUpTableId = Number(this.GlobalVariableService.parameterID);
      this._svc.posts(this.objCatagoryClass, 'definition/AddUpdateLookUpTableValues').subscribe(
        data => {
          this.GlobalVariableService.openDialog('Definition', "Record has been updated.")
        }, (err) => {
          this.GlobalVariableService.openDialog('Definition', "Some error occured.")
        });
      this.dialogRef.close(true);
    }
    else {
      this.GlobalVariableService.openDialog('Definition',"Please Fill Mentioned Fields : "  +  this.errorMsg)
    }
  }
  initialValidations() {
    this.errorMsg = "";
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objCatagoryClass.LookUpTableValueCode)) {
      this.errorMsg =  this.errorMsg  +  " Code ,";
     
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objCatagoryClass.LookUpTableValueEn)) {
      this.errorMsg =  this.errorMsg  +  " English Name ,";
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objCatagoryClass.LookUpTableValueAr)) {
      this.errorMsg =  this.errorMsg  +  " Arabic Name  ,";
    }

    if(this.errorMsg ==""){
      this.errorMsg = "";
      return true;
    }
    else {
      this.errorMsg = this.errorMsg.substring(0, this.errorMsg.length - 1);
      return false;     
    }
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {

  constructor(public title: string, public message: string, public obj: CatagoryClass, public modeFlage: string
  ) {
  }
}