import { Component, OnInit, ViewChild } from '@angular/core';
import { GetAllUsers, Sys_Users } from '../Classes/login';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { NewUserPopUpComponent, NewUserPopUp } from './new-user-pop-up/new-user-pop-up.component';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { BaseComponent } from '../SharedServices/base-component';

@Component({
  selector: 'app-define-user',
  templateUrl: './define-user.component.html',
  styleUrls: ['./define-user.component.css']
})
export class DefineUserComponent extends BaseComponent implements OnInit {

  FormName: string = '';
  getAllUsers: GetAllUsers;
  lstusersList: Sys_Users[];
  usersList: Sys_Users[];
  objUsersList: Sys_Users;
  

  /////
  public dataSource = new MatTableDataSource<Sys_Users>();
  selection = new SelectionModel<Sys_Users>(true, []);
  public displayedColumns = ['selected', 'UserID', 'User_FullName', 'GroupID', 'UserEmail', 'JobDesc', 'action']
  //////
  constructor( public languageTranslateService: LanguageTranslateService , private _svc: SharedServicesService, public dialog: MatDialog, private GlobalServices: GlobalVariableService) {
    super(languageTranslateService);
    this.getAllUsers = new GetAllUsers();
    this.lstusersList = [];
    this.usersList = [];
    this.objUsersList = new Sys_Users();
  }

  ngOnInit() {
    this.FormName = localStorage.getItem("BPPFromNameEn");
    this.GetAllUsers();
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  GetAllUsers() {
    //    'User/GetAllUsers'

    this._svc.GetDetails('User/GetAllUsers').subscribe(
      data => {
        this.getAllUsers = data;
        for (var i = 0; i < this.getAllUsers.UsersList.length; i++) {
          this.getAllUsers.UsersList[i].selected = false;
        }
        this.dataSource.data = this.getAllUsers.UsersList;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }

  NewEdit(mode: string): void {

    const modeFlage = mode;
  
    const title =  "New User"
    const dialogData = new NewUserPopUp(title, this.getAllUsers, this.objUsersList, modeFlage);
    const dialogRef = this.dialog.open(NewUserPopUpComponent, {
      width: '80%',
      maxHeight: '70%',

      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.GetAllUsers();
    });

  }
  selectData(id: any) {
    
    for (var i = 0; i < this.getAllUsers.UsersList.length; i++) {
      if (this.getAllUsers.UsersList[i].ID == id) {
        this.objUsersList = this.getAllUsers.UsersList[i];
      }
    }
    const modeFlage = 'edit';
    const title = "Edit User";
    const dialogData = new NewUserPopUp(title, this.getAllUsers, this.objUsersList, modeFlage);
    const dialogRef = this.dialog.open(NewUserPopUpComponent, {
      width: '80%',
      maxHeight: '70%',

      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      //this.result = dialogResult;


    });
  }
  Delete() {
    
    var a = this.dataSource.data.filter(x => x.selected == true);
    if (a.length == 0) {
      this.GlobalServices.openDialog("Define Users", "Please select Record to delete ")
      return;
    }
    else {
      this.lstusersList = this.dataSource.data.filter(x => x.selected == true);
      const message = 'Are you sure you want to delete?';
      const dialogData = new CustomConfirmDialogModel("Define Users ", message);
      const dialogRef = this.dialog.open(CustomConfirmModalsComponent, {
        width: "400px",
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.confirmDelete(this.lstusersList);
        }
      });
    }
  }
  confirmDelete(list: any) {
    
    var deletIDs = "";
    for (var i = 0; i < list.length; i++) {
      if (deletIDs == "") {
        deletIDs = list[i].ID + "";
      }
      else {
        deletIDs = deletIDs + ", " + list[i].ID;
      }
    }
    this._svc.getGenericParmas(deletIDs, "itemsSelected", 'User/DeleteUsers').subscribe(
      data => {
        this.GlobalServices.openDialog('Users', "Record has been deleted.");        
        this.GetAllUsers();
      }, (err) => {
        this.GlobalServices.openDialog('Users', "Error occured.");
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onSelect(index: number) {
    
    for (var i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].ID == index) {
        if (this.dataSource.data[i].selected == undefined || this.dataSource.data[i].selected == false) {
          this.dataSource.data[i].selected = true;
        }
        else {
          this.dataSource.data[i].selected = false;
        }
      }
    }
    // this.dataSource.data[index].selected = !this.dataSource.data[index].selected;
  }
  isAllSelected() {

    // this.dataSource.data[this.selection.selected.length].selected = !this.dataSource.data[this.selection.selected.length].selected
    // const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.data.length;
    // return numSelected === numRows;
  }
  masterToggle() {

    // this.isAllSelected() ?
    //   this.selection.clear() :
    //   this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
