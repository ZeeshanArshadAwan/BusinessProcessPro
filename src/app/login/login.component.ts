import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { Login, FormsAgainstModuleId } from '../Classes/login';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  objlogin: Login;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  // storage: StorageService;
  constructor(private _svc: SharedServicesService,
     private router: Router,
     public dialog: MatDialog ,
     public GlobalVariableService: GlobalVariableService,
     private idle: Idle, private keepalive: Keepalive
    ){
    this.objlogin = new Login();
    idle.setIdle(180);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(180);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => { 
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });
    
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.logout();
      // this.router.navigate(['/']);
    });
    
    idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        console.log(this.idleState);
        // this.childModal.show();
    });
    
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      // console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
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
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  GetModulesandForms(groupid: string) {
    this._svc.getGenericParmas(groupid ,"GroupId", 'account/GetModulesandForms').subscribe(
      data => {
        localStorage.setItem("isLoggedin","true");
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


  logout() {
    localStorage.removeItem("BPPUserName");
    localStorage.removeItem("BPPassword");
    localStorage.removeItem("BPPuserPrevillege");
    this.GlobalVariableService.userPrevilieges = new Login();
    this.router.navigateByUrl('/login');
  }

}
