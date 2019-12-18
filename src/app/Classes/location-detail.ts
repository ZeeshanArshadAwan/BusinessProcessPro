export class LocationDetail {
     LocationId:number;
     LocationCode:string;
     FK_CompanyId:number;
     FK_ParentId:number ;
     FK_LocationlevelId:number;
     LocationName:string;
     LocationArabicName:string;
     CREATED_BY:string;
     HasChildren:number;
     ChildName:string;
     CREATED_DATE:string;
     LAST_UPDATE_BY:string;
     LAST_UPDATE_DATE:string;
     constructor(){
        this.LocationId=0;
        this.LocationCode="";
        this.FK_CompanyId=0;
        this.FK_ParentId=0 ;
        this.FK_LocationlevelId=0;
        this.LocationName="";
        this.LocationArabicName="";
        this.CREATED_BY="";
        this.HasChildren=0;
        this.ChildName="";
        this.CREATED_DATE="";
        this.LAST_UPDATE_BY="";
        this.LAST_UPDATE_DATE="";
     }
}
