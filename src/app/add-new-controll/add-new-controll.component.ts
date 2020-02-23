import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddNewControll } from 'src/app/Classes/app-setting';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { FieldListItems } from '../Classes/application-work-flow-class';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { ApplicationTypeFields } from '../Classes/application-review';
import { FieldTypes } from '../Classes/FieldTypes';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-add-new-controll',
  templateUrl: './add-new-controll.component.html',
  styleUrls: ['./add-new-controll.component.css']
})



export class AddNewControllComponent implements OnInit {

  AddNewControll:AddNewControll;
  FieldListItems: FieldListItems;
  ApplicationTypeFields: ApplicationTypeFields;
  PanelID: number;
  showHeaderdetail: string = '';
  FK_FieldType: number = 0;
  str : string = "";
  FieldTypeList:FieldTypes[];
  // testData: string = 'test';
  constructor(private _svc: SharedServicesService ,public GlobalVariableService: GlobalVariableService, public dialogRef: MatDialogRef<AddNewControllComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddNewControllpopUp) { 
      this.PanelID = data.PanelID;
      this.ApplicationTypeFields = data.ApplicationTypeFields;
      this.FK_FieldType = this.ApplicationTypeFields.FK_FieldType; 
      this.AddNewControll = new AddNewControll();
      this.FieldListItems = new FieldListItems();
      this.FieldTypeList=[];
      // this.ApplicationTypeFields = new ApplicationTypeFields();
      this.ApplicationTypeFields.FK_PanelId = this.PanelID;
      this.ApplicationTypeFields.FK_ApplicationTypeId = this.GlobalVariableService.ApplicationTypeId;
    }
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['abc', 'xyz', 'asd', 'tsd', 'sss'];

  ngOnInit() {
    this.str = "";
    this.GetAllFieldTypes();
   
    
  } 
  onChange(newValue) {
    this.ApplicationTypeFields.FK_FieldType = newValue;
}
  Cancel() {
    this.dialogRef.close(false);
  }
  SaveControlls(){
    
    if(this.initialValidation()){
      this._svc.SaveFieldsInfo( this.ApplicationTypeFields ,'DynamicForm/SaveFieldsInfo').subscribe(
        data => {
          if(!this.GlobalVariableService.isNumberNullOrEmplty(this.GlobalVariableService.ApplicationTypeId)){
            this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId,true)
           // this.GlobalVariableService.GetAllFieldsByAppTypeId(this.GlobalVariableService.ApplicationTypeId)
          }
        }, (err) => {
          this.GlobalVariableService.openDialog("Add Controls ", "Some Error has been occured saving data.")
        }
      );
    }
    else{
      this.GlobalVariableService.openDialog("Add Control","Please Fill the following fields : " + this.str)
    }
    
  }
  initialValidation(){
    var a = "";
    if(this.GlobalVariableService.isStringNullOrEmplty(this.ApplicationTypeFields.FieldCaption)){
       a = a + " English Caption, "
    }
    if(this.GlobalVariableService.isStringNullOrEmplty(this.ApplicationTypeFields.FieldCaptionAr)){
      a = a +  "English Caption, "
    }
    if((this.FK_FieldType==0)){
      a = a +  "Field Type  "
    }
    if(a == ''){
      return true;
    } else {
      this.str = a;
      return false;
    }
    
  }
  ShowHiderPanel(){
    
    this.ApplicationTypeFields.FK_FieldType = this.FK_FieldType;
    if(this.ApplicationTypeFields.FK_FieldType == 15)
    {
      this.showHeaderdetail = 'Header';
    }
   else if(this.ApplicationTypeFields.FK_FieldType == 16){
    this.showHeaderdetail = 'Paragraph'
   }
   else if(this.ApplicationTypeFields.FK_FieldType == 17){
    this.showHeaderdetail = 'Label'
   }
  //  else if(this.ApplicationTypeFields.FK_FieldType == 19){
  //   this.showHeaderdetail = 'DataGrid';
   
  //  }
   else if(this.ApplicationTypeFields.FK_FieldType == 2 || this.ApplicationTypeFields.FK_FieldType == 3){
    this.showHeaderdetail = 'number'
   }
   else {
      this.showHeaderdetail = '';
   }

  }
  GetAllFieldListItemsByFieldId(){
    this._svc.getGenericParmas('','','DynamicForm/GetAllFieldListItemsByFieldId').subscribe(
      data => {  
      }, (err) => {
        this.GlobalVariableService.openDialog("Add Controlls ", "Some Error has been occured saving data.")
      }
    );
  }
  close(){
    
    this.dialogRef.close(false);
  }
GetAllFieldTypes(){
  this._svc.GetDetails('DynamicForm/GetAllFieldTypes').subscribe(
    data => {
      
     this.FieldTypeList=data;
    }, (err) => {
      this.GlobalVariableService.openDialog("Add Controls ", "Some Error has been occured saving data.")
    }
  );

}



}

export class AddNewControllpopUp {
  constructor(public PanelID: number ,public ApplicationTypeFields:ApplicationTypeFields  ) {
  }
}
