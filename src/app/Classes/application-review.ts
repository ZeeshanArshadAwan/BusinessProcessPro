export class AllApplication {
    ApplicationTypeId: number
    ApplicationStatusId: number;
    ApplicationNo: string;
    GroupId: number;
    UserId: number;
    FromDate: Date;
    ToDate: Date;
    ApplicationStatusType: number;
    constructor() {
        this.ApplicationStatusId = 0;
        this.ApplicationTypeId = 0;
        this.ApplicationNo = " ";
        this.GroupId = 0;
        this.UserId = 0;
        this.FromDate = new Date();
        this.FromDate.setDate(this.FromDate.getDate() - 30);
        this.ToDate = new Date();
        this.ToDate.setDate(this.ToDate.getDate() + 1);
        this.ApplicationStatusType = 1;
    }
}
export class ApplicationTools {
    Applabel: string;
    AppAssignedGroup: string;
    AppType: string;
    AppNo: string;
    AppFromDate: string;
    AppToDate: string;
    globalID: string;
    constructor() {
        this.Applabel = "All Applications";
        this.AppAssignedGroup = "Assigned Group";
        this.AppType = "Application Type";
        this.AppNo = "Application No";
        this.AppFromDate = "From Date"
        this.AppToDate = "To Date";
    }
}
export class ApplicationTypeFields {
    FieldId: number;
    FK_ApplicationTypeId: number;
    FK_PanelId: number;
    FieldCaption: string;
    FieldCaptionAr: string;
    FK_FieldType: number;
    IsMandatory: Boolean;
    IsUnique: Boolean;
    IsIndexed: Boolean;
    IsHidden: Boolean;
    DefaultValue: string;
    SpreadToColumns: number;
    AllowOtherOption: boolean;
    LineColor: string;
    DividerStyle: string;
    Height: number;
    Max: number;
    Min: number;
    Step: number;
    HeaderText: string;
    HeaderTag: string;
    ImagePath: string;
    ParagraphText: string;
    AlertType: string;
    AlertText: string;
    CustomHTML: string;
    Index: number;
    constructor() {
        this.FieldId = 0;
        this.FK_ApplicationTypeId = 0;
        this.FK_PanelId = 0;
        this.Index = 0;
        this.FK_FieldType = 0;
        this.SpreadToColumns = 0;
        this.Height = 0;
        this.Max = 0;
        this.Min = 0;
        this.Step = 0;
        this.IsMandatory = false;
        this.IsUnique = false;
        this.IsIndexed = false;
        this.IsHidden = false;
        this.AllowOtherOption = false;
        this.DefaultValue = '';
        this.FieldCaption = '';
        this.FieldCaptionAr = '';
        this.LineColor = '';
        this.DividerStyle = '';
        this.HeaderText = '';
        this.HeaderTag = '';
        this.ImagePath = '';
        this.ParagraphText = '';
        this.AlertType = '';
        this.AlertText = '';
        this.CustomHTML = '';

    }
}

export class ApplicationType1 {
    ApplicationTypeId: number;
    ApplicationTypeEn: string;
    ApplicationTypeAr: string;
    ApplicationNoAbbreviation: string;
    ApplicationNoFormula: string;
    IntoductoryTextEN: string;
    IntoductoryTextAr: string;
    StatementOfAgreementEN: string;
    StatementOfAgreementAr: string;
    ModuleId: number;
    Visible: string;
    SubmissionGroups: string;
    constructor() {
        this.ApplicationTypeId = 0;
        this.ApplicationTypeEn = "";
        this.ApplicationTypeAr = "";
        this.ApplicationNoAbbreviation = "";
        this.ApplicationNoFormula = "";
        this.IntoductoryTextEN = "";
        this.IntoductoryTextAr = "";
        this.StatementOfAgreementEN = "";
        this.StatementOfAgreementAr = "";
        this.ModuleId = 0;
        this.Visible = "";

    }
}

export class ApplicationDetailReport {
    EmiratesId: number;
    ApplicationId: number;
    ApplicationTypeId: number;
    ApplicantId: number;
    ApplicationNo: string;
    StatusId: number;
    Format: string;
    Lang: number;
    FromDate: Date;
    ToDate: Date;
    SubmissionGroups: string;
    constructor() {
        this.ApplicationTypeId = 0;
        this.ApplicationId = 0;
        this.ApplicantId = 0;
        this.ApplicationNo = "";
        this.Format = "PDF";
        this.Lang = 1;
        this.FromDate = new Date();
        this.ToDate = new Date();
        //this.FromDate.setDate( this.FromDate.getDate() - 30 );
        // this.ToDate = new Date();
        //this.ToDate.setDate( this.ToDate.getDate() + 1 );
    }
}


export class ApplicationStatus {
    ApplicationStatusId: number;
    FK_ApplicationTypeId: number;
    StatusDisplayNameEn: string;
    StatusDisplayNameAr: string;;
    StatusNameEn: string;;
    StatusNameAr: string;;
    constructor() {
        this.ApplicationStatusId = 0;
        this.FK_ApplicationTypeId = 0;
        this.StatusDisplayNameEn = " ";
        this.StatusDisplayNameAr = "";
        this.StatusNameEn = "";
        this.StatusNameAr = "";
    }
}
export class ApplicationInfo {
    ApplicationId: number;
    ApplicationNo: string;
    ApplicationTypeId: number;
    StatusId: number;
    ApplicationTypeEn: string;
    StatusNameEn: string;
    ApplicationTypeCategory:number;
    ApplicationDate: string;
    CREATED_BY: string;
    Applicant_Id: string;
    AllowEdit: boolean;
    AllowTemplateDownload: boolean;
    AllowUploadDocuments: boolean;
    constructor() {
        this.ApplicationId = 0;
        this.ApplicationTypeId = 0;
        this.StatusId = 0;
        this.ApplicationNo = "";
        this.ApplicationTypeEn = "";
        this.StatusNameEn = "";
        this.ApplicationDate = "";
        this.ApplicationTypeCategory=0;
        this.CREATED_BY = "";
        this.Applicant_Id = "";
        this.AllowEdit = false;
        this.AllowTemplateDownload = false;
        this.AllowUploadDocuments = false;
        
    }
}

export class ApplicationsCount {
    TOTAL_APPLICATIONS: number;
    TOTAL_APP_PENDING: number;
    TOTAL_APP_COMPLETED: number;
    TOTAL_APP_REJECTED: number;
    TOTAL_TODAY_APP_PENDING: number;
    TOTAL_TODAY_APP_COMPLETED:number;
}


export class ApplicationStatusPerCount {
    ApplicationTypeEn: string;
    ApplicationStatus: string;
    ApplicationCount: number;
}
