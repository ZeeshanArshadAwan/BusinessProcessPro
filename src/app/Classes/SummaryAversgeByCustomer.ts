export class SummaryAversgeByCustomer {
    CustomerName:String;
    CustomerArabicName:string;
    DocumentTypeName:string;
    FromDate:Date;
    ToDate:Date;
    Format:string;
    Lang:Number;
constructor() {
    this.CustomerName="";
    this.CustomerArabicName="";
    this.FromDate=new Date();
    this.ToDate=new Date();
    this.Format="PDF";
    this.Lang=0;
}

}
