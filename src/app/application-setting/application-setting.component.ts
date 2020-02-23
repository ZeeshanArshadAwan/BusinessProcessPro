import { Component, OnInit } from '@angular/core';
import { AppSetting, appSetReq_params } from '../Classes/app-setting';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import $ from 'jquery';
import { Router } from '@angular/router';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { BaseComponent } from '../SharedServices/base-component';
import { WorkFlowApi } from '../Classes/WorkFlowApi';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-application-setting',
  templateUrl: './application-setting.component.html',
  styleUrls: ['./application-setting.component.css']
})
export class ApplicationSettingComponent extends BaseComponent implements OnInit {
  url = '';
  objappSetting: AppSetting;
  errorMessage: string = "";
  objappSetReq_params: appSetReq_params;
  imagepath: string = '';
  formName : string = '';
  FormName: string = '';
  
  imageSrc: any;
  workflowapi:WorkFlowApi;
  constructor(private httpclient: HttpClient,public languageTranslateService: LanguageTranslateService ,private _svc: SharedServicesService, private sanitizer: DomSanitizer,
    private router: Router, public dialog: MatDialog, public GlobalVariableService: GlobalVariableService) {
      super(languageTranslateService);
    this.objappSetting = new AppSetting();
    this.objappSetReq_params = new appSetReq_params();
    this.workflowapi=new WorkFlowApi();
  }
  ngOnInit() {
    this.FormName = localStorage.getItem("BPPFromNameEn");
    this.getRecord();
    this.getLogo();
  }
  getLogo(){
    var path =  localStorage.getItem('logoPath');
    this._svc.getGenericParmas(path , "path", 'Account/GetPageNameByPath').subscribe(
      data => {
        
        this.FormName = data.FormName;
     
      }, (err) => {
        this.GlobalVariableService.openDialog(this.FormName, "Error Occured while getting logo.")
      }
    );
  }
  getRecord() {
    //.getComments('AppSettings/GetApp_Settings')
    this._svc.GetDetails('AppSettings/GetApp_Settings').subscribe(
      data => {

        this.objappSetting = data;
        this.imagepath = this.objappSetting.Companyimage;
      }, (err) => {
      });
  }
  urls = [];
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + this.imagepath);//data:image/jpg;base64, 
  }
  handleInputChange(e) {
    
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {

    let reader = e.target;
    this.imageSrc = reader.result;
    this.objappSetting.Companyimage = reader.result;
    this.imagepath = this.objappSetting.Companyimage.replace('data:image/png;base64,', '');
    this.transform();
  }
  UpdateApp_Settings() {

    this.objappSetReq_params.companyArabicName1 = this.objappSetting.companyArabicName1;
    this.objappSetReq_params.CompanyArabicName2 = this.objappSetting.CompanyArabicName2;
    this.objappSetReq_params.CompanyName1 = this.objappSetting.CompanyName1;
    this.objappSetReq_params.CompanyName2 = this.objappSetting.CompanyName2;
    this.objappSetReq_params.Companyimage = this.objappSetting.Companyimage;
    this.objappSetReq_params.LogoPath = this.objappSetting.LogoPath;
    //this.objappSetReq_params.Companyimage=this.objappSetting.Companyimage;
    // this.objappSetReq_params.LogoImage=this.objappSetting.LogoImage;
    //this.objappSetReq_params.Other1=this.objappSetting.Other1;
    //this.objappSetReq_params.Other2=this.objappSetting.Other2;
    //this.objappSetReq_params.Other3=this.objappSetting.Other3;
    // this.objappSetReq_params.CREATED_DATE=new Date();
    //this.objappSetReq_params.SystemUsersType=this.objappSetting.SystemUsersType;
    //this.objappSetReq_params.HasEmailApproval=this.objappSetting.HasEmailApproval;
    //this.objappSetReq_params.ShowLoginForm=this.objappSetting.ShowLoginForm;
    //this.objappSetReq_params.ShowThemeToUsers=this.objappSetting.ShowThemeToUsers;

    if (this.initialValidations()) {
      var appset=this.objappSetReq_params;
      this._svc.UpdateApp_Settings(this.objappSetReq_params, 'AppSettings/UpdateApp_Settings').subscribe(
        data => {
          
          this.getRecord();
          this.GlobalVariableService.openDialog(this.FormName, "Record Has been saved.");
          this.Redirect('AppSet');
        }, (err) => {
          
          // console.log(err);
          this.GlobalVariableService.openDialog(this.FormName, "Error occured.");
        });
    }
    else {
      this.GlobalVariableService.openDialog(this.FormName, "Please Fill Mentioned Fields : " + this.errorMessage);
    }

  }
  Redirect(url: string) {
    var myurl = `${url}/${''}`;
    const that = this;
    that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      that.router.navigate([myurl])
    );
  }
  initialValidations() {
    
    this.errorMessage = "";
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objappSetReq_params.CompanyName1)) {
      this.errorMessage = " English Name ,";
      // return false;
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objappSetReq_params.CompanyName2)) {
      this.errorMessage = this.errorMessage + "English Short Name ,";
      //return false;
    }

    if (this.GlobalVariableService.isStringNullOrEmplty(this.objappSetReq_params.CompanyArabicName2)) {
      this.errorMessage = this.errorMessage + " Customer Arabic Name ,";
      //return false;
    }

    if (this.GlobalVariableService.isStringNullOrEmplty(this.objappSetReq_params.companyArabicName1)) {
      this.errorMessage = this.errorMessage + " Arabic Short Name ,";
      // return false;
    }
    if (this.GlobalVariableService.isStringNullOrEmplty(this.objappSetReq_params.LogoPath)) {
      this.errorMessage = this.errorMessage + " Images ,";
      // return false;
    }
    if (this.errorMessage == "") {
      this.errorMessage = "";
      return true;
    }
    else {
      this.errorMessage = this.errorMessage.substring(0, this.errorMessage.length - 1);
      return false;
    }
  }



}
