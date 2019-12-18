export class AppSetting {
    CompanyName1:string;
    CompanyName2:string;
    companyArabicName1:string;
    CompanyArabicName2:string;
    // LogoImage : string;
    Companyimage:string;
    LogoPath : string;
    Other1 : string;
    Other2 : string;
    Other3 : string; 
    CREATED_DATE : Date;
    SystemUsersType: number;
    HasEmailApproval: boolean;
    ShowLoginForm: boolean;
    ShowThemeToUsers: boolean;
     /**
     *
     */
    constructor() {
        this.CompanyName1 = '';
        this.CompanyName2 = '';
        this.companyArabicName1= '';
        this.CompanyArabicName2= '';
        // this.LogoImage ="";
        this.Companyimage = '';
        this.LogoPath = '';
        this.Other1 = '';
        this.Other2 = '';
        this.Other3 = ''; 
        // this.CREATED_DATE =new Date();
        this.SystemUsersType = 0;
        this.HasEmailApproval = false;
        this.ShowLoginForm = false;
        this.ShowThemeToUsers= false;
    }
}

export class appSetReq_params{

    CompanyName1:string;
    CompanyName2:string;
    companyArabicName1:string;
    CompanyArabicName2:string;
    LogoImage:string;
    //LogoImage : string;
    Companyimage:string;
        LogoPath : string;
        Other1:string;
        Other2:string;
        Other3:string;
        // CREATED_DATE:Date;
        SystemUsersType:number;
        HasEmailApproval:boolean;
        ShowLoginForm:boolean;
        ShowThemeToUsers:boolean;
}
export class AddNewControll{
Caption:string;
ArabicCaption:string;
TypeID:string;
TypeName:string;
IsMandatory:boolean ;
IsUnique:boolean;
isIndexed:boolean;
IsHidden:boolean;
SaveInPanelName: string; 
}
