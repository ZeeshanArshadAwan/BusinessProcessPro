import { Sys_Modules, Sys_Forms } from './login';
import { Sys_Groups } from './application-work-flow-class';


export class DefineGroup
{
     ModuleList :Sys_Modules[];
     GroupList : Sys_Groups[]
     FormList : Sys_Forms[];
}
export class DefineUserGroup{
     name : string;
     value : string;
     constructor() {
          this.name = '';
          this.value = '';
     }
}

export class GroupDetailwithFormId
{
    groupId : number;
    Desc_En : string;
    Desc_Ar : string;
    Formids : number[];
}
