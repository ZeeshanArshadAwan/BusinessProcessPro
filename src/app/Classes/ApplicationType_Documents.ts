export class ApplicationType_Documents {
    DocumentTypeId: number;
    FK_ApplicationTypeId: number;
    DocumentNameEN: string;
    DocumentNameAr: string;
    IsRequired: boolean;
    selected: boolean;
    /**
     *
     */
    constructor() {
        this.DocumentTypeId = 0;
        this.FK_ApplicationTypeId = 0;
        this.DocumentNameEN = "";
        this.DocumentNameAr = "";
        this.IsRequired = false;
        this.selected = false;
    }




}
