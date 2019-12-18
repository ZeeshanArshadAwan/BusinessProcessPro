export class ApplicationWorkFlowClass {
}

export class ApplicationType {
    ApplicationTypeId: number;
    ApplicationNoAbbreviation: string;
    ApplicationTypeEn: string;
    ApplicationTypeAr: string;
    IntoductoryTextEN: string;
    IntoductoryTextAr: string;
    StatementOfAgreementEN: string;
    StatementOfAgreementAr: string;
    Visible: boolean;
    ApplicationFormIds: string;
    SubmissionGroups: string;
    ApplicationNoFormula: string;
    HasWorkFlow: boolean;
    selected: boolean = false;
    /**
     *
     */
    constructor() {
        this.ApplicationTypeId = 0;
        this.ApplicationNoAbbreviation = '';
        this.ApplicationTypeEn = '';
        this.ApplicationTypeAr = '';
        this.IntoductoryTextEN = '';
        this.IntoductoryTextAr = '';
        this.StatementOfAgreementEN = '';
        this.StatementOfAgreementAr = '';
        this.Visible = false;
        this.ApplicationFormIds = '';
        this.SubmissionGroups = '';
        this.ApplicationNoFormula = '{Abbreviation}-{Year}-{month}-{Day}-{Hour}-{Minutes}-{Seconds}-{ApplicationId}-{ApplicationSequence}';
        this.HasWorkFlow = false;
        this.selected = false;

    }


}
export class Sys_Groups {
    GroupID: number;
    Desc_Ar: string;
    Desc_En: string;
    DefaultPage: number;
    selected: boolean;
    /**
     *
     */
    constructor() {
        this.selected = false;
    }
}

export class applicationStatus {
    ApplicationStatusId: number;
    FK_ApplicationTypeId: number;
    StatusDisplayNameEn: string;
    StatusDisplayNameAr: string;
    StatusNameEn: string;
    StatusNameAr: string;
    IsStartPoint: boolean;
    IsEndPoint: boolean;
    AllowTemplateDownload:boolean;
    IsDynamic: boolean;
    PerviousStatus: number;
    ApproveStatus: number;
    RejectStatus: number;
    RequestMoreInfoStatus: number;
    WorkFlowGroupId: string;
    CREATED_BY: string;
    CREATED_DATE: string;
    LAST_UPDATE_BY: string;
    LAST_UPDATE_DATE: string;
    IsActive: boolean;
    IsAllowAutoAssign: boolean;
    ApproveCaptionEn: string;
    ApproveCaptionAr: string;
    RejectCaptionEn: string;
    RejectCaptionAr: string;
    RequestInfoCaptionEn: string;
    RequestInfoCaptionAr: string;
    WorkFlowType: number;
    FK_CompanyId: number;
    FK_EntityId: number;
    EmployeeIds: string;
    selected: boolean;
    AllowEdit: boolean;   
    AllowUploadDocuments: boolean;    

    constructor() {
        this.ApplicationStatusId = 0;
        this.FK_ApplicationTypeId = 0;
        this.StatusDisplayNameEn = "";
        this.StatusDisplayNameAr = "";
        this.StatusNameEn = "";
        this.StatusNameAr = "";
        this.IsStartPoint = false;
        this.IsEndPoint = false;
        this.AllowTemplateDownload=false;
        this.IsDynamic = false;
        this.PerviousStatus = 0;
        this.ApproveStatus = 0;
        this.RejectStatus = 0;
        this.RequestMoreInfoStatus = 0;
        this.WorkFlowGroupId = "";
        this.CREATED_BY = "";
        this.CREATED_DATE = "";
        this.LAST_UPDATE_BY = "";
        this.LAST_UPDATE_DATE = "";
        this.IsActive = false;
        this.IsAllowAutoAssign = false;
        this.ApproveCaptionEn = "";
        this.ApproveCaptionAr = "";
        this.RejectCaptionEn = "";
        this.RejectCaptionAr = "";
        this.RequestInfoCaptionEn = "";
        this.RequestInfoCaptionAr = "";
        this.WorkFlowType = 1;
        this.FK_CompanyId = 0;
        this.FK_EntityId = 0;
        this.EmployeeIds = '';
        this.selected = false;
        this.AllowEdit = false;   
        this.AllowUploadDocuments= false; 

    }
}

export class OrgCompany {
    CompanyShortName: string;
    CompanyName: string;
    CompanyArabicName: string;
    Address: string;
    PhoneNumber: string;
    Fax: string;
    URL: string;
    Logo: string = "";
    CREATED_BY: string;
    LAST_UPDATE_BY: string;
    Country: number;
    CompanyId: number;
    FK_ParentId: number;
    CREATED_DATE: string;
    LAST_UPDATE_DATE: string;


}
export class OrgEntity {
    EntityId: number;
    FK_CompanyId: number;
    HasChildren: number;
    FK_ParentId: number;
    FK_LevelId: number;
    CREATED_DATE: string;
    LAST_UPDATE_DATE: string;
    LAST_UPDATE_BY: string;
    EntityName: string;
    EntityArabicName: string;
    ChildName: string;
    CompanyName: string;
    EntityCode: string;
    CREATED_BY: string;
}
export class ApplicationStatus_Escalation {
    StatusEscalationId:number;
    FK_StatusId:number;
    NewstatusId:number;
    NumberofDays:number;
    FK_Action:number;
    notificationGroups: string;
    EscalationNAme: string;
    selected: boolean = false;
    constructor(){
        this.selected = false;
    }
}

export class ApplciationTypePanels{

PanelId: number;
ApplicationTypeId:number;
Text: string;
ArText: string;
Order: number;
CREATED_BY: string;
CREATED_DATE: string;
LAST_UPDATE_BY: string;
LAST_UPDATE_DATE: string;
SaveMultipleFields:boolean;


constructor(){
    this.PanelId =0;
    this.ApplicationTypeId=0;
    this.Text="";
    this.ArText = "";
    this.Order=0;
    this.CREATED_BY = "";
    this.CREATED_DATE= "";
    this.LAST_UPDATE_BY ="";
    this.LAST_UPDATE_DATE = "";
    this.SaveMultipleFields=false;
}
}
export class FieldListItems
{
    ItemId: number;
    FK_FieldId: number;
    FieldOrder: number;
    FieldValue: string;
    FieldText: string;
    FieldTextAr: string;
    selected: boolean;

constructor(){
    this.ItemId= 0;
    this.FK_FieldId= 0;
    this.FieldOrder= 0;
    this.FieldValue = '';
    this.FieldText= '';
    this.FieldTextAr= '';
    this.selected = false;
} 
}
export class  listSelectData{
    id: number; 
    FieldListItems: FieldListItems[];
      constructor() {
        this.id = 0;
        this.FieldListItems = [];
    }
}