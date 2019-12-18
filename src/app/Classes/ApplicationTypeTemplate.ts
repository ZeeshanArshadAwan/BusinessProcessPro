export class ApplicationTypeTemplate {
        ApplicationTypeTemplateId:number;
        FK_ApplicationTypeId:number;
        TemplateEn:string;
        TemplateAr:string;
        Remarks:string;
        IsActive:boolean;
        CREATED_BY:string;
        LAST_UPDATED_BY:string;
        /**
         *
         */
        constructor() {
            this.ApplicationTypeTemplateId=0;
            this.FK_ApplicationTypeId=0;
            this.TemplateEn="";
            this.TemplateAr="";
            this.Remarks="";
            this.IsActive=false;
            this.CREATED_BY="";
            this.LAST_UPDATED_BY="";

        }



}
