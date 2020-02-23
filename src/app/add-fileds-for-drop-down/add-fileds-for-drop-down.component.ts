import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ApplicationTypeFields } from '../Classes/application-review';
import { FieldListItems } from '../Classes/application-work-flow-class';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';

@Component({
  selector: 'app-add-fileds-for-drop-down',
  templateUrl: './add-fileds-for-drop-down.component.html',
  styleUrls: ['./add-fileds-for-drop-down.component.css']
})
export class AddFiledsForDropDownComponent implements OnInit {
  FiledId: number;
  ItemId:number;
  objFieldListItems: FieldListItems;
  constructor(public _svc: SharedServicesService, public dialog: MatDialog,
    public GlobalVariableService: GlobalVariableService, public dialogRef: MatDialogRef<AddFiledsForDropDownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddFiledsForDropDownData
  ) {
    this.objFieldListItems = new FieldListItems();
    this.FiledId = data.FiledId;
    if(this.GlobalVariableService.isNumberNullOrEmplty(this.FiledId)){
      this.FiledId = this.GlobalVariableService.FieldID;
    }

  }

  ngOnInit() {
    this.getdata();
  }
  getdata() {
    
    var a = this.GlobalVariableService.FieldID;
    this._svc.getGenericParmas(a, 'FK_FieldId', 'DynamicForm/GetAllFieldListItemsByFieldId').subscribe
      (
        data => {
          
          this.dataSource.data = data;
          this.GlobalVariableService.ListFieldItems=data;
          for (var a = 0; a < this.dataSource.data.length; a++) {
            this.dataSource.data[a].selected = false;
          }
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, (err) => {
           this.GlobalVariableService.openDialog("Application", "Some Error has been occured.")
        }
      );
  }
  public dataSource = new MatTableDataSource<FieldListItems>();

  selection = new SelectionModel<FieldListItems>(true, []);
  public displayedColumns = ['select', 'FieldValue', 'FieldText', 'action']

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  Save() {
    this.objFieldListItems.FK_FieldId = this.FiledId;
    this._svc.SaveFieldsItemsInfo(this.objFieldListItems, 'DynamicForm/SaveFieldsItemsInfo').subscribe
      (
        data => {
          this.objFieldListItems=new FieldListItems();
          this.getdata();
          this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId,true)
        }, (err) => {
          this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured.")
        }
      );
  }
  onSelect(ItemId: number) {
    
    for (var i = 0; i < this.dataSource.data.length; i++) {

      if (this.dataSource.data[i].ItemId == ItemId) {
        this.dataSource.data[i].selected = !this.dataSource.data[i].selected;
      }
      else {
        this.dataSource.data[i].selected = false;
      }
    }
  }
  selectData(id: number) {
    this.objFieldListItems = this.dataSource.data.filter(x => x.ItemId == id)[0];
  }
 
  // Delete() {
  //   
  //   var a = this.dataSource.data.filter(x => x.selected == true);
  //   for (var i = 0; i < a.length; i++) {
  //     this._svc.getGenericParmas(a[i].ItemId, 'itemId', 'DynamicForm/DeleteFieldListItem').subscribe
  //       (
  //         data => {
  //           this.getdata();
  //         }, (err) => {
  //           this.GlobalVariableService.openDialog("Application", "Some Error has been occured.")
  //         }
  //       );
  //   }
  // }
  Clear() {
    this.objFieldListItems = new FieldListItems();
  }
  Delete() {
    var a = this.dataSource.data.filter(x => x.selected == true);
    for (var i = 0; i < a.length; i++) {
      this.ItemId = a[0].ItemId;
      this._svc.getGenericParmas(this.ItemId, 'FK_ItemId', 'DynamicForm/GetAllApplicationFieldsbyitem').subscribe
      (
        data => {
         if(data.length > 0)
         {
          this.GlobalVariableService.openDialog("Application", "Groups exists against item.")
         }
         else{
          this._svc.getGenericParmas(this.ItemId, 'itemId', 'DynamicForm/DeleteFieldListItem').subscribe
          (
            data => {
              this.getdata();
              this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId,true);
            }, (err) => {
               this.GlobalVariableService.openDialog("Application", "Some Error has been occured.")
            }
          );
         }
         
        }, (err) => {
           this.GlobalVariableService.openDialog("Application", "Some Error has been occured.")
        }
      );
    }
  }

  ShowConfirmDialog(): void {

    const message = 'Are you sure you want to delete selected Records?';
    const dialogData = new CustomConfirmDialogModel("Application  ", message);
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


export class AddFiledsForDropDownData {
  constructor(public FiledId: number) {
  }

}
