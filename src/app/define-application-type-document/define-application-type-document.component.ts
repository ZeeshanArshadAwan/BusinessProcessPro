import { Component, OnInit, ViewChild } from '@angular/core';
import { CatagoryClass } from '../Classes/definition';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { BaseComponent } from '../SharedServices/base-component';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { ApplicationType } from '../Classes/application-work-flow-class';
import { ApplicationType_Documents } from '../Classes/ApplicationType_Documents';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';

@Component({
  selector: 'app-define-application-type-document',
  templateUrl: './define-application-type-document.component.html',
  styleUrls: ['./define-application-type-document.component.css']
})
export class DefineApplicationTypeDocumentComponent extends BaseComponent implements OnInit {


  fromName: string = "";
  applicationtypeList: ApplicationType;
  apptypedocument: ApplicationType_Documents;
  apptypedocumentlist: ApplicationType_Documents[];
  errorMsg: string = '';

  public dataSource = new MatTableDataSource<ApplicationType_Documents>();
  selection = new SelectionModel<ApplicationType_Documents>(true, []);
  public displayedColumns = ['select', 'DocumentNameEN', 'DocumentNameAr', 'action']
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public languageTranslateService: LanguageTranslateService,
    public dialog: MatDialog, private _svc: SharedServicesService, private GlobalVariableService: GlobalVariableService) {
    super(languageTranslateService);
    this.applicationtypeList = new ApplicationType();
    this.apptypedocument = new ApplicationType_Documents();
    this.apptypedocumentlist = [];
  }

  ngOnInit() {
    this.fromName = localStorage.getItem("BPPFromNameEn");
    this.GetAllApplicationTypes();
    this.GetAllDocumentTypes();
  }

  Clear() {
    this.apptypedocument = new ApplicationType_Documents();
  }
  Delete() {
    var a = this.dataSource.data.filter(x => x.selected == true);
    if (a.length > 0) {
      const message = 'Are you sure you want to delete?';
      const dialogData = new CustomConfirmDialogModel("Application Type Document", message);
      const dialogRef = this.dialog.open(CustomConfirmModalsComponent, {
        width: "400px",
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(dialogResult => {

        if (dialogResult) {
          this.confirmDelete();
        }
      });
    }
    else {
      this.GlobalVariableService.openDialog("Application Design", "Please select Record to delete.")
    }

  }
  confirmDelete() {
    
    var deleteId = '';
    var a = this.dataSource.data.filter(x => x.selected ==true);
    for (var i = 0; i < a.length; i++) {
      if (deleteId == "") {
        deleteId = a[i].DocumentTypeId.toString();
      }
      else {
        deleteId = deleteId + ',' + a[i].DocumentTypeId.toString()
      }
    }
    this._svc.getGenericParmas(deleteId, "Ids", 'ApplicationType/DeleteAppTypeDocument').subscribe(
      data => {
        this.GetAllApplicationTypes();
        this.GetAllDocumentTypes();
        this.GlobalVariableService.openDialog("Application Type Document", "Record Has been deleted.")
      }, (err) => {

      }
    );

  }

  AddVisitType() {
    alert("save")
  }
  //Table functions 
  onSelect(id: string) {
    for (var i = 0; i < this.dataSource.data.length; i++) {
      if (id == this.dataSource.data[i].DocumentTypeId.toString()) {
        this.dataSource.data[i].selected = !this.dataSource.data[i].selected;
      }
    }
  }
  // isAllSelected() {
  //   this.dataSource.data[this.selection.selected.length - 1].selection = !this.dataSource.data[this.selection.selected.length - 1].selection
  //   const numSelected = this.selection.selected.length - 1;
  //   const numRows = this.dataSource.data.length - 1;
  //   return numSelected === numRows;
  // }
  // masterToggle() {
  //   this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  // }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  GetAllApplicationTypes() {
    this._svc.GetDetails('ApplicationType/GetAllApplicationTypes').subscribe(
      data => {
        this.applicationtypeList = data;
      }, (err) => {
        this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured while Getting All Application Types.")
      });
  }
  SaveAppTypeDoc() {

    this.apptypedocument.DocumentTypeId=this.apptypedocument.DocumentTypeId;
    this.apptypedocument.FK_ApplicationTypeId = this.apptypedocument.FK_ApplicationTypeId;
    this.apptypedocument.DocumentNameEN = this.apptypedocument.DocumentNameEN;
    this.apptypedocument.DocumentNameAr = this.apptypedocument.DocumentNameAr;
    this.apptypedocument.IsRequired = false;
    this.initialValidation()
    if(this.errorMsg != ''){
      this.GlobalVariableService.openDialog("Application Type Document" , "Please fill the Following Fields : " + this.errorMsg)
    }
    else {
      this._svc.SaveAppTypeDocument(this.apptypedocument, 'ApplicationType/AddUpdateApplicationTypeDocuments').subscribe(
        data => {
          this.apptypedocument = new ApplicationType_Documents();
          this.GlobalVariableService.openDialog("Application Type Document ", "Record has been saved.")
          this.GetAllDocumentTypes();
        }, (err) => {
          this.GlobalVariableService.openDialog("Application Type Document", "Some Error has been occured.")
        });
    }
  }
  GetAllDocumentTypes() {
    this._svc.GetDetails('ApplicationType/GetAllApplicationTypeDocuments').subscribe(
      data => {
        this.apptypedocumentlist = data;
        for (var i = 0; i < this.apptypedocumentlist.length; i++) {
          this.apptypedocumentlist[i].selected = false;
        }
        this.dataSource.data = this.apptypedocumentlist;
      }, (err) => {
        this.GlobalVariableService.openDialog("Service Type ", "Some Error has been occured while Getting All Application Types.")
      });

  }
  initialValidation(){
    this.errorMsg ='';
    if(this.GlobalVariableService.isStringNullOrEmplty(this.apptypedocument.DocumentNameEN) ){
    this.errorMsg = this.errorMsg +' Appliction Type' 
    }
    if(this.GlobalVariableService.isStringNullOrEmplty(this.apptypedocument.DocumentNameAr) ){
      this.errorMsg = this.errorMsg +', Document Name Arabic' 
    }
    if(this.GlobalVariableService.isNumberNullOrEmplty(this.apptypedocument.FK_ApplicationTypeId) || this.apptypedocument.FK_ApplicationTypeId == 0){
      this.errorMsg = this.errorMsg +', Document Name English' 
    }

  }

  selectData(id: number) {

    this.apptypedocument = this.apptypedocumentlist.filter(a => a.DocumentTypeId == id)[0];
  }

  // end Table Functions
}
