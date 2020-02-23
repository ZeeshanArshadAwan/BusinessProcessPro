import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/SharedServices/base-component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA,MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { LanguageTranslateService } from 'src/app/SharedServices/language-translate.service';
import { GlobalVariableService } from 'src/app/SharedServices/global-variable.service';
import { WorkFlowApiParameters } from 'src/app/Classes/WorkFlowApiParameters';
import { SharedServicesService } from 'src/app/SharedServices/shared-services.service';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from 'src/app/custom-confirm-modals/custom-confirm-modals.component';


@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent extends BaseComponent implements OnInit {
ApplicationtypeId:number=0;
WorkFlowApiParametersList:WorkFlowApiParameters[];
WorkFlowAPIOBJ:WorkFlowApiParameters;
WorkFlowAPIId:number;
IdsList:any=[];
ParameterDrpdwn:boolean=false;


  constructor(public GlobalVariableService: GlobalVariableService,private _svc: SharedServicesService,public languageTranslateService: LanguageTranslateService,public dialogRef: MatDialogRef<PopupModalComponent>,public dialog: MatDialog,  
    @Inject(MAT_DIALOG_DATA) public data: PopUpModal) {
      // this.ApplicationtypeId=data.ApptypeId;
      // data.ApptypeId
    super(languageTranslateService);
    this.ApplicationtypeId=data.ApptypeId;
    this.WorkFlowAPIId=data.WorkFlowAPIId;

    this.WorkFlowApiParametersList=[];
    this.WorkFlowAPIOBJ=new WorkFlowApiParameters();

  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<WorkFlowApiParameters>();
  public displayedColumns = ['select','ParameterName','Parameter', 'action'];
  ngOnInit() {
    this.GlobalVariableService.GetAllFieldsByAppTypeId(this.ApplicationtypeId,false);
    this.GetAllWorkFlowApiParameters(this.WorkFlowAPIId);
  }
  GetAllWorkFlowApiParameters(id:any){
    this._svc.getGenericParmas(id,"id","DynamicApi/GetAllWorkFlowApiParametersbyWorkFlowApiId").subscribe(
      data => {
        //  this.lstCompanies = data;
        
        this.WorkFlowApiParametersList=data;
        this.dataSource.data=this.WorkFlowApiParametersList;
        // this.dataSource.data = this.WorkFlowApi;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;

      }, (err) => {
        this.GlobalVariableService.openDialog('Application', 'Error Occured while Getting Record.');
      });

  }
  GetApp(id:number){
    this.WorkFlowAPIOBJ=this.WorkFlowApiParametersList.filter(a=>a.ParameterId==id)[0];
  }
  close(){
  
    this.dialogRef.close(false);
  }
  ClearParameters()
  {
    this.WorkFlowAPIOBJ=new WorkFlowApiParameters();
  }
  SaveWorkFlowApiParameters(){

this.WorkFlowAPIOBJ.Fk_WorkFlowApiId=this.WorkFlowAPIId;
this.WorkFlowAPIOBJ.CREATED_BY=this.GlobalVariableService.getUserID();
  this.WorkFlowAPIOBJ.LAST_UPDATED_BY=this.GlobalVariableService.getUserID();


    this._svc.SaveworkFlowApiParameters(this.WorkFlowAPIOBJ,"DynamicApi/AddUpdateWorkFlowApiParameters").subscribe(

      data => {
        //  this.lstCompanies = data;
        
        this.WorkFlowAPIOBJ=new WorkFlowApiParameters();
         this.GetAllWorkFlowApiParameters(this.WorkFlowAPIId);
        // this.dataSource.data = this.WorkFlowApi;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;

      }, (err) => {
        this.GlobalVariableService.openDialog('Application', 'Error Occured while Getting Record.');
      });


  }


  ParameterVisibility(id:number)
  {
    
    if(id==1)
    {
     this.ParameterDrpdwn=true;
    }
    else{

      this.ParameterDrpdwn=false;

    }


  }
  Multipledeletion(event,id:number){
    
    if (event.checked) {
      this.IdsList.push(id)
    }
    else
    {
      const index: number = this.IdsList.indexOf(id);
      if (index !== -1) {
          this.IdsList.splice(index, 1);
      }        
      
    }
    
      }
      Delete() {
        this.confirmDialog();
      }
      confirmDialog(): void {
    
        const message = 'Are you sure you want to delete?';
        const dialogData = new CustomConfirmDialogModel("Application", message);
        const dialogRef = this.dialog.open(CustomConfirmModalsComponent, {
          maxWidth: "90%",
          data: dialogData
        });
    
        dialogRef.afterClosed().subscribe(dialogResult => {
    
    
          if (dialogResult) {
            this.confirmDelete();
          }
        });
      }
      confirmDelete() {
        
        var IdList= JSON.stringify(this.IdsList);
        this._svc.getGenericParmas(IdList.toString(),"Ids", 'DynamicApi/DeleteWorkFlowApiParameters').subscribe(
          data => {
             this.GetAllWorkFlowApiParameters(this.WorkFlowAPIId);
            this.GlobalVariableService.openDialog("Application", data);
    
          }, (err) => {
            this.GlobalVariableService.openDialog("Application", "Some Error has been occured while Getting All entities.")
          }
        );
    
      }


}
export class PopUpModal {
  
  constructor(public message: string,public ApptypeId:number,public WorkFlowAPIId:number) {

  }



  
  }