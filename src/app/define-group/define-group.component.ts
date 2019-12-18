import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { AppSetting } from '../Classes/app-setting';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DefineGroup, GroupDetailwithFormId } from '../Classes/define-group';
import { Sys_Groups } from '../Classes/application-work-flow-class';
import { Sys_Modules } from '../Classes/login';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { DefineGroupPopUp, DefineGroupModalComponent } from './define-group-modal/define-group-modal.component';
import { BaseComponent } from '../SharedServices/base-component';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';


@Component({
  selector: 'app-define-group',
  templateUrl: './define-group.component.html',
  styleUrls: ['./define-group.component.css']
})
export class DefineGroupComponent extends BaseComponent implements OnInit {

  result: string = '';
  FormName: string = '';
  AppSetting: AppSetting[];
  DefineGroup: DefineGroup;
  Sys_Modules: Sys_Modules[];
  objSys_Groups: Sys_Groups;
  GroupDetailwithFormId: GroupDetailwithFormId;
  public dataSource = new MatTableDataSource<Sys_Groups>();
  selection = new SelectionModel<Sys_Groups>(true, []);
  public displayedColumns = ['Desc_Ar', 'Desc_En', 'action']

  constructor( public languageTranslateService: LanguageTranslateService ,private _svc: SharedServicesService, public dialog: MatDialog,
    private GlobalVariableService: GlobalVariableService
  ) {
    super(languageTranslateService);
    this.AppSetting = [];
    this.DefineGroup = new DefineGroup();
    this.Sys_Modules = [];
    this.objSys_Groups = new Sys_Groups();
    this.GroupDetailwithFormId = new GroupDetailwithFormId();
  }

  ngOnInit() {
   
      this.FormName = localStorage.getItem("BPPFromNameEn");
       this.getDetail();
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  getDetail() {

    this._svc.GetDetails('Group/Index').subscribe(
      data => {
        this.DefineGroup = data;
        this.dataSource.data = this.DefineGroup.GroupList;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }

  NewEdit(mode: string, index: number = 0): void {

    if (mode == 'Edit') {

      this.objSys_Groups.GroupID = index;
      this.GroupDetail(this.objSys_Groups.GroupID);
    }
    if (mode == 'New') {
      const modeFlage = mode;
      this.objSys_Groups = new Sys_Groups;
      const message = 'New Group';
      const dialogData = new DefineGroupPopUp("Confirm Action", message, this.DefineGroup, this.objSys_Groups, modeFlage);
      const dialogRef = this.dialog.open(DefineGroupModalComponent, {
        width: '99vw',
        height: '70vh',
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        this.result = dialogResult;
        this.getDetail();

      });
    }
  }
  GroupDetail(id: number) {

    this._svc.getGenericParmas(id, "id", 'Group/GroupDetail')
      .subscribe(
        data => {
          this.GroupDetailwithFormId = data;
          this.objSys_Groups.Desc_Ar = this.GroupDetailwithFormId.Desc_Ar
          this.objSys_Groups.Desc_En = this.GroupDetailwithFormId.Desc_En
          this.objSys_Groups.GroupID = this.GroupDetailwithFormId.groupId

          for (var i = 0; i < this.GroupDetailwithFormId.Formids.length; i++) {
            for (var j = 0; j < this.DefineGroup.FormList.length; j++) {
              if (this.GroupDetailwithFormId.Formids[i].toString() == this.DefineGroup.FormList[j].FormID.toString()) {
                this.DefineGroup.FormList[j].seleted = true;
                break;
                //FormID
              }
            }
          }

          const modeFlage = "Edit";
          const message = 'Edit Group';
          const dialogData = new DefineGroupPopUp("Confirm Action", message, this.DefineGroup, this.objSys_Groups, modeFlage);
          const dialogRef = this.dialog.open(DefineGroupModalComponent, {
            // width: '80%',
            // height: '80%',
            width: '99vw',
            height: '70vh',

            data: dialogData
          });

          dialogRef.afterClosed().subscribe(dialogResult => {

            this.result = dialogResult;
            this.getDetail();

          });

        }
        , (err) => {
          this.GlobalVariableService.openDialog('Definitions', 'Error Occured while getting Group Details')
        });
    //    "Group/GroupDetail"
  }
  Delete() {

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}