import { Component, OnInit, Inject, ModuleWithComponentFactories, ViewChild, AfterViewInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { SharedServicesService } from '../SharedServices/shared-services.service';
//import { CatagoryClass, LookUpTableDefinition } from '../Classes/catagory-class';
import { MatSort, MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sys_Forms } from '../Classes/login';
import { CatagoryClass, LookUpTableDefinition } from '../Classes/definition';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit, AfterViewInit {
  lstCatagoryClass: CatagoryClass[];
  objCatagoryClass: CatagoryClass;
  pageName: string = 'Company Category';
  result: string = '';
  idTodelete: string = '';
  lookupTabledefinition: LookUpTableDefinition;
  objSys_Forms: Sys_Forms;

  constructor(private _svc: SharedServicesService, public dialog: MatDialog, public GlobalVariableService: GlobalVariableService) {
    this.lstCatagoryClass = [];
    this.objCatagoryClass = new CatagoryClass();
    this.lookupTabledefinition = new LookUpTableDefinition();
    this.objSys_Forms = new Sys_Forms();
  }
  public dataSource = new MatTableDataSource<CatagoryClass>();

  selection = new SelectionModel<CatagoryClass>(true, []);
  public displayedColumns = ['select', 'LookUpTableValueCode', 'LookUpTableValueEn', 'LookUpTableValueAr', 'action']

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {

    this.GetLookUpTableDefinition();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GetLookUpTableDefinition() {
    
    //GetLookUpTableDefinition(
    this._svc.getGenericParmas(this.GlobalVariableService.parameterID, "id", 'definition/GetLookUpTableDefinition')
      .subscribe(
        data => {
          this.lookupTabledefinition = data;
          this.GetPageNameByPath();
          this.getRecord();
        }
        , (err) => {
          this.GlobalVariableService.openDialog('Definitions', 'Error Occured while getting Definition Details')
        });
  }


  ShowConfirmDialog(): void {
    this.idTodelete = '';

    for (var i = 0; i < this.dataSource.data.length; i++) {

      if (this.dataSource.data[i].selection == true) {
        if (this.idTodelete == '')
          this.idTodelete = this.dataSource.data[i].LookUpTableValueId.toString();
        else
          this.idTodelete = this.idTodelete + ',' + this.dataSource.data[i].LookUpTableValueId.toString();
      }
    }
    if (this.idTodelete == "") {
      this.GlobalVariableService.openDialog('Definition', "Please select any record.");
    }
    else {
      const message = 'Are you sure you want to delete selected Records?';
      const dialogData = new CustomConfirmDialogModel("Definitions ", message);
      const dialogRef = this.dialog.open(CustomConfirmModalsComponent, {
        width: "400px",
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {


        if (dialogResult) {
          this.Delete();
        }
      });
    }
  }

  //this.GlobalVariableService.Sys_Forms

  GetPageNameByPath() {

    this._svc.getGenericParmas(this.GlobalVariableService.Sys_Forms.FormPath, "path", 'account/GetPageNameByPath')
      .subscribe(
        data => {
          this.objSys_Forms = data;
        }
        , (err) => {
          this.GlobalVariableService.openDialog('Definitions', 'Error Occured while getting Definition Details')
        });
  }


  getRecord() {
    //getComments('definition/GetAllValuesById/' + this.GlobalVariableService.parameterID)

    this._svc.GetDetails('definition/GetAllValuesById/' + this.GlobalVariableService.parameterID)
      .subscribe(
        data => {
          this.lstCatagoryClass = data;
          this.dataSource = new MatTableDataSource(this.lstCatagoryClass);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }
        , (err) => {
          this.GlobalVariableService.openDialog('Definitions', 'Error Occured while getting Definition Details')
        });
  }
  new() {
    this.objCatagoryClass = new CatagoryClass();
    this.confirmDialog('New');
  }
  confirmDialog(mode: string): void {
    
    const modeFlage = mode;
    const message = 'Are you sure you want to do this?';
    const dialogData = new ConfirmDialogModel(this.lookupTabledefinition.LookUpTableNameEn, message, this.objCatagoryClass, mode);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '80%',
      maxHeight: '70%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      this.result = dialogResult;
      this.getRecord();

    });
  }
  selectData(index: number) {

    this.objCatagoryClass = this.dataSource.data[index];
    this.confirmDialog('Edit');
  }
  isAllSelected() {

    // if(this.dataSource.data[this.selection.selected.length-1].selection == undefined){
    //   this.dataSource.data[this.selection.selected.length].selection = false;
    // }
    this.dataSource.data[this.selection.selected.length - 1].selection = !this.dataSource.data[this.selection.selected.length - 1].selection
    const numSelected = this.selection.selected.length - 1;
    const numRows = this.dataSource.data.length - 1;
    return numSelected === numRows;
  }
  masterToggle() {
    
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  onSelect(index: number) {
    for(var i = 0 ; i< this.dataSource.data.length ; i++ ){
      if(this.dataSource.data[i].LookUpTableValueId == index){
        if(this.dataSource.data[i].selection == undefined || this.dataSource.data[i].selection == false){
          this.dataSource.data[i].selection= true;
        }
        else {
          this.dataSource.data[i].selection= false;
        }
      }
    }
  }
  Delete() {

    this.idTodelete = '';
    if (this.dataSource.data.length > 0) {
      for (var i = 0; i < this.dataSource.data.length; i++) {

        if (this.dataSource.data[i].selection == true) {
          if (this.idTodelete == '')
            this.idTodelete = this.dataSource.data[i].LookUpTableValueId.toString();
          else
            this.idTodelete = this.idTodelete + ',' + this.dataSource.data[i].LookUpTableValueId.toString();
        }
      }
      if (this.idTodelete == "") {
        this.GlobalVariableService.openDialog('Definition', "Please select any record.");
        return;
      }
      //getCommentswithParam
      this._svc.getGenericParmas(this.idTodelete.toString(), "id", 'definition/DeleteLookUp').subscribe(
        data => {
          this.GlobalVariableService.openDialog('Definition', "Record has been Deleted.");
          this.getRecord();
        }, (err) => {

          this.GlobalVariableService.openDialog('Definitions', 'Error Occured while getting Definition Details')
        });
    }
  }

}
