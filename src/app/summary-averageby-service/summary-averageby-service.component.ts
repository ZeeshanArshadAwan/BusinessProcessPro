import { Component, OnInit } from '@angular/core';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { LanguageTranslateService } from '../SharedServices/language-translate.service';
import { SummaryAveragebyService } from '../Classes/SummaryAveragebyService';

@Component({
  selector: 'app-summary-averageby-service',
  templateUrl: './summary-averageby-service.component.html',
  styleUrls: ['./summary-averageby-service.component.css']
})
export class SummaryAveragebyServiceComponent implements OnInit {
  report: string[] = ['PDF', 'Word', 'Excel'];
  ObjSummaryAveragebyService:SummaryAveragebyService;
  constructor(public languageTranslateService: LanguageTranslateService , private _svc: SharedServicesService,public GlobalVariableService : GlobalVariableService) {
  this.ObjSummaryAveragebyService=new SummaryAveragebyService();
   }
  ngOnInit() {
  }

}
