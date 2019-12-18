export class EmpDeputyAssignment {
}
export class EmployeeDeputyAssignment
    {
        EmployeeDeputyAssignmentId:number;
        FK_EmployeeId:number;
        FK_EmployeeDeputyId:number;
        StartDate: string;
        EndDate: string;
        Remarks:string;
        CREATED_BY:string;
        CREATED_DATE: Date;
        LAST_UPDATED_BY: string;
        LAST_UPDATED_DATE : Date;
        IsActive : boolean;
        UserId: number;
        DeputyId: number;
        UserName: string;
        DeputyName: string;
        selection: boolean;

        constructor() {
            this.EmployeeDeputyAssignmentId = 0;
            this.FK_EmployeeId= 0;
            this.FK_EmployeeDeputyId= 0;
            this.StartDate = '';
            this.EndDate = '';
            this.Remarks ='';
            this.CREATED_BY = '';
            this.CREATED_DATE = new Date();
            this.LAST_UPDATED_BY ='';
            this.LAST_UPDATED_DATE = new Date();
            this.IsActive = true;
            this.UserId = 0;
            this.DeputyId = 0;
            this.UserName= '';
            this.DeputyName='';
            this.selection = false;
        }
    }