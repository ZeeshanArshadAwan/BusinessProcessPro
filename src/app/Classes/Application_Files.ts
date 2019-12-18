export class Application_Files {
    ApplicationFileId:number;
    FK_ApplicationId:number;
    DocumentTypeName:string;
    FK_ApplicationType_DocumentId:number;
    FileName:string;
    FileExtension:string;
    Image:string;
constructor() {
    this.ApplicationFileId=0;
    this.FK_ApplicationId=0;
    this.FK_ApplicationType_DocumentId=0;
    this.DocumentTypeName="";
    this.FileName="";
    this.FileExtension="";
    this.Image="";
}

}
