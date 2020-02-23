import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ApplicationTypeFields } from '../Classes/application-review';
import { FieldListGroups,FieldListItems } from '../Classes/application-work-flow-class';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';

@Component({
  selector: 'app-add-groups-for-drop-down',
  templateUrl: './add-groups-for-drop-down.component.html',
  styleUrls: ['./add-groups-for-drop-down.component.css']
})
export class AddgroupsForDropDownComponent implements OnInit {
  FiledId: number;
  PanelId: number;
  ApplicationFields: ApplicationTypeFields[];
  ApplicationItems: FieldListItems[];
  objFieldListItems: FieldListGroups;
  constructor(public _svc: SharedServicesService, public dialog: MatDialog,
    public GlobalVariableService: GlobalVariableService, public dialogRef: MatDialogRef<AddgroupsForDropDownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddGroupsForDropDownData
  ) {
    this.objFieldListItems = new FieldListGroups();
    this.FiledId = data['dialogData'].FiledId;
    this.PanelId = data['dialogData'].PanelId;
  }

  ngOnInit() {
   
    this.getdata();
    this.ApplicationFields = this.GlobalVariableService.controllsApplicationTypeFields.filter(x => x.FK_PanelId == this.PanelId)
    var abc = this.GlobalVariableService.listSelectData.filter(x => x.id == this.FiledId)
    this.ApplicationItems = abc[0].FieldListItems;
  }
  public dataSource = new MatTableDataSource<FieldListGroups>();

  selection = new SelectionModel<FieldListGroups>(true, []);
  public displayedColumns = ['select', 'Item', 'Field', 'action']

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  Save() {
   
    if(!this.validateGroup()){
    //this.objFieldListItems.FK_FieldId = this.FiledId;
    this._svc.SaveFieldsGroupInfo(this.objFieldListItems, 'DynamicForm/SaveApplicationFieldsGroup').subscribe
      (
        data => {
          this.objFieldListItems = new FieldListGroups();
          this.getdata();
         // this.GlobalVariableService.getdata();
          this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId,true)
        }, (err) => {
          this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured.")
        }
      );
    }
  }
  onSelect(ApplicationFieldsGroupId: number) {
    for (var i = 0; i < this.dataSource.data.length; i++) {

      if (this.dataSource.data[i].ApplicationFieldsGroupId == ApplicationFieldsGroupId) {
        this.dataSource.data[i].selected = !this.dataSource.data[i].selected;
      }
      else {
        this.dataSource.data[i].selected = false;
      }
    }
  }
  getdata() {
    var a = this.FiledId;
    this._svc.getGenericParmas(a, 'FK_FieldId', 'DynamicForm/GetItemsByField').subscribe
      (
        data => {
         
          this.dataSource.data = data;
          this.GlobalVariableService.ListFieldItems = data;
          this.GlobalVariableService.ItemList = data;
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
  selectData(id: number) {
   
    this.objFieldListItems = this.dataSource.data.filter(x => x.FK_ItemId == id)[0];
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
    this.objFieldListItems = new FieldListGroups();
  }
  Delete() {
    var a = this.dataSource.data.filter(x => x.selected == true);
    for (var i = 0; i < a.length; i++) {
      this._svc.getGenericParmas(a[i].ApplicationFieldsGroupId, 'AppGroupID', 'DynamicForm/DeleteFieldgroupItem').subscribe
        (
          data => {
            this.getdata();
            this.GlobalVariableService.getdata();
            this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId,true);
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
  validateGroup() {
   
    if (this.GlobalVariableService.isNumberNullOrEmplty(this.objFieldListItems.FK_ItemId) || this.objFieldListItems.FK_ItemId ==0) {
      this.GlobalVariableService.openDialog("Application", "Please select item.");
      return true;
    }
    if (this.GlobalVariableService.isNumberNullOrEmplty(this.objFieldListItems.FK_FieldId) || this.objFieldListItems.FK_FieldId ==0) {
      this.GlobalVariableService.openDialog("Application", "Please select field.");
      return true;
    }
  }
}


export class AddGroupsForDropDownData {
  constructor(public FiledId: number, public PanelId: number) {
  }

}
