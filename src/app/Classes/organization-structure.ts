export class OrganizationStructure {

}
export class OrgCompany {

    CompanyId: number;
    Country: number;
    FK_ParentId: number;
    CompanyShortName: string;
    CompanyName: string;
    CompanyArabicName: string;
    Address: string;
    PhoneNumber: string;
    Fax: string;
    URL: string;
    Logo: string;
    CREATED_BY: string;
    LAST_UPDATE_BY: string;
    CREATED_DATE: string;
    LAST_UPDATE_DATE: string;
}
export class OrgLevel {
    LevelId: number;
    FK_CompanyId: number;
    LevelName: string;
    LevelArabicName: string;
}
export class OrgEntity {

    EntityId: number;
    FK_LevelId: number;
    FK_CompanyId: number;
    HasChildren: number;
    FK_ParentId: number;
    EntityCode: string;
    EntityName: string;
    EntityArabicName: string;
    ChildName: string;
    CompanyName: string;
    CREATED_BY: string;
    LAST_UPDATE_BY: string;
    CREATED_DATE: string;
    LAST_UPDATE_DATE: string;
}

export class CompanyTreeStructure {
    CompanyId: number;
    HasChildren: number;
    parentid: number;
    id: number;
    text: string;
    value: string;
    ChildName: string;
}

// export class TreeNode {
//     id: number;
//     children?: TreeNode[];
//   }