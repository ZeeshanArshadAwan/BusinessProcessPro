export class Applications {
    Applicant_Id: string;
     ApplicationId:number;
     ApplicationNo:string;
     FK_ApplicationTypeId:number;
     FK_ActiveStatus:number;
     FK_AssignedUser:number;
     FK_ReasonId:number;
     IsHeightPriority:boolean;
     StartDate:string;
     ExpectedEndDate:string;
     EffectiveEndDate:string;
     Remarks:string;
     CREATED_BY:string;
     CREATED_DATE:string;
    LAST_UPDATE_BY:string;
    LAST_UPDATE_DATE:string;

/**
 *
 */
constructor() {
    this.Applicant_Id = '';
    this.ApplicationId=0;
    this.ApplicationNo="";
    this.FK_ApplicationTypeId=0;
    this.FK_ActiveStatus=0;
    this.FK_AssignedUser=0;
    this.FK_ReasonId=0;
    this.IsHeightPriority=false;
    this.StartDate="";
    this.ExpectedEndDate='';
    this.EffectiveEndDate="";
    this.Remarks="";
    this.CREATED_BY="";
    this.CREATED_DATE="";
    this.LAST_UPDATE_BY="";
    this.LAST_UPDATE_DATE='';


}

}
export class DisplayControls{
editControl:string;
deletecontrol:string;
addcontrol:string;
/**
 *
 */
constructor() {
    this.editControl="editControl";
    this.deletecontrol="deletecontrol";
    this.addcontrol="addcontrol";      
}


}

export class AuditHistory
{
    FK_ApplicationId : number;
    LogId : number;
    AuditDateTime : string;
    User_FullName: string;
    StatusNameEn: string;
    StatusNameAr: string;
    /**
     *
     */
    constructor() {
        this.FK_ApplicationId = 0;
        this.LogId = 0;
        this.AuditDateTime = ''
        this.User_FullName= ''
        this.StatusNameEn= ''
        this.StatusNameAr = ''

    }
}

export class StatusForRadioButton{
    StatusId:number;
    lblStatusEn:string;
    lblStatusAr:string;
    StatusEn:string;
    StatusAr:string;
    /**
     *
     */
    constructor() {
       this.StatusId=0;
        this.lblStatusEn="";
        this.lblStatusAr="";
        this.StatusEn="";
        this.StatusAr="";

    }

}

export class DynamicDataTable{
    id: number;
    Datatable: any;
    ColumnName: any;
}