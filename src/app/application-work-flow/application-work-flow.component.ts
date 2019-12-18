import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApplicationType, Sys_Groups, applicationStatus, OrgCompany, OrgEntity, ApplciationTypePanels } from '../Classes/application-work-flow-class';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';
import { GetAllUsers } from '../Classes/login';
import { ChangeDetectorRef } from '@angular/core';
import { AddNewControllComponent } from '../add-new-controll/add-new-controll.component';
import { ConnectedPositionStrategy } from '@angular/cdk/overlay';
import { FormControl, FormGroup } from '@angular/forms';
import { AddNewControll } from '../Classes/app-setting';
import { AddEscalationComponent, EcslationModel } from './add-escalation/add-escalation.component';
import { LoadDynamicControllComponent } from '../load-dynamic-controll/load-dynamic-controll.component';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { BaseComponent } from '../SharedServices/base-component';
import jsPDF from 'jspdf';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent, FocusEvent, BlurEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { DisplayControls } from '../Classes/Applications';
import { ApplicationTypeTemplate } from '../Classes/ApplicationTypeTemplate';
import { ApplicationStatus } from '../Classes/application-review';

declare var $: any


@Component({
  selector: 'app-application-work-flow',
  templateUrl: './application-work-flow.component.html',
  styleUrls: ['./application-work-flow.component.css']
})

export class ApplicationWorkFlowComponent extends BaseComponent implements OnInit {
  public Editor = ClassicEditor;
  ckconfig;
  public componentEvents: string[] = [];
  apptypetemplate: ApplicationTypeTemplate;
  datalist: datalist[];
  objdatalist: datalist;
  newobjdatalist: datalist;
  AddNewControll: AddNewControll;
  listAddNewControll: AddNewControll[];
  objPanelInfo: ApplciationTypePanels;

  ///
  lstApplicationType: ApplicationType[];
  deleteList: ApplicationType[];
  lstOrgCompany: OrgCompany[];
  lstOrgEntity: OrgEntity[];
  objGetAllUsers: GetAllUsers;
  deleteapplicationStatus: applicationStatus[];
  editDetail: ApplicationType;
  lstSys_Groups: Sys_Groups[];
  vStatus_SysGroup: Sys_Groups[];
  popUpMsg: string = "";
  sPopKey: string = "";
  bUserGroup: boolean = true;
  bOrganizationUnit: boolean = false;
  bSpecificUser: boolean = false;
  formGroup: FormGroup;
  lstapplicationStatus: applicationStatus[];
  objapplicationStatus: applicationStatus;
  visitStatus: boolean = false;
  visitStatuss: boolean = false;
  selectedIndex: number = 0;
  visitstatusID: number = 0;
  FormName: string = '';
  objApplicationType: ApplicationType;
  public dataSource = new MatTableDataSource<ApplicationType>();
  selection = new SelectionModel<ApplicationType>(true, []);
  public displayedColumns = ['select', 'ApplicationNoAbbreviation', 'ApplicationTypeEn', 'ApplicationTypeAr', 'Visible', 'action']

  ////second tab Edit Mode
  public visitStatusDataSource = new MatTableDataSource<applicationStatus>();
  visitStatusSelection = new SelectionModel<applicationStatus>(true, []);
  public visitStatusDisplayedColumns = ['selectVisitStatus', 'StatusNameEn', 'StatusNameAr', 'CREATED_DATE', 'actionVisitStatus', 'Escalation']



  result: string = '';
  downLoadEnglishTemplate: string = "";
  downLoadArabicTemplate: string = "";
  fillEnglishTemp: string = "";
  fillArabicTemplate: string = "";



  constructor(public languageTranslateService: LanguageTranslateService, private _svc: SharedServicesService, private GlobalVariableService: GlobalVariableService,
    public dialog: MatDialog, private cdRef: ChangeDetectorRef) {
    super(languageTranslateService);
    this.lstApplicationType = [];
    this.lstSys_Groups = [];
    this.objApplicationType = new ApplicationType();
    this.deleteList = [];
    this.deleteapplicationStatus = [];
    this.lstapplicationStatus = [];
    this.objapplicationStatus = new applicationStatus();
    this.lstOrgCompany = [];
    this.lstOrgEntity = [];
    this.vStatus_SysGroup = [];
    this.objGetAllUsers = new GetAllUsers();
    this.datalist = [];
    this.objdatalist = new datalist();
    this.newobjdatalist = new datalist();
    this.AddNewControll = new AddNewControll();
    this.listAddNewControll = [];
    this.objPanelInfo = new ApplciationTypePanels();
    this.GlobalVariableService.bDisplayControls = true;
    this.apptypetemplate = new ApplicationTypeTemplate();

  }

  ngOnInit() {
    this.FormName = localStorage.getItem("BPPFromNameEn");
    this.getAllVisitTypes();
    this.GetAllGroups();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortStatus: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginatorStatus: MatPaginator;

  @ViewChild('LoadDynamicControll', { static: true }) LoadDynamicControll: LoadDynamicControllComponent;

  getAllVisitTypes() {
    //this._svc.getAllVisitTypes()
    this._svc.GetDetails('ApplicationType/GetAllApplicationTypes').subscribe(
      data => {
        this.lstApplicationType = [];
        this.lstApplicationType = data;
        for (var i = 0; i < this.lstApplicationType.length; i++) {
          this.lstApplicationType[i].selected = false;
        }
        this.dataSource.data = this.lstApplicationType;
        this.dataSource.sort = this.sortStatus;
        this.dataSource.paginator = this.paginatorStatus;
      }
      , (err) => {
        this.GlobalVariableService.openDialog('Application Design', err.toString())
      });
  }
  GetAllGroups() {
    //GetAllGroups()
    this._svc.GetDetails('Company/GetAllGroups').subscribe(
      data => {

        this.lstSys_Groups = data;
      }
      , (err) => {
        this.GlobalVariableService.openDialog('Application Design', err.toString())
      });

  }
  groupsVisitStatus() {
    //GetAllGroups()
    this._svc.GetDetails('Company/GetAllGroups').subscribe(
      data => {
        this.vStatus_SysGroup = data;
      }
      , (err) => {
        this.GlobalVariableService.openDialog('Application Design', err.toString())
      });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Cancel() {
    this.selectedIndex = 0;
    this.visitStatus = false;
  }
  ///need to work on these
  onChange(i: number, key: string = "") {

    if (key == 'VS') {
      this.vStatus_SysGroup[i].selected = !this.vStatus_SysGroup[i].selected;
    } else {
      this.lstSys_Groups[i].selected = !this.lstSys_Groups[i].selected;
    }
  }
  isAllSelected() {

  }
  masterToggle() {

  }
  hasValue() {

  }
  ////////

  initialValidationVisitType() {
    this.checSub();
    this.popUpMsg = "";
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objApplicationType.ApplicationNoAbbreviation)) {
      this.popUpMsg = this.popUpMsg + " Application Type Abbreviation ,";
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objApplicationType.ApplicationTypeEn)) {
      this.popUpMsg = this.popUpMsg + " Application Type English ,";
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objApplicationType.ApplicationTypeAr)) {
      this.popUpMsg = this.popUpMsg + " Application Type Arabic ,";

    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objApplicationType.ApplicationNoFormula)) {
      this.popUpMsg = this.popUpMsg + " Application No Formula ,";

    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objApplicationType.SubmissionGroups)) {
      this.popUpMsg = this.popUpMsg + " Submission Group ,";
    }

    if (this.popUpMsg == "") {
      this.popUpMsg = "";
      return true;
    }
    else {
      this.popUpMsg = this.popUpMsg.substring(0, this.popUpMsg.length - 1);
      return false;
    }

  }
  checSub() {
    for (var i = 0; i < this.lstSys_Groups.length; i++) {
      if (this.lstSys_Groups[i].selected) {
        if (this.objApplicationType.SubmissionGroups == "")
          this.objApplicationType.SubmissionGroups = this.lstSys_Groups[i].GroupID.toString();
        else
          this.objApplicationType.SubmissionGroups = this.objApplicationType.SubmissionGroups + "\",\"" + this.lstSys_Groups[i].GroupID.toString();
      }
    }
  }
  AddVisitType() {

    //objApplicationType]
    if (this.initialValidationVisitType()) {
      this.objApplicationType.SubmissionGroups = "";
      for (var i = 0; i < this.lstSys_Groups.length; i++) {
        if (this.lstSys_Groups[i].selected) {
          if (this.objApplicationType.SubmissionGroups == "")
            this.objApplicationType.SubmissionGroups = this.lstSys_Groups[i].GroupID.toString();
          else
            this.objApplicationType.SubmissionGroups = this.objApplicationType.SubmissionGroups + "\",\"" + this.lstSys_Groups[i].GroupID.toString();
        }
      }

      this.objApplicationType.SubmissionGroups = "[\"" + this.objApplicationType.SubmissionGroups + "\"]"
      this._svc.AddVisitType(this.objApplicationType, 'ApplicationType/AddApplicationType').subscribe(
        data => {
          this.objApplicationType = new ApplicationType();
          this.getAllVisitTypes();
          this.GetAllGroups();
          this.objapplicationStatus = new applicationStatus();
          this.GlobalVariableService.openDialog("Application Design", "Record has been saved.")
        }
        , (err) => {
          this.GlobalVariableService.openDialog('Application Design', err.toString())
        });
    }
    else {
      this.GlobalVariableService.openDialog("Application Design", "Please Fill Mentioned Fields : " + this.popUpMsg)
    }
  }
  Clear() {

    this.objapplicationStatus = new applicationStatus();
    this.objApplicationType = new ApplicationType();
    this.visitStatus = false;
    this.GetAllGroups();
    // this.formGroup.get('VisitTypeAbbrevation').markAsUntouched();
  }
  onSelect(id: any) {
    for (var i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].ApplicationTypeId == id) {
        if (this.dataSource.data[i].selected) {
          this.dataSource.data[i].selected = false;
        }
        else {
          this.dataSource.data[i].selected = true;
        }
      }
    }
  }
  Delete() {
    this.deleteList = this.dataSource.data.filter(x => x.selected == true);
    if (this.deleteList.length > 0) {
      this.confirmDialog();
    }
    else {
      this.GlobalVariableService.openDialog("Application Design", "Please select Record to delete.")
    }
  }

  confirmDialog(): void {

    const message = 'Are you sure you want to delete?';
    const dialogData = new CustomConfirmDialogModel("Application Design", message);
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
  ApplicationTypeClear() {
    this.objapplicationStatus = new applicationStatus();
    for (var i = 0; i < this.vStatus_SysGroup.length; i++) {
      this.vStatus_SysGroup[i].selected = false;
    }
  }
  confirmDelete() {

    if (this.visitStatus) {
      var deleteId = "";
      this.deleteapplicationStatus = this.visitStatusDataSource.data.filter(x => x.selected == true);
      for (var i = 0; i < this.deleteapplicationStatus.length; i++) {
        if (deleteId == "") {
          deleteId = this.deleteapplicationStatus[i].ApplicationStatusId.toString();
        }
        else {
          deleteId = deleteId + ',' + this.deleteapplicationStatus[i].ApplicationStatusId.toString()
        }
      }
      ///////service need to cehck    Company/DeleteVisitType
      //_svc.DeleteVisitType(deleteId)
      this._svc.getGenericParmas(deleteId, "id", 'ApplicationType/DeleteApplicationtatus').subscribe(
        data => {
          this.GlobalVariableService.openDialog("Application Design", "Record Has been deleted.")
          this.getAllVisitTypes();
          this.GetAllVisitStatusbyTypeid(this.visitstatusID.toString())
        }, (err) => {

        }
      );
    }
    else {
      var deleteId = "";
      this.deleteList = this.dataSource.data.filter(x => x.selected == true);
      if (this.deleteList.length > 0) {
        for (var i = 0; i < this.deleteList.length; i++) {
          if (deleteId == "") {
            deleteId = this.deleteList[i].ApplicationTypeId.toString();
          }
          else {
            deleteId = deleteId + ',' + this.deleteList[i].ApplicationTypeId.toString()
          }
        }
        // this._svc.DeleteVisitType(deleteId).subscribe(
        this._svc.getGenericParmas(deleteId, "id", 'ApplicationType/DeleteApplicationType').subscribe(
          data => {
            this.GlobalVariableService.openDialog("Application Design", "Record Has been deleted.")
            this.getAllVisitTypes();
          }, (err) => {

          }
        );
      }
      else {
        this.GlobalVariableService.openDialog("Application Design", "Please select Record to delete.")
      }
    }
  }

  AllowUploadDocuments() {
    this.objapplicationStatus.AllowUploadDocuments = !this.objapplicationStatus.AllowUploadDocuments;
  }
  AllowEdit() {
    this.objapplicationStatus.AllowEdit = !this.objapplicationStatus.AllowEdit;
  }
  checkseleted(i: number) {

    for (var k = 0; k < this.lstSys_Groups.length; k++) {
      this.lstSys_Groups[k].selected = false;
    }
    var a = this.dataSource.data.filter(x => x.ApplicationTypeId == i);
    if (!this.GlobalVariableService.isStringNullOrEmplty(a[0].SubmissionGroups)) {
      var arr = a[0].SubmissionGroups.split(',');
      for (var j = 0; j < arr.length; j++) {
        for (var i = 0; i < this.lstSys_Groups.length; i++) {
          if (arr[j].toString() == this.lstSys_Groups[i].GroupID.toString())
            this.lstSys_Groups[i].selected = true;
        }
      }
    }

  }

  selectData(index: number, id: number) {
    // this.Clear();
    debugger;
    window.scroll(0,0);
    this.visitstatusID = id;
    this.objApplicationType = new ApplicationType();
    this.editDetail = new ApplicationType();
    this.editDetail = this.dataSource.data.filter(x => x.ApplicationTypeId == id)[0];
    if(this.editDetail.HasWorkFlow===true)
    {
      this.visitStatuss=true;
    }
    else{
      this.visitStatuss=false;
    }
    this.objApplicationType = this.dataSource.data[index];
    this.GlobalVariableService.ApplicationTypeId = this.objApplicationType.ApplicationTypeId;
  //  this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.objApplicationType.ApplicationTypeId);
    //this.GlobalVariableService.GetAllFieldsByAppTypeId(this.objApplicationType.ApplicationTypeId);
    this.objapplicationStatus.FK_ApplicationTypeId = this.visitstatusID;
    this.groupsVisitStatus();
    this.checkseleted(id);
    this.visitStatus = true;
    // this.selectedIndex = 1;
    this.GetVisitTypebyId(this.editDetail.ApplicationTypeId.toString());
    this.GetAllVisitStatusbyTypeid(this.editDetail.ApplicationTypeId.toString());
    this.GetAllCompanies();
    this.GetAllUsers();
    this.ClearApplicationStatus();
    

    //For Temporary Display Tools
    // this.LoadDynamicControll.filterdata("API");
    //............//
  }


  GetVisitTypebyId(id: string) {
    this._svc.getGenericParmas(id, "id", 'ApplicationType/GetApplicationTypebyId').subscribe(
      data => {
      }, (err) => {

      }
    );
  }
  GetAllCompanies() {
    this._svc.GetDetails('Company/GetAllCompanies').subscribe(
      data => {
        this.lstOrgCompany = data;
      }, (err) => {
        this.GlobalVariableService.openDialog("Application Design", "Some Error has been occured while Getting All companies.")
      }
    );
  }
  GetAllVisitStatusbyTypeid(id: string) {
    this._svc.getGenericParmas(id, "id", 'ApplicationType/GetAllApplicationStatusbyTypeid').subscribe(
      data => {

        this.visitStatusDataSource.data = data;
        this.visitStatusDataSource.sort = this.sort;
        this.visitStatusDataSource.paginator = this.paginator;
      }, (err) => {
        this.GlobalVariableService.openDialog("Application Design", "Some Error has been occured.")
      }
    );
  }
  AddVisitTypeInEdit() {

    if (this.initialValidation()) {
      this.GlobalVariableService.openDialog("Application Design", this.popUpMsg)
    }
    else {

      this.objapplicationStatus.FK_ApplicationTypeId = this.visitstatusID;
      this._svc.UpdateVisitorStatus(this.objapplicationStatus, 'ApplicationType/UpdateApplicationStatus').subscribe(
        data => {
          this.lstapplicationStatus = data;
          this.GetAllVisitStatusbyTypeid(this.editDetail.ApplicationTypeId.toString());
          this.ApplicationTypeClear();
        }, (err) => {
          this.GlobalVariableService.openDialog("Application Design", "Some Error has been occured while Getting All entities.")
        }
      );
    }

  }
  DeleteInEdit() {
    var a = this.visitStatusDataSource.data.filter(x => x.selected == true);
    if (a.length > 0) {
      this.confirmDialog();
    }
    else {
      this.GlobalVariableService.openDialog("Application Design", "Please select Record to delete.")
    }
  }
  onSelectvisitStatus(index: number) {

    this.visitStatusDataSource.data[index].selected = !this.visitStatusDataSource.data[index].selected;
  }
  selectVisitStatus(i: number) {

    var a = this.visitStatusDataSource.data.filter(x => x.ApplicationStatusId == i);

    // this.objapplicationStatus.AllowEdit=a[0].AllowEdit;
    // this.objapplicationStatus.AllowTemplateDownload=a[0].AllowTemplateDownload;
    // this.objapplicationStatus.AllowUploadDocuments=a[0].AllowUploadDocuments;
    var arr = a[0].WorkFlowGroupId.split(',');
    this.objapplicationStatus = a[0];
    if (this.objapplicationStatus.WorkFlowType == 1) {
      for (var j = 0; j < arr.length; j++) {
        for (var i = 0; i < this.vStatus_SysGroup.length; i++) {
          if (arr[j].toString() == this.vStatus_SysGroup[i].GroupID.toString())
            this.vStatus_SysGroup[i].selected = true;
        }
      }
    }
  }
  handleChange(evt, key: number) {
    if (key == 1) {
      this.bUserGroup = true;
      this.bOrganizationUnit = false;
      this.bSpecificUser = false;
    }
    else if (key == 2) {
      this.bUserGroup = false;
      this.bOrganizationUnit = true;
      this.bSpecificUser = false;
    }
    else {
      this.bUserGroup = false;
      this.bOrganizationUnit = false;
      this.bSpecificUser = true;

    }
    this.objapplicationStatus.WorkFlowType = key;
  }
  selectOrgCompany(companyId: number) {
    this._svc.getGenericParmas(companyId, "id", 'Company/GetEntitybyCompnayId').subscribe(
      data => {
        this.lstOrgEntity = data;
      }, (err) => {
        this.GlobalVariableService.openDialog("Application Design", "Some Error has been occured while Getting All entities.")
      }
    );
  }
  GetAllUsers() {
    this._svc.GetDetails("User/GetAllUsers").subscribe
      (
        data => {

          this.objGetAllUsers = data;
        }, (err) => {
          this.GlobalVariableService.openDialog("Application Design", "Some Error has been occured while Getting All entities.")
        }
      );
  }
  selectOrgEntity(id: number) {

  }
  initialValidation() {

    if (this.objapplicationStatus.EmployeeIds == null) {
      this.objapplicationStatus.EmployeeIds = "";
    }
    if (this.isStringNullOrEmplty(this.objapplicationStatus.RequestInfoCaptionEn)) {
      this.objapplicationStatus.RequestInfoCaptionEn = "";
    }
    if (this.isStringNullOrEmplty(this.objapplicationStatus.RequestInfoCaptionAr)) {
      this.objapplicationStatus.RequestInfoCaptionAr = "";
    }

    this.objapplicationStatus.WorkFlowGroupId = '';
    if (this.objapplicationStatus.WorkFlowType == 1) {
      for (var i = 0; i < this.vStatus_SysGroup.length; i++) {
        if (this.vStatus_SysGroup[i].selected == true) {
          if (this.objapplicationStatus.WorkFlowGroupId == '')
            this.objapplicationStatus.WorkFlowGroupId = this.vStatus_SysGroup[i].GroupID.toString();
          else
            this.objapplicationStatus.WorkFlowGroupId = this.objapplicationStatus.WorkFlowGroupId + "\",\"" + this.vStatus_SysGroup[i].GroupID.toString();
        }
      }
    }
    this.objapplicationStatus.WorkFlowGroupId = "[\"" + this.objapplicationStatus.WorkFlowGroupId + "\"]"
    if (this.isStringNullOrEmplty(this.objapplicationStatus.StatusNameEn)) {
      this.popUpMsg = "Please Enter Status English Name";
      this.sPopKey = "msg";
      return true;
    }
    else if (this.isStringNullOrEmplty(this.objapplicationStatus.StatusNameAr)) {
      this.popUpMsg = "Please Enter Status Arabic Name";
      this.sPopKey = "msg";
      return true;
    }
    else if (this.objapplicationStatus.WorkFlowType == 1 && this.isStringNullOrEmplty(this.objapplicationStatus.WorkFlowGroupId)) {
      this.popUpMsg = "You have seleted User Group Please select Work Flow Group";
      this.sPopKey = "msg";
      return true;
    }
    else if (this.objapplicationStatus.WorkFlowType == 2 && this.isStringNullOrEmplty(this.objapplicationStatus.FK_CompanyId.toString())) {
      this.popUpMsg = "You have seleted Organization Unit Please select Work Flow Group";
      this.sPopKey = "msg";
      return true;
    }
    else if (this.objapplicationStatus.WorkFlowType == 3 && this.isStringNullOrEmplty(this.objapplicationStatus.EmployeeIds)) {
      this.popUpMsg = "You have seleted Specific User Please select Work Flow Group";
      this.sPopKey = "msg";
      return true;
    }
    else {
      return false;
    }


  }
  isStringNullOrEmplty(val: string) {
    if (val == null || val == "" || val == undefined)
      return true;
    else
      return false;
  }

  ///////////new Application Panel
  addDatainList(name: string, id: string) {

    this.newobjdatalist = new datalist();
    this.newobjdatalist.PanelName = name;
    this.newobjdatalist.PanelId = id;
    this.datalist.push(this.newobjdatalist);
    this.objdatalist = new datalist();

  }

  editControll() {

  }
  deleteControll(panelName: string) {
    this.datalist = this.datalist.filter((value, key) => {
      return value.PanelName != panelName;
    });
  }
  addControll(PanelName: string) {
    this.openDialog(PanelName);
  }

  openEscalationModel(ids: string): void {
    
    const id = ids;
    const message = "escalation";

    const title = "Create New User"
    const dialogData = new EcslationModel(id, title);
    const dialogRef = this.dialog.open(AddEscalationComponent, {
      disableClose: true,
      width: '80%',
      maxHeight: '70%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialog(PanelName: string): void {
    //const PanelID =  
    const dialogRef = this.dialog.open(AddNewControllComponent, {
      disableClose: true,
      width: '80%',
      maxHeight: '100%',
      data: { AddNewControll }
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      this.AddNewControll = result;
      this.AddNewControll.SaveInPanelName = PanelName;
      this.listAddNewControll.push(this.AddNewControll);
    });
  }

  toppings = new FormControl();
  // toppingList: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];


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
    removePlugins: 'elementspath,magicline',
    extraPlugins: 'divarea,smiley,justify,indentblock,colordialog,save',
    colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
    },
    height: 280,
    width: 800,
    removeDialogTabs: 'image:advanced;link:advanced',
    removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
    format_tags: 'p;h1;h2;h3;pre;div'
  }
  // Escalation(index: number){
  //   const dialogRef = this.dialog.open(AddEscalationComponent, {
  //     width: '80%',
  //     maxHeight: '70%',
  //   //  data: {AddNewControll}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //
  //     console.log('The dialog was closed');
  //     //this.AddNewControll = result;
  //    //this.AddNewControll.SaveInPanelName = PanelName;
  //       //  this.listAddNewControll.push(this.AddNewControll);
  //   });
  // }
  ////// New Application panel
  initialValidationPanel() {
    var str = '';
    if (this.GlobalVariableService.isStringNullOrEmplty(this.GlobalVariableService.objPanelInfo.Text)) {
      str = "Panel Title ,"
    }

    if (this.GlobalVariableService.isStringNullOrEmplty(this.GlobalVariableService.objPanelInfo.Text)) {
      str =str + "Panel Title Arabic"
    }
    return str;
  }
  SavePanel() {
    debugger;
    var str = this.initialValidationPanel();
    if (str == "") {
      if (this.GlobalVariableService.userPrevilieges != undefined) {
        this.GlobalVariableService.objPanelInfo.CREATED_BY = this.GlobalVariableService.userPrevilieges.UserName;
      } else {
        this.GlobalVariableService.objPanelInfo.CREATED_BY = "";
      }
      if (this.GlobalVariableService.userPrevilieges != undefined) {
        this.GlobalVariableService.objPanelInfo.LAST_UPDATE_BY = this.GlobalVariableService.userPrevilieges.UserName;
      } else {
        this.GlobalVariableService.objPanelInfo.LAST_UPDATE_BY = "";
      }
      this.GlobalVariableService.objPanelInfo.ApplicationTypeId = this.objApplicationType.ApplicationTypeId;
      this._svc.SavePanelsInfo(this.GlobalVariableService.objPanelInfo, 'DynamicForm/SavePanelsInfo').subscribe(
        data => {
          this.GlobalVariableService.GetAllPanelsByApplicationTypeId(this.GlobalVariableService.ApplicationTypeId);
        }, (err) => {
          this.GlobalVariableService.openDialog("Application Design", "Some Error has been occured while Getting All entities.")
        }
      );
    }
    else {
        this.GlobalVariableService.openDialog("Application Panel", "Please fill the mentioned field : "+  str)
    }

  }


  appfield() {
    $('#loadPanel').trigger('click')
  }
  selecttemplate(type: string) {
  }
  updateEn() {
    
    var a = this.GlobalVariableService.controllsApplicationTypeFields.filter(x => x.FieldId == Number(this.fillEnglishTemp))[0];
    if(this.downLoadEnglishTemplate.includes("</p>"))
    {
      this.downLoadEnglishTemplate=this.downLoadEnglishTemplate.replace("</p>","");
      var template=this.downLoadEnglishTemplate += ' ' + "{{" + a.FieldCaption + "}}";
      this.downLoadEnglishTemplate+='</p>';
    }
    else{
      var template=this.downLoadEnglishTemplate += ' ' + "{{" + a.FieldCaption + "}}";
      

    }
  //  var template=this.downLoadEnglishTemplate += ' ' + "{{" + a.FieldCaption + "}}";

    this.downLoadEnglishTemplate = template;
    this.fillArabicTemplate = '';

    // this.fillEnglishTemp = '';
  }
  updateAR() {
    
    var a = this.GlobalVariableService.controllsApplicationTypeFields.filter(x => x.FieldId == Number(this.fillArabicTemplate))[0];
    if(this.downLoadArabicTemplate.includes("</p>"))
    {
      this.downLoadArabicTemplate=this.downLoadArabicTemplate.replace("</p>","");
      var template=this.downLoadArabicTemplate += ' ' + "{{" + a.FieldCaptionAr + "}}";
      this.downLoadArabicTemplate+='</p>';
    }
    else{
      var template=this.downLoadArabicTemplate += ' ' + "{{" + a.FieldCaptionAr + "}}";
      

    }
  //  var template=this.downLoadEnglishTemplate += ' ' + "{{" + a.FieldCaption + "}}";

    this.downLoadArabicTemplate = template;
    // this.fillArabicTemplate = '';





    // var a = this.GlobalVariableService.controllsApplicationTypeFields.filter(x => x.FieldId == Number(this.fillArabicTemplate))[0];
    // this.downLoadArabicTemplate = this.downLoadArabicTemplate + ' ' + "{{" + a.FieldCaptionAr + "}}";
    // this.fillArabicTemplate = '';
  }

  DownloadEn() {

    let doc = new jsPDF('p', 'pt', 'a4', true);
    var Name=this.objApplicationType.ApplicationNoAbbreviation;
    doc.fromHTML(this.downLoadEnglishTemplate, 15, 15, {
      'width': 500
    }, function (dispose) {
      doc.save(Name+'English'+'.pdf');
    });
  }
  DownloadAr() {

    let doc = new jsPDF('p', 'pt', 'a4', true);
    var Name=this.objApplicationType.ApplicationNoAbbreviation;
    doc.fromHTML(this.downLoadArabicTemplate, 15, 15, {
      'width': 500
    }, function (dispose) {
      doc.save(Name+"Arabic"+'.pdf');
    });
  }

  SaveTemplate() {

var a = JSON.parse(localStorage.getItem("BPPobjlogin"));
    this.apptypetemplate.ApplicationTypeTemplateId = 0;
    this.apptypetemplate.FK_ApplicationTypeId = this.objApplicationType.ApplicationTypeId;
    this.apptypetemplate.TemplateEn = this.downLoadEnglishTemplate;
    this.apptypetemplate.TemplateAr = this.downLoadArabicTemplate;
    this.apptypetemplate.CREATED_BY = a.ID;
    this.apptypetemplate.LAST_UPDATED_BY = a.ID;
    this.apptypetemplate.Remarks = "";
    this.apptypetemplate.IsActive = true;
    this._svc.SaveTemplate(this.apptypetemplate, 'ApplicationType/AddUpdateAppTemplate').subscribe(
      data => {
        this.GlobalVariableService.openDialog("Application Type", "Template Has Been Saved Successfully.")
        // this.visitStatusDataSource.data = data;
        // this.visitStatusDataSource.sort = this.sort;
        // this.visitStatusDataSource.paginator = this.paginator;
      }, (err) => {
        this.GlobalVariableService.openDialog("Visit Type", "Some Error has been occured.")
      }
    );

  }


  ClearApplicationStatus(){
    this.lstapplicationStatus=[];
    this.objapplicationStatus = new applicationStatus();
  }


}


///Temporary Class for New Application
export class datalist {
  PanelName: string;
  PanelId: string;
}

