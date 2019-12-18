import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { Login, FormsAgainstModuleId } from '../Classes/login';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  objlogin: Login;
  // storage: StorageService;
  constructor(private _svc: SharedServicesService,
     private router: Router,
     public dialog: MatDialog ,
     private GlobalVariableService: GlobalVariableService
    ){
    this.objlogin = new Login();
  }
  a: any;
  STORAGE_KEY = 'local_todolist';
  ngOnInit() {
    localStorage.removeItem("BPPUserName");
    localStorage.removeItem("BPPassword");
    localStorage.removeItem("BPPuserPrevillege");
    localStorage.removeItem("BPPobjlogin");
  }
  getLogin() {
    
    this._svc.getLogin(this.objlogin, 'account/login').subscribe(
      data => {
        this.objlogin = new Login();
        this.objlogin = data;

        if (this.objlogin.ID != 0) {
          
          this.GlobalVariableService.userPrevilieges = this.objlogin;
          this.GetModulesandForms(this.objlogin.GroupID.toString());
        }

        else {
          this.GlobalVariableService.openDialog('Login', 'Invalid Credentials.');
        }

      }, (err) => {
        
        this.GlobalVariableService.openDialog('Login', err.toString());
      });
  }

  GetModulesandForms(groupid: string) {
    this._svc.getGenericParmas(groupid ,"GroupId", 'account/GetModulesandForms').subscribe(
      data => {
        
        this.GlobalVariableService.formtoDisplay = data;
        this.GlobalVariableService.formtoDisplay.FnlModFormList.sort((a,b)=>a.Seq.toString().localeCompare(b.Seq.toString()));
        this.saveLocalstporage(this.objlogin.UserName,this.objlogin.Password, this.GlobalVariableService.formtoDisplay , this.objlogin )
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        
        this.GlobalVariableService.openDialog('Login', 'Modules form not loaded');
      });
  }
  saveLocalstporage(name:string ,  Password:string, FormsAgainstModuleId:FormsAgainstModuleId , objlogin:Login  ){
    localStorage.setItem("BPPUserName", name);
    localStorage.setItem("BPPassword", Password);
    localStorage.setItem("BPPuserPrevillege", JSON.stringify(FormsAgainstModuleId));
    localStorage.setItem("BPPobjlogin", JSON.stringify(objlogin))
  }
}
