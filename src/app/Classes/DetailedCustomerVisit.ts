export class DetailedCustomerVisit {
    Gender:String;
    AgeFrom:number;
    to:string;
    FromDate:Date;
    ToDate:Date;
    Format:string;
    Lang:number;
constructor() {
    this.Gender="Male";
    this.AgeFrom=0;
    this.to="";
    this.FromDate=new Date();
    this.ToDate=new Date();
    this.Format="";
    this.Lang=1;
}

}
