import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalVariableService } from 'src/app/SharedServices/global-variable.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { Login, Sys_Modules, FormsAgainstModuleId } from 'src/app/Classes/login';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedServicesService } from 'src/app/SharedServices/shared-services.service';
import { AppSetting } from 'src/app/Classes/app-setting';
import { LanguageTranslateService } from 'src/app/SharedServices/language-translate.service';
import { BaseComponent } from 'src/app/SharedServices/base-component';
import { ApplicationTools } from 'src/app/Classes/application-review';
declare var $: any
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent extends BaseComponent implements OnInit {

  data: any[] = [];
  enableFooter = false;
  selectedItems = [];
  // selectedLanguage = 'en';
  // cssClass: string = "flag-icon-0";
  // languageSelected : string =  "English";
  selectedLanguage = 'en';
  // cssClass: string = "../../../assets/assets/img/ArBt.png";
  cssClass: string = "assets/assets/img/ArBt.png";
  languageSelected: string = "English";
  id: string = '';
  objappSetting: AppSetting;
  imagepath: string;
  activeClass: string = '';
  DisplayBlock: string = "";
  togglelight: boolean = false;
  toggleDark: boolean = true;
  isVertical: boolean = true;
  isEn: boolean = true;
  public now: Date = new Date();
  lstformtoDisplay: FormsAgainstModuleId;

  constructor(public languageTranslateService: LanguageTranslateService,
    private GlobalVariableService: GlobalVariableService,
    private _svc: SharedServicesService, private router: Router, private sanitizer: DomSanitizer) {
    super(languageTranslateService);
    this.lstformtoDisplay = new FormsAgainstModuleId();
    this.objappSetting = new AppSetting();
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }
  languages = ['en', 'ar'];

  onSelected(itemIndex: any) {
    if (this.selectedItems.indexOf(itemIndex) === -1) {
      this.selectedItems.push(itemIndex);
    }
    else {
      this.selectedItems.splice(this.selectedItems.indexOf(itemIndex), 1);
    }
  }

  isSelected(itemIndex: any) {
    return this.selectedItems.indexOf(itemIndex) !== -1;
  }

  onEnLanguageSelection(event) {
    this.isEn= false;
    if (!this.GlobalVariableService.isStringNullOrEmplty(event)) {
      localStorage.setItem("language", event.toString());
    }
    else {
      localStorage.setItem("language", "en");
    }
    this.languageTranslateService.setLang(event);

    this.cssClass = "assets/assets/img/EnBt.png";
    (<HTMLInputElement>document.getElementById('Arabic_temp')).disabled = false;
    $(".content").css("margin-left", "1px");
    $("#HeaderLeft").css("float", "right");
    $("#RightHeader").css("float", "left");

  }
  onArLanguageSelection(event) {
    this.isEn= true;
    localStorage.setItem("language", event.toString());
    (<HTMLInputElement>document.getElementById('Arabic_temp')).disabled = true;
    this.languageTranslateService.setLang(event);
    this.cssClass = "assets/assets/img/ArBt.png";
    var dir = localStorage.getItem("direction"); //$.cookie("direction");
    //alert(dir);
    if (dir == "v") {
      $(".content").css("margin-left", "180px");
    }
    $("#HeaderLeft").css("float", "left");
    $("#RightHeader").css("float", "right");

  }
  ngOnInit() {
    //  this.languageTranslateService.setLang('en');
    if (this.GlobalVariableService.formtoDisplay.FnlModFormList == undefined) {
      this.GlobalVariableService.formtoDisplay = this.GetFromLocalStorage("BPPuserPrevillege");
    }
    this.enableDisableElements(localStorage.getItem("logoPath"));
    this.loadScript('./assets/js/sidebar.js');
    this.id = this.GlobalVariableService.parameterID;
    this.getlist();
    this.getLogoPath();
    this.docready();
    var lang = localStorage.getItem("language");
    if (lang == "en") {
      this.isEn = true;
      this.onArLanguageSelection(lang);
    }
    else {
      this.isEn = false;
      this.onEnLanguageSelection(lang);
      // $(".content").css("margin-left","");
    }

  }

  getLogoPath() {
    this._svc.GetDetails('AppSettings/GetApp_Settings').subscribe(
      data => {
        this.objappSetting = data;
        this.imagepath = this.objappSetting.Companyimage;
      }, (err) => {
        this.GlobalVariableService.openDialog("Error", "Some Error oecured while getting logo.")
      });
  }
  transform(path: string = "") {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + this.imagepath);
  }
  GetFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  getlist() {
    this.lstformtoDisplay = this.GlobalVariableService.formtoDisplay;
    this.activeClass = this.GlobalVariableService.activeMenue;
    console.log(this.lstformtoDisplay);
  }

  loadScript(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = "text/javascript";
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  logout() {
    localStorage.removeItem("BPPUserName");
    localStorage.removeItem("BPPassword");
    localStorage.removeItem("BPPuserPrevillege");
    this.GlobalVariableService.userPrevilieges = new Login();
    this.router.navigateByUrl('/login');
  }

  enableDisableElements(formName: string= null ) {
    if(!this.GlobalVariableService.isStringNullOrEmplty(formName)){
      var arr = formName.split("=");
      this.GlobalVariableService.ApplicationTools = new ApplicationTools();
      if (formName.includes('../Applications/ManageApplications.aspx')) {
        if (arr.length > 1) {
          this.GlobalVariableService.ApplicationTools.globalID = arr[1];
          this.GlobalVariableService.ApplicationTools.AppAssignedGroup = "";
          this.GlobalVariableService.ApplicationTools.AppType = "";
          this.GlobalVariableService.ApplicationTools.AppNo = "";
        }
        else {
          this.GlobalVariableService.ApplicationTools.AppAssignedGroup = "";
          this.GlobalVariableService.ApplicationTools.AppNo = "";
        }
      }
    }
  }
  
  getRouting(FnlModFormList: number, formnamelist: number) {
    
    this.GlobalVariableService.isAllapplication = false;
    this.GlobalVariableService.AssignedApplication = false;
    this.GlobalVariableService.parameterID = '';

    localStorage.setItem("BPPFromNameEn", this.lstformtoDisplay.FnlModFormList[FnlModFormList].formnamelist[formnamelist].Desc_En)
    //localStorage.setItem("BPPFromNameAr", this.lstformtoDisplay.FnlModFormList[FnlModFormList].formnamelist[formnamelist].Desc_Ar)

    localStorage.setItem("logoPath", this.lstformtoDisplay.FnlModFormList[FnlModFormList].formnamelist[formnamelist].FormPath);
    localStorage.setItem("PathName", this.lstformtoDisplay.FnlModFormList[FnlModFormList].ModuleName);
    var formPath = this.lstformtoDisplay.FnlModFormList[FnlModFormList].formnamelist[formnamelist].FormPath;
    //if (this.lstformtoDisplay.FnlModFormList[FnlModFormList].formnamelist[formnamelist].FormPath.includes('Definition/Definition')) {
    if (formPath.includes('Definition/Definition')) {
      this.GlobalVariableService.Sys_Forms = this.lstformtoDisplay.FnlModFormList[FnlModFormList].formnamelist[formnamelist];
      var arr = this.GlobalVariableService.Sys_Forms.FormPath.split("/");
      this.GlobalVariableService.parameterID = arr[arr.length - 1];
      var url = 'Definition';
      var myurl = `${url}/${arr[arr.length - 1]}`;
      const that = this;
      that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        that.router.navigate([myurl])
      );
    }


     else if (formPath.includes('Company/AddLocation')) {
       this.Redirect('LocationLevel');
     }
    else if (formPath.includes('Company/LocationIndex')) {
      this.Redirect('LocationDetail');
    }
  
    else if (formPath.includes('Reports/DynamicReports')) {
      this.Redirect('Globalization');
    }
  
    else if(formPath.includes('Application/CreateApplication?AppType=')){
      
      this.GlobalVariableService.parameterID=formPath.split('?AppType=')[1];
      this.GlobalVariableService.ApplicationValues=[];
      this.GlobalVariableService.editProspectMode=true;
      this.GlobalVariableService.IsDocumentUpload=true;
      this.GlobalVariableService.applicationdetaildiv=false;
      this.GlobalVariableService.AssignedApplication=false;
      this.Redirect('ApplicationDetail');
    }
    else if(formPath.includes('AssignedApplication')){
      
      this.GlobalVariableService.parameterID=formPath.split('?AppType=')[1];
      this.Redirect('AssignedApplication');
    }
    else if(formPath.includes('OnlinePortal')){
      var url = "http://192.168.168.134/BusinessProcessOnlinePortal/";
      window.open(url, "_blank");
    }
    else {
      
      this.Redirect(formPath);
    }
    // else {
    //   this.Redirect('dashboard');
    //   }
    this.GlobalVariableService.activeMenue = FnlModFormList.toString();
  }
  Redirect(url: string) {
    var myurl = `${url}/${''}`;
    const that = this;
    that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      that.router.navigate([myurl])
    );
  }
  allRequiredStyles(num: number) {
    let myStyles;
    if (num == undefined) {
      myStyles = {
        'display': 'none'
      }
    }
    else if (this.activeClass == num.toString()) {
      myStyles = {
        'display': 'block'
      }
    }
    else {
      myStyles = {
        'display': 'none'
      }
    }
    return myStyles;
  }

  docready() {
    $("#stickscroll").css("display", "block");
    var dir = localStorage.getItem("direction"); //$.cookie("direction");
    var element = $("#wrapper");
    var toggled = localStorage.getItem('toggled');;
    element.toggleClass("toggled");
    if (toggled == "true") {
      element.addClass("toggled");
    }
    else {
      element.removeClass("toggled");
    }
    if (dir == "v") {
      var i = $(this).index();
      $('.side-left').removeClass('Vertical').addClass('Horizontal');
      $('.content').removeClass('Horizontal_content');
      $("#divContent").addClass("Horizontalcontent");

    }
    else {
      var i = $(this).index();
      $('.side-left').addClass('Vertical').removeClass('Horizontal');
      $('.content').addClass('Horizontal_content');
    }

    //myFunction();
    if (!$("#stickscroll").hasClass("Horizontal")) {
      $('.tab_position_Horizontal a').addClass('active');
      $('.tab_position_Vertical a').removeClass('active');
    }
    else {
      $('.tab_position_Horizontal a').removeClass('active');
      $('.tab_position_Vertical a').addClass('active');
    }

  }
  ThemeClick() {
    var $slider = $('.sidesettingsdiv');
    $slider.animate({
      right: parseInt($slider.css('right'), 0) == -300 ?
        0 : -300
    });

  }
  MenuToggle() {
    var dir = localStorage.getItem("direction"); //$.cookie("direction");
    //alert(dir);
    if (dir == "v") {
      $(this).toggleClass('');
      //e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      $(".content").addClass("Horizontalcontent");
    }
    else {
      $(this).toggleClass('');
      //e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      $(".content").removeClass("Horizontalcontent");
    }

    if ($("#wrapper").hasClass("toggled")) {
      localStorage.setItem('toggled', 'true');
    }
    else {
      localStorage.setItem('toggled', 'false');
    }

  }
  HorizontalClick() {

    var i = $(this).index();
    $('.side-left').addClass('Vertical').removeClass('Horizontal');
    $('.tab_position_Horizontal a').addClass('active');
    $('.tab_position_Vertical a').removeClass('active');
    $('.content').addClass('Horizontal_content');
    localStorage.setItem("direction", "h");
    if ($("#wrapper").hasClass("toggled")) {
      $("#divContent").removeClass("Horizontalcontent");
    }

    if (this.languageTranslateService.lang == "en") {
      var dir = localStorage.getItem("direction");
      if (dir == "v") {
        $(".content").css("margin-left", "180px");
      }
      else {
        $(".content").css("margin-left", "");
      }

    } else {
      $(".content").css("margin-left", "");
    }

  }
  VerticalClick() {
    var i = $(this).index();
    $('.side-left').removeClass('Vertical').addClass('Horizontal');
    $('.tab_position_Horizontal a').removeClass('active');
    $('.tab_position_Vertical a').addClass('active');
    $('.content').removeClass('Horizontal_content');
    localStorage.setItem("direction", "v");
    if ($("#wrapper").hasClass("toggled")) {
      $("#divContent").addClass("Horizontalcontent");
    }

    if (this.languageTranslateService.lang == "en") {
      $(".content").css("margin-left", "180px");
    } else {
      $(".content").css("margin-left", "");
    }
  }

  functoggleMenu(id: string) {

    if (id == "dark") {
      this.toggleDark = true;
      this.togglelight = false;
      $("#lilight").removeClass('active');
      $("#lidark").addClass('active');
    } else {
      this.toggleDark = false;
      this.togglelight = true;
      $("#lilight").addClass('active');
      $("#lidark").removeClass('active');
    }
  }

  swithcColor(Color: string) {

    (<HTMLInputElement>document.getElementById('styles1')).disabled = true;
    (<HTMLInputElement>document.getElementById('styles2')).disabled = true;
    (<HTMLInputElement>document.getElementById('styles3')).disabled = true;
    (<HTMLInputElement>document.getElementById('styles4')).disabled = true;
    (<HTMLInputElement>document.getElementById('styles5')).disabled = true;
    (<HTMLInputElement>document.getElementById('styles6')).disabled = true;
    (<HTMLInputElement>document.getElementById('styles7')).disabled = true;
    (<HTMLInputElement>document.getElementById('styles8')).disabled = true;
    (<HTMLInputElement>document.getElementById('styles9')).disabled = true;
    (<HTMLInputElement>document.getElementById('styles10')).disabled = true;
    (<HTMLInputElement>document.getElementById('styles11')).disabled = true;
    (<HTMLInputElement>document.getElementById('styles12')).disabled = true;
    (<HTMLInputElement>document.getElementById(Color)).disabled = false;

    // $("#mat-raised-button.mat-primary").css( "color", "" );
  }
}
