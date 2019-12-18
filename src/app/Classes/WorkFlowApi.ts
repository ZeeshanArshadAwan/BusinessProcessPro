export class WorkFlowApi {
    WorkFlowApiId:number;
    FK_ApplicationTypeId:number;
    FK_StatusId:number;
    Fk_PanelId:number;
    CallType:string;
    ApiType:string;
    Api:string;
    Header:string;
    Body:string;
    // MemoryType:string;
    // MemoryVariable:string;
    CallBeforeLoad:boolean;
    Sequence:number;
    Remarks:string;
    CREATED_BY:string;
    CREATED_DATE:string;
    LAST_UPDATED_BY:string;
    LAST_UPDATED_DATE:string;
    IsDeleted:Boolean;
     /**
     *
     */
    constructor() {
       this.WorkFlowApiId=0;
      this.FK_ApplicationTypeId=0;
    this.FK_StatusId=0;
    this.Fk_PanelId=0;
        this.CallType="";
        this.ApiType="";
        this.Api="";
        this.Header="";
        this.Body="";
        this.CallBeforeLoad=false;
        this.Sequence=0;
        this.Remarks="";
        this.CREATED_BY="";
        this.CREATED_DATE="";
        this.LAST_UPDATED_BY="";
        this.LAST_UPDATED_DATE="";
        this.IsDeleted=false;
    }
}


