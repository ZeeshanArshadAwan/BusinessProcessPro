import { Component, OnInit, ViewChild } from '@angular/core';
import { Locationlevel } from '../Classes/locationlevel';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { SelectionModel } from '@angular/cdk/collections/typings';
import { Company } from '../Classes/company';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';

@Component({
  selector: 'app-location-level',
  templateUrl: './location-level.component.html',
  styleUrls: ['./location-level.component.css']
})
export class LocationLevelComponent implements OnInit {
  errorMessage: string = "";
  DeleteLevelsstring: string = "";
  FormName: string = 'Location Level';
  public dataSource = new MatTableDataSource<Locationlevel>();
  public displayedColumns = [ 'selected','LevelName', 'LevelArabicName', 'CompanyName', 'Edit']
  url = '';
  lstLocatonlevel: Locationlevel[];
  lstCompanies: Company[];
  ObjLocationLevel: Locationlevel;
  ObjDeleteLocationLevel: Locationlevel;
  // Locatonlevel: Locationlevel[];
  // objappSetReq_params: appSetReq_params;
  constructor(private _svc: SharedServicesService, public dialog: MatDialog, public GlobalVariableService: GlobalVariableService) {
    this.lstLocatonlevel = [];
    this.ObjLocationLevel = new Locationlevel();
    this.ObjDeleteLocationLevel = new Locationlevel();

    //this.objappSetReq_params = new appSetReq_params();
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.Getlocationlevel();
    this.GetCompaniesList();

  }
  //Location/DeleteMultipleLocationLevels


  onSelect(index: number , FK_CompanyId: any) {
    
    for(var i = 0 ; i< this.dataSource.data.length ; i++ ){
      if(this.dataSource.data[i].LocationLevelId == index && this.dataSource.data[i].FK_CompanyId ==  FK_CompanyId){
        if(this.dataSource.data[i].DeleteLevelsstring == undefined || this.dataSource.data[i].selected == false){
          this.dataSource.data[i].selected = true;
        }
        else {
          this.dataSource.data[i].selected= false;
        }
      }
    }
  }

  Delete(){
    
    this.DeleteLevelsstring = '';
    if (this.dataSource.data.length > 0) {
      for (var i = 0; i < this.dataSource.data.length; i++) {

        if (this.dataSource.data[i].selected == true) {
          if (this.DeleteLevelsstring == '')
            this.DeleteLevelsstring = this.dataSource.data[i].LocationLevelId.toString()+";"+this.dataSource.data[i].FK_CompanyId;
          else
            this.DeleteLevelsstring = this.DeleteLevelsstring + ',' + this.dataSource.data[i].LocationLevelId.toString()+";"+this.dataSource.data[i].FK_CompanyId;
        }
      }
      if (this.DeleteLevelsstring == "") {
        this.GlobalVariableService.openDialog('Location Level', "Please select any record.");
        return;
      }
      this.ObjDeleteLocationLevel.DeleteLevelsstring = this.DeleteLevelsstring;
      //getCommentswithParam
      this._svc.DeleteMultipleLocationLevels( this.ObjDeleteLocationLevel, 'Location/DeleteMultipleLocationLevels').subscribe(
        data => {
          this.GlobalVariableService.openDialog('Location Level', "Record has been Deleted.");
          this.DeleteLevelsstring = "";
          this.ObjDeleteLocationLevel = new Locationlevel();
          this.Getlocationlevel();
          this.GetCompaniesList();
        }, (err) => {

          this.GlobalVariableService.openDialog('Location Level', 'Error Occured while getting Definition Details')
        });
    }
  
  }


  ShowConfirmDialog(): void {
    this.DeleteLevelsstring = '';

    for (var i = 0; i < this.dataSource.data.length; i++) {

      if (this.dataSource.data[i].selected == true) {
        if (this.DeleteLevelsstring == '')
          this.DeleteLevelsstring = this.dataSource.data[i].LocationLevelId.toString()+";"+this.dataSource.data[i].FK_CompanyId;
        else
          this.DeleteLevelsstring = this.DeleteLevelsstring + ',' + this.dataSource.data[i].LocationLevelId.toString()+";"+this.dataSource.data[i].FK_CompanyId;
      }
    }
    if (this.DeleteLevelsstring == "") {
      this.GlobalVariableService.openDialog('Category', "Please select any record.");
    }
    else {
      const message = 'Are you sure you want to delete selected Records?';
      const dialogData = new CustomConfirmDialogModel("Location Level ", message);
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


  Getlocationlevel() {
    this._svc.GetDetails("Location/GetAllLocationsLevels").subscribe(
      data => {
        
        this.lstLocatonlevel =[];
        this.lstLocatonlevel = data;
        for(var i= 0; i< this.lstLocatonlevel.length ; i++){
          this.lstLocatonlevel[i].selected = false;
        }
        this.dataSource.data =[];
        this.dataSource.data = this.lstLocatonlevel;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      , (err) => {
        this.GlobalVariableService.openDialog('Location Level', 'Error Occured while getting Definition Details')
      });
  }
  //Location/GetLocationAgainstCompany
  GetLocationAgainstCompany(id: any) {
    
    if (id == "") {
     this.Getlocationlevel();
    }
    else {
      this._svc.getGenericParmas(id, "id", 'Location/GetLocationAgainstCompany').subscribe(
        data => {
          this.lstLocatonlevel = [];
          this.lstLocatonlevel = data;
          this.dataSource.data = this.lstLocatonlevel;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, (err) => {
          this.GlobalVariableService.openDialog('Location Level', 'Error Occured while getting Definition Details')
        }
      );
    }
  }
  GetCompaniesList() {
    this._svc.GetDetails("Company/GetAllCompanies").subscribe(
      data => {
        this.lstCompanies = [];
        this.lstCompanies = data;
      }
    )

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  saveLocationLevel() {
    if (this.initialValidation()) {
      this._svc.SaveLocationlevel(this.ObjLocationLevel, "Location/AddLocationLevel").subscribe(
        data => {
          //  this.lstCompanies = data;
          this.GlobalVariableService.openDialog('Location Level', 'Record has been saved.')
          this.Getlocationlevel();
          this.GetCompaniesList();
          this.Cancel();
        }, (err) => {
          this.GlobalVariableService.openDialog('Location Level', 'Error Occured while saving Record.')
        });
    }
    else {
      this.GlobalVariableService.openDialog('Location Level', "Please Fill Mentioned Fields : " + this.errorMessage)
    }


  }
  initialValidation() {
    
    this.errorMessage = "";
    if (this.GlobalVariableService.isNumberNullOrEmplty(this.ObjLocationLevel.FK_CompanyId) || this.ObjLocationLevel.FK_CompanyId == 0) {
      this.errorMessage = this.errorMessage + " Company ,";
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.ObjLocationLevel.LevelArabicName)) {
      this.errorMessage = this.errorMessage + " Arabic Name ,";
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.ObjLocationLevel.LevelName)) {
      this.errorMessage = this.errorMessage + " level Name ,";
    }

    if (this.errorMessage == "") {
      this.errorMessage = "";
      return true;
    }
    else {
      this.errorMessage = this.errorMessage.substring(0, this.errorMessage.length - 1);
      return false;
    }

  }

  NewEdit(mode: string, id: number = 0 , FK_CompanyId: number =  0): void {
    
    if (mode == 'Edit') {
      for (var i = 0; i < this.lstLocatonlevel.length; i++) {
        if (this.lstLocatonlevel[i].LocationLevelId == id && this.lstLocatonlevel[i].FK_CompanyId == FK_CompanyId ) {
          this.ObjLocationLevel = this.lstLocatonlevel[i];
          break;
        }
      }
      //  this.GroupDetail(this.objSys_Groups.GroupID);     
    }

  }
  Cancel() {
    this.ObjLocationLevel = new Locationlevel();
  }
}
