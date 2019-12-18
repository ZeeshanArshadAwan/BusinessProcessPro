import { Sys_Groups } from './application-work-flow-class';
import { DateIsoStorageTranscoder } from 'ngx-webstorage-service';

export class Login {
        UserName :string;
        Password :string;
        GroupID :number;
        ID :number;
        ModuleList :Sys_Modules[];
        FormList:Sys_Forms[];
}

export class Sys_Modules
    {
       
       // DALSys_Modules objDALSys_Modules;
        ModuleID : number;
        Desc_Ar :string;
        Desc_En :string;
        Seq: string;
    }

    export class Sys_Forms
    {
     formId:number;
     //   DALSys_Forms objDALSys_Forms;
       FormID: number;
        FormName :string;
        Desc_En : string;
        Desc_Ar :string;
        ModuleID :string;
        FormPath :string;
        FormOrder:number;
        ParentID :number;
        Visible :number;
        seleted: boolean;
        constructor(){
            this.seleted= false;
        }
    }
    export class FormsAgainstModuleId{
        ModuleName :string;
        FormName :string;
        FormID : number;
        ModuleID : number;
        ModuleList :Sys_Modules[];
        FormList :Sys_Forms[];
        ModuleFormList :FormsAgainstModuleId[];
        FnlModFormList : moduleformlist[];
    }
    export class moduleformlist{
        ModuleName :string;
        ModuleNameArabic :string;
        Seq : number;
        formnamelist :Sys_Forms[];
        constructor (){
        this.ModuleName ='';
        this.ModuleNameArabic  ='';
        this.Seq = 0;
        this.formnamelist =[];
        }
    }

    export class GetAllUsers{
        UsersList:Sys_Users[];
        GroupList: Sys_Groups[];
    }

    export class Sys_Users  
    {   
        UserStatus :number;
        GroupID :number;
        ID :number;
        UserType :number;
        FK_EmployeeId :number;
        FK_CompanyId :number;
        FK_EntityId :number;
        UserID :string;
        User_FullName :string;
        UserPwd :string;
        UserEmail :string;
        PhoneNo :string;
        JobDesc :string;
        CREATED_BY :string;
        LAST_UPDATE_BY :string;
        CREATED_DATE :string;
        LAST_UPDATE_DATE :string;
        LastChange_Password :string;
        Active :boolean;
        selected : boolean =false;
        constructor(){
             
        this.UserStatus = 0;
        this.GroupID = 0;
        this.ID = 0;
        this.UserType = 0;
        this.FK_EmployeeId =0 ;
        this.FK_CompanyId =0 ;
        this.FK_EntityId =0 ;
        this.UserID = '';
        this.User_FullName = '';
        this.UserPwd = '';
        this.UserEmail  = '';
        this.PhoneNo ='';
        this.JobDesc = '';
        this.CREATED_BY = '';
        this.LAST_UPDATE_BY  = '';
        this.CREATED_DATE = '';
        this.LAST_UPDATE_DATE = '';
        this.LastChange_Password = '';
        this.Active = true;
        this.selected= false;
        }
    }