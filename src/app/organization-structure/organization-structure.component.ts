import { Component, OnInit, ViewChild } from '@angular/core';
import { OrgCompany, OrgEntity } from '../Classes/application-work-flow-class';
import { OrgLevel, CompanyTreeStructure } from '../Classes/organization-structure';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { BaseComponent } from '../SharedServices/base-component';

declare const $: any;

@Component({
  selector: 'app-organization-structure',
  templateUrl: './organization-structure.component.html',
  styleUrls: ['./organization-structure.component.css']
})
export class OrganizationStructureComponent extends BaseComponent implements OnInit {
  FormName: string = '';
  FKParentID: number = 0;
  checkHasChild: string = "";
  errorMessage: string = "";
  objOrgCompany: OrgCompany;
  objOrgLevel: OrgLevel;
  objDeleteOrgLevel: OrgLevel;
  lstOrgLevel: OrgLevel[];
  objOrgEntity: OrgEntity;
  EntityInfo: boolean = false;
  showCompanyLevel: boolean = false;
  companyFKid: number;
  entityName: string;
  buttonName: string = '+ Add Entity Below';
  btreadOnly: boolean = false;
  CompanyTreeStructure: CompanyTreeStructure[];
  id: string = '';
  deleteCompany: string = "";
  deleteEntity: string = "";
  /////
  public dataSource = new MatTableDataSource<OrgLevel>();
  public displayedColumns = ['index', 'LevelName', 'LevelArabicName', 'delete']
  //////
  constructor(public languageTranslateService: LanguageTranslateService , private _svc: SharedServicesService, public GlobalVariableService: GlobalVariableService, public dialog: MatDialog) {
    super(languageTranslateService);
    this.objOrgCompany = new OrgCompany();
    this.objOrgLevel = new OrgLevel();
    this.objOrgEntity = new OrgEntity();
    this.objDeleteOrgLevel = new OrgLevel();
    this.CompanyTreeStructure = [];
    this.lstOrgLevel = [];
  }

  ngOnInit() {
    // this.FormName = localStorage.getItem("BPPFromNameEn");
    if(this.GlobalVariableService.isEn){
      this.FormName = localStorage.getItem("BPPFromNameEn");
    }
    else {
      this.FormName = localStorage.getItem("BPPFromNameAr");
    }
    this.getTreeDetail(0);

  }
  getTreeDetail(id: any = null) {
    this._svc.getGenericParmas(id, "id", "Company/GetCompanyTreeStructure").subscribe(
      data => {
        this.CompanyTreeStructure = [];
        this.CompanyTreeStructure = data;
        this.CompanyTree();
        //this.bindTree();
      })
  }


  initialValidationOrgLevel() {
    this.errorMessage = "";
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objOrgLevel.LevelName)) {
      this.errorMessage = this.errorMessage + " English Name ,"
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objOrgLevel.LevelArabicName)) {
      this.errorMessage = this.errorMessage + "Arabic Name ,"

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
  AddCompanyLevel() {
    
    if (this.GlobalVariableService.isNumberNullOrEmplty(this.companyFKid)) {
      this.GlobalVariableService.openDialog("Organization Structure", "Please select Location First");
      return false;
    }
    if (this.initialValidationOrgLevel()) {
      //Company/AddCompanyLevel
      if (this.GlobalVariableService.isNumberNullOrEmplty(this.companyFKid)) {
        this.GlobalVariableService.openDialog("Organization Structure", "Please select Location First");
      }
      else {
        this.objOrgLevel.FK_CompanyId = this.companyFKid;
        this._svc.AddDeleteCompanyLevel(this.objOrgLevel, 'Company/AddCompanyLevel').subscribe(
          data => {
            this.GlobalVariableService.openDialog('Organization Structure', "Successfully Added.");
            this.clearCompanyLevel();
            this.GetLevelsByCompanyId(this.companyFKid.toString());
          }, (err) => {
            this.GlobalVariableService.openDialog('Organization Structure', "Operation Failed Some Error Occured.");
          });
      }
    }
    else {
      this.GlobalVariableService.openDialog('Organization Structure', "Please Fill Mentioned Fields : " + this.errorMessage);
    }
  }
  clearCompanyLevel() {
  this.objOrgLevel = new OrgLevel();
  }

  //Company/UpdateCompany
  clearCompany() {
    this.objOrgCompany = new OrgCompany();
    this.companyFKid = undefined;
  }
  initialValidationOrgStructure() {
    this.errorMessage = "";
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objOrgCompany.CompanyName)) {
      this.errorMessage = this.errorMessage + " English Name,";
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objOrgCompany.CompanyArabicName)) {
      this.errorMessage = this.errorMessage + " Arabic Name ,";

    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objOrgCompany.CompanyShortName)) {
      this.errorMessage = this.errorMessage + " Short Name ,";
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objOrgCompany.Address)) {
      this.errorMessage = this.errorMessage + " Compnay Name ,";
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objOrgCompany.PhoneNumber)) {
      this.errorMessage = this.errorMessage + "Phone Number ,";

    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objOrgCompany.Fax)) {
      this.errorMessage = this.errorMessage + " Fax Number ,";
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objOrgCompany.URL)) {
      this.errorMessage = this.errorMessage + " Company URL ,";
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
  UpdateCompany() {
    if (this.initialValidationOrgStructure()) {
      
      this._svc.UpdateCompany(this.objOrgCompany, 'Company/UpdateCompany').subscribe(
        data => {

          this.showCompanyLevel = true;
          this.companyFKid = data;
          this.GlobalVariableService.openDialog('Organization Structure', "Record Has been saved.");
          this.objOrgCompany = new OrgCompany();
          this.getTreeDetail(0);
        }, (err) => {
          this.showCompanyLevel = false;
          this.GlobalVariableService.openDialog('Organization Structure', "Operation Failed Some Error Occured.");
        });
    }
    else {
      this.GlobalVariableService.openDialog('Organization Structure', "Please Fill Mentioned Fields :" + this.errorMessage)
    }
  }
  Delete(index: number, LevelId: number) {

    if (index != this.lstOrgLevel.length - 1) {
      this.GlobalVariableService.openDialog('Organization Structure', "Please delete from bottom.");
    }
    else {
      for (var i = 0; i < this.lstOrgLevel.length; i++) {
        if (this.lstOrgLevel[i].LevelId == LevelId) {
          this.objDeleteOrgLevel = this.lstOrgLevel[i];
        }
      }
      this._svc.AddDeleteCompanyLevel(this.objDeleteOrgLevel, 'Company/DeleteCompanyLevel').subscribe(
        data => {
          this.GlobalVariableService.openDialog('Organization Structure', "Successfully Deleted.");
          
          this.GetLevelsByCompanyId(this.companyFKid.toString());
          this.getTreeDetail(0);

        }, (err) => {
          this.GlobalVariableService.openDialog('Organization Structure', "Operation Failed Some Error Occured.");
        });
    }
    //Company/DeleteCompanyLevel
  }

  getCompaniesbyId(id: string) {
    //'Company/GetCompaniesbyId'
    this._svc.getGenericParmas(id, "id", 'Company/GetCompaniesbyId').subscribe(
      data => {
        
        this.objOrgCompany = data;
        this.EntityInfo = false;
        this.btreadOnly = false;
        this.objOrgEntity.CompanyName = data.CompanyName;
        this.objOrgEntity.FK_CompanyId = data.CompanyId;
        this.objOrgEntity.FK_ParentId = data.FK_ParentId;
        // this.objOrgEntity.CompanyName = data.CompanyName;
      }, (err) => {
        this.GlobalVariableService.openDialog("Organization Structure", "Operation Failed Some Error Occured.");
      });
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  GetLevelsByCompanyId(id: string) {
    this._svc.getGenericParmas(id, "id", 'Company/GetLevelsByCompanyId').subscribe(
      data => {
        this.lstOrgLevel = [];
        this.lstOrgLevel = data;
        this.dataSource.data = this.lstOrgLevel;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, (err) => {

        this.GlobalVariableService.openDialog("Organization Structure", "Operation Failed Some Error Occured.");
      });
  }

  addNew() {
    

    if (this.GlobalVariableService.isNumberNullOrEmplty(this.companyFKid)) {
      this.GlobalVariableService.openDialog("Organization structure", "Please select Company first");
    }
    else {
      this._svc.getGenericParmas(this.checkHasChild, "Value", 'Company/EntitiesCheck').subscribe(
        data => {
          
          if (data == 0) {
            this.GlobalVariableService.openDialog("Organization Structure", "Cannot Add Any Children");
          }
          else {
            this.EntityInfo = true;

            this.companyFKid = this.objOrgEntity.FK_CompanyId;
            this.entityName = this.objOrgEntity.CompanyName;
            this.objOrgEntity = new OrgEntity();
            this.objOrgEntity.FK_CompanyId = this.companyFKid;
            this.objOrgEntity.FK_ParentId = this.FKParentID;
            this.objOrgEntity.FK_LevelId = data;
            this.objOrgEntity.CompanyName = this.entityName;
            this.objOrgEntity.HasChildren = 1;
          }
        }
      )

    }
    // this.objOrgEntity.EntityId = 0;
  }
  //GetEntityById?id=
  GetEntityById(id: any) {
    this._svc.getGenericParmas(id, "id", "Company/GetEntityById").subscribe(
      data => {
        
        this.objOrgEntity = data;
        this.FKParentID = data.EntityId;
        this.EntityInfo = true;
        this.btreadOnly = true;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  DeleteEntity() {
    
    var id = '';
    if (this.deleteCompany != "") {
      id = this.deleteCompany;
    }
    if (this.deleteEntity != "") {
      id = this.deleteEntity;
    }

    this._svc.getGenericParmas(id, "id", "Company/DeleteEntityCompany").subscribe(
      data => {
        
        if (data == "0") {
          this.GlobalVariableService.openDialog("Organization structure", "Record has been deleted successfully.");
          this.getTreeDetail(0);
        }
        else {
          this.GlobalVariableService.openDialog("Organization structure", "some Error Occured.");
        }
      }
    )
  }
  ShowConfirmDialog(): void {
    var msg = '';
    if (this.GlobalVariableService.isNumberNullOrEmplty(this.companyFKid)) {
      this.GlobalVariableService.openDialog("Organization Structure", "Please select Location First");
    }
    else {
      if (this.deleteCompany != "") {
        msg = 'Selected company and All Entities and their levels will be deleted are You sure you want to proceed?';
      }
      else {
        msg = 'Selected Entity and sub Entities will be deleted are You sure you want to proceed?';
      }
      const message = msg;
      const dialogData = new CustomConfirmDialogModel("Organization Structure", message);
      const dialogRef = this.dialog.open(CustomConfirmModalsComponent, {
        width: "400px",
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.DeleteEntity();
        }
        else {
          this.deleteEntity = "";
          this.deleteCompany = "";
        }
      });
    }
  }

  saveEntity() {

    
    this.objOrgEntity.FK_CompanyId = this.companyFKid;
    this._svc.UpdateEntity(this.objOrgEntity, "Company/UpdateEntity").subscribe(
      data => {
        this.objOrgEntity = new OrgEntity(); 
        this.GlobalVariableService.openDialog("Organization Structure", "Record has been saved.");
        this.getTreeDetail(0);
      }, (err) => {
        this.GlobalVariableService.openDialog("Organization Structure", "Operation Failed Some Error Occured.");
      });
  }
  CompanyTree(): void {
    
    var self = this;
    var data = this.CompanyTreeStructure;
    ;
    var source =
    {
      datatype: "json",
      datafields: [
        { name: 'id' },
        { name: 'parentid' },
        { name: 'text' },
        { name: 'value' },
      ],
      id: 'id',
      localdata: data
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    dataAdapter.dataBind();
    var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
    $('#jqxWidget').jqxTree({ source: records, width: '300px' });
    $('#jqxWidget').on('select', function (event) {

      var args = event.args;
      var item = $('#jqxWidget').jqxTree('getItem', args.element);
      var Level = item.level;
      var myConEle = document.querySelector('[ng-controller=myCntrl]');
      var trt = item.value;
      self.checkHasChild = trt;
      var itemsplit = trt.split(":");
      var EntId = itemsplit[0];
      var EntityId = parseInt(EntId);
      var id = itemsplit[1];
      var Company = itemsplit[2];
      var ID = parseInt(id);
      self.companyFKid = id;
      
      if (Company == "Company") {
        self.deleteCompany = "Company" + "," + id;
        self.deleteEntity = "";
        self.FKParentID = 0; 
        self.getCompaniesbyId(id);
        self.GetLevelsByCompanyId(id);
      }
      else {
        self.deleteEntity = "Entity" + "," + EntityId;
        self.deleteCompany = "";
        self.GetEntityById(EntityId);
      }
    });
  };

}
