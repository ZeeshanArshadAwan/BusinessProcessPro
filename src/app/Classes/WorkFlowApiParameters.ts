export class WorkFlowApiParameters {
    ParameterId:number;
    Fk_WorkFlowApiId:number;
    ParameterName:string;
    FK_FieldId:number;
    ParameterType:number;
    Remarks:string;
    CREATED_BY:string;
    CREATED_DATE:string;
    LAST_UPDATED_BY:string;
    LAST_UPDATED_DATE:string;
    IsDeleted:Boolean;
    ParameterStorageType:number;
    
     /**
     *
     */
    constructor() {
        this.ParameterId=0;
        this.Fk_WorkFlowApiId=0;
        this.ParameterName="";
        this.FK_FieldId=0;
        this.ParameterType=0;
        this.Remarks="";
        this.CREATED_BY="";
        this.CREATED_DATE="";
        this.LAST_UPDATED_BY="";
        this.LAST_UPDATED_DATE="";
        this.IsDeleted=false;
        this.ParameterStorageType=0;
    }
}


