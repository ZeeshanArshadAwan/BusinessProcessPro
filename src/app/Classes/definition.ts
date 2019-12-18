export class Definition {
}
export class CatagoryClass {
    LookUpTableValueId : number;
    FK_LookUpTableId : number;
    LookUpTableValueEn : string;
    LookUpTableValueAr :  string;
    LookUpTableValueCode : string ;
    Remarks : string ;
    CREATED_BY : string ;
    CREATED_DATE : string ;
    LAST_UPDATE_BY : string;
    LAST_UPDATE_DATE : string;
    IsActive : boolean;
    selection: boolean;
    constructor(){
        this.LookUpTableValueId =0;;
        this.FK_LookUpTableId =0;
        this.LookUpTableValueEn ='';
        this.LookUpTableValueAr ='';
        this.LookUpTableValueCode ='';
        this.Remarks ='';
        this.CREATED_BY ='';
        this.CREATED_DATE ='';
        this.LAST_UPDATE_BY ='';
        this.LAST_UPDATE_DATE ='';
        this.IsActive =true;
       // this.selection = false;
    }
}

export class LookUpTableDefinition{

    LookUpTableId: number;
    LookUpTableNameEn: string;
    LookUpTableNameAr: string;
    Remarks: string;
    CREATED_BY: string;
    CREATED_DATE: string;
    LAST_UPDATE_BY: string;
    LAST_UPDATE_DATE: string;
    IsActive: boolean;
}
