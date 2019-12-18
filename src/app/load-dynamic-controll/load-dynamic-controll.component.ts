import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { ApplciationTypePanels } from '../Classes/application-work-flow-class';
import { AddNewControllComponent, AddNewControllpopUp } from '../add-new-controll/add-new-controll.component';
// import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';
import { ApplicationWorkFlowComponent } from '../application-work-flow/application-work-flow.component';
import { AddFiledsForDropDownComponent, AddFiledsForDropDownData } from '../add-fileds-for-drop-down/add-fileds-for-drop-down.component';
import { ApplicationTypeFields } from '../Classes/application-review';
import { MatTableDataSource, MatSort, MatDialogRef, MatPaginator, MatDialog } from '@angular/material';
import { jqxDataTableComponent } from 'jqwidgets-ng/jqxdatatable';


import * as $ from 'jquery';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-load-dynamic-controll',
  templateUrl: './load-dynamic-controll.component.html',
  styleUrls: ['./load-dynamic-controll.component.css']
})
export class LoadDynamicControllComponent implements OnInit, AfterViewInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  MouseHoverPanelid: number = -1;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  objectApplicationTypeFields: ApplicationTypeFields;
  LIsActive = new FormControl('', [
    Validators.required
  ]);
  //lstPanelData: ApplciationTypePanels[];
  objPanelData: ApplciationTypePanels;
  listPanel: ApplciationTypePanels[];
  CheckBoxList = [];
  message1: string;
  SaveVal: string;
  Coloumns: any;
  dataFields: any;
  columns: any;
  dataAdapter: any;
  TableArray=[];
  DynamicArrayForTable=[];
  constructor(public GlobalVariableService: GlobalVariableService, public dialog: MatDialog,
    private _svc: SharedServicesService) {

    this.objectApplicationTypeFields = new ApplicationTypeFields();
    // this.lstPanelData = [];
    this.objPanelData = new ApplciationTypePanels();
    this.listPanel = [];
    this.dataAdapter = new jqx.dataAdapter(this.source);
    // this.lstPanelData = this.GlobalVariableService.glbApplciationTypePanels;
  }

  source =
    {

      localData: this.generateData(),
      // localData: '',
      dataType: 'array',
      dataFields: this.GlobalVariableService.DataFieldsArray
      // dataFields:
      // [
      //     { name: 'firstname', type: 'string' },
      //     { name: 'lastname', type: 'string' },
      //     { name: 'productname', type: 'string' },
      //     { name: 'quantity', type: 'number' },
      //     { name: 'price', type: 'number' },
      //     { name: 'total', type: 'number' }
      // ]
    };
  // public dataSource = new MatTableDataSource<any>();

  // public displayedColumns = [this.GlobalVariableService.coloumns];
  ngOnInit() {
    debugger;
    // console.log( this.GlobalVariableService.DynamicDataTable);
    // console.log( this.GlobalVariableService.controllsApplicationTypeFields);
    // this.coloumns="Name,";
    // for(let i=0; i<this.GlobalVariableService.ListFieldItems.length; i++)
    // {
    //  this.coloumns+= this.GlobalVariableService.ListFieldItems[i].FieldText+',';

    // }
    // this.coloumns+=this.coloumns+'Action';  
    this.message1 = this.message;
    if (!this.GlobalVariableService.isNumberNullOrEmplty(this.GlobalVariableService.ApplicationTypeId)) {
      this.GlobalVariableService.getFieldValuesByApptypeid();
      this.binddataToFields();
      // setTimeout(() => {

      //   var a= this.GlobalVariableService.ColoumnArray;
      //   // this.columns=
      //   //    this.GlobalVariableService.ColoumnArray;
      //   }, 4000);
    }
    // console.log("oninit"); 
  }
  ngAfterViewInit() {
    debugger;
    if (!this.GlobalVariableService.isNumberNullOrEmplty(this.GlobalVariableService.ApplicationTypeId)) {
      this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId);
      //this.GlobalVariableService.GetAllFieldsByAppTypeId(this.GlobalVariableService.ApplicationTypeId);
      this.binddataToFields();

    }
  }
  binddataToFields() {
 
  }
   @Input() list: any;
  @Input() message: string;
  @Input() ButtonAndDataTable:boolean;


  public mess = 'mess from viewchild';
  public testing = 'this is testing';
  confirmDelete(PanelId: number) {

    const message = 'Are you sure you want to delete selected Records?';
    const dialogData = new CustomConfirmDialogModel("Definitions ", message);
    const dialogRef = this.dialog.open(CustomConfirmModalsComponent, {
      width: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteControll(PanelId);
      }
    });
  }
  deleteControll(PanelId: number) {

    this._svc.getGenericParmas(PanelId, 'PanelId', 'DynamicForm/DeletePanelInfo').subscribe(
      data => {

        this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId)

      }, (err) => {
        this.GlobalVariableService.openDialog("Add Controlls ", "Some Error has been occured.")
      }
    );


  }


  radioChange(ListItem: number, list: number) {
    for (var i = 0; i < this.GlobalVariableService.listSelectData.length; i++) {
      if (this.GlobalVariableService.listSelectData[i].id == ListItem) {
        for (var i = 0; i < this.GlobalVariableService.listSelectData[i].FieldListItems.length; i++) {

        }
      }
    }
  }

  editControll(PanelId: number) {
    this.GlobalVariableService.editControll(PanelId);
  }

  @Output() messageEvent = new EventEmitter<string>();
  sendMessage() {
    this.messageEvent.emit(this.message)
  }

  addControll(PanelId: number) {
    this.openDialog(PanelId);
  }
  openDialog(PanelId: number, Fieldid: number = 0, flag: string = ''): void {

    if (flag != 'edit') {
      this.objectApplicationTypeFields = new ApplicationTypeFields();
      const PanleID = PanelId;
      const dialogData = new AddNewControllpopUp(PanleID, this.objectApplicationTypeFields);
      const dialogRef = this.dialog.open(AddNewControllComponent, {
        width: '80%',
        maxHeight: '100%',
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    }
    else {
      const PanleID = PanelId;
      const FieldId = Fieldid;
      this.objectApplicationTypeFields = this.GlobalVariableService.controllsApplicationTypeFields.filter(x => x.FK_PanelId == PanleID && x.FieldId == FieldId)[0];
      this.GlobalVariableService.FieldID = null;
      const objectApplicationTypeFields = this.objectApplicationTypeFields;
      const dialogData = new AddNewControllpopUp(PanleID, objectApplicationTypeFields);
      const dialogRef = this.dialog.open(AddNewControllComponent, {
        width: '80%',
        maxHeight: '100%',
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }
  AddItems(Filed_Id: number, PanelID: number) {

    const FiledId = Filed_Id;
    this.GlobalVariableService.FieldID = Filed_Id;
    const dialogData = new AddFiledsForDropDownData(FiledId);
    const dialogRef = this.dialog.open(AddFiledsForDropDownComponent, {
      width: '80%',
      maxHeight: '100%',
      data: { dialogData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  AddFields(FieldId: number, PanelId: number) {
    this.openDialog(PanelId, FieldId, 'edit')
  }

  DeleteFields(FieldId: number) {

    this._svc.getGenericParmas(FieldId, 'FieldId', 'DynamicForm/DeleteFieldInfo').subscribe(
      data => {

        this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId)
      }, (err) => {
        this.GlobalVariableService.openDialog("Add Controlls ", "Some Error has been occured.")
      }
    );
  }
  UpdatePanelOrderDown(panelId: number) {

    if (this.GlobalVariableService.glbApplciationTypePanels[0].PanelId != panelId) {
      var a = this.GlobalVariableService.glbApplciationTypePanels.filter(x => x.PanelId == panelId)[0]
      this._svc.UpdatePanelOrderDown(a, 'DynamicForm/UpdatePanelOrderDown').subscribe(
        data => {
          this.GlobalVariableService.openDialog('Add Controlls', 'Panel order has been updated');
          this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId)

        }, (err) => {
          this.GlobalVariableService.openDialog("Add Controlls ", "Some Error has been occured.")
        }
      );
    }
  }

  UpdatePanelOrderUp(panelId: number) {

    if (this.GlobalVariableService.glbApplciationTypePanels[0].PanelId != panelId) {
      var a = this.GlobalVariableService.glbApplciationTypePanels.filter(x => x.PanelId == panelId)[0]
      this._svc.UpdatePanelOrderUp(a, 'DynamicForm/UpdatePanelOrderUp').subscribe(
        data => {
          this.GlobalVariableService.openDialog('Add Controlls', 'Panel order has been updated');
          this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId)
        }, (err) => {
          this.GlobalVariableService.openDialog("Add Controlls ", "Some Error has been occured.")
        }
      );
    }
  }
  mouseEnter(panelid: number) {
    this.MouseHoverPanelid = panelid;
  }
  mouseLeave() {
  }
  SetColor(FieldId: number) {

    $("#a" + FieldId).css("background-color", "#f2f5f3");

  }
  onChange(ItemId: any, FieldId: any) {


    if (this.GlobalVariableService.isStringNullOrEmplty(this.SaveVal)) {
      this.SaveVal = ItemId + ':' + FieldId;

    }
    else {
      this.SaveVal += ItemId + ':' + FieldId;

    }
    // var itemfieldid=ItemId+':'+FieldId;




  }





  resetColor(FieldId: number) {
    $("#a" + FieldId).css("background-color", "");
    // $("#a"+FieldId).addClass('').removeClass('roundSides');
  }
  UpdateFieldOrderDown(fieldId: number) {

    var a = this.GlobalVariableService.controllsApplicationTypeFields.filter(x => x.FieldId == fieldId)[0]
    this._svc.UpdateFieldOrder(a, 'DynamicForm/UpdateFieldOrderDown').subscribe(
      data => {
        this.GlobalVariableService.openDialog('Add Controlls', 'Panel order has been updated');
        this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId)
      }, (err) => {
        this.GlobalVariableService.openDialog("Add Controlls ", "Some Error has been occured.")
      });
  }
  UpdateFieldOrderUp(fieldId: number) {

    var a = this.GlobalVariableService.controllsApplicationTypeFields.filter(x => x.FieldId == fieldId)[0];
    this._svc.UpdateFieldOrder(a, 'DynamicForm/UpdateFieldOrderUp').subscribe(
      data => {
        this.GlobalVariableService.openDialog('Add Controlls', 'Panel order has been updated');
        this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId)

      }, (err) => {
        this.GlobalVariableService.openDialog("Add Controlls ", "Some Error has been occured.")
      });
  }
  config = {
    uiColor: '#ffffff',
    toolbarGroups: [{ name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
    { name: 'links' }, { name: 'insert' },
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
    { name: 'styles' },
    { name: 'colors' }],
    skin: 'kama',
    resize_enabled: false,
    removePlugins: 'elementspath,save,magicline',
    extraPlugins: 'divarea,smiley,justify,indentblock,colordialog',
    colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
    },
    height: 188,
    width: 750,
    removeDialogTabs: 'image:advanced;link:advanced',
    removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
    format_tags: 'p;h1;h2;h3;pre;div'
  }
  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }
  generateData(): any[] {
    let data = new Array();
    this._svc.GetDetails("User/GetAll").subscribe(
      data => {
        return data;
      }
    )
    return data;
  }

  AddFieldValuesInTable(){
    debugger;
    for (var i = 0; i < this.GlobalVariableService.controllsApplicationTypeFields.length; i++) {
    var fieldid = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId.toString();
    var Caption = $('#' + fieldid).val();
   // var ApplicationValuesID = $('#'+ fieldid + 'ApplicationValuesID').val();
    
    //this.GlobalVariableService.controllsApplicationTypeFields[i].FieldCaption = Caption;
    var FieldId = this.GlobalVariableService.controllsApplicationTypeFields[i].FieldId;
    if (!this.GlobalVariableService.isStringNullOrEmplty(Caption) && !this.GlobalVariableService.isNumberNullOrEmplty(FieldId)) {
      this.TableArray.push({FieldId:FieldId,Caption:Caption});
    }
    for(let i=0; i<this.GlobalVariableService.glbApplciationTypePanels.length; i++)
    {

      for(let j=0; j<this.GlobalVariableService.controllsApplicationTypeFields.length; j++)
      {
       
      }
    }




  }
//   PanelandButtonShow(){
// if(this.GlobalVariableService.glbApplciationTypePanels.)

//   }





}
}