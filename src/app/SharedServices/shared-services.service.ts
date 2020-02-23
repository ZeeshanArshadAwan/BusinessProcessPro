import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Login, Sys_Users } from '../Classes/login';
import { AppSetting, appSetReq_params } from '../Classes/app-setting'
import { ApplicationType, applicationStatus, ApplicationStatus_Escalation, ApplciationTypePanels, FieldListItems, FieldListGroups } from '../Classes/application-work-flow-class';
import { DefineUserGroup } from '../Classes/define-group';
import { Locationlevel } from '../Classes/locationlevel';
import { OrgCompany, OrgLevel, OrgEntity } from '../Classes/organization-structure';
import { LocationDetail } from '../Classes/location-detail';
import { NotificationType } from '../Classes/notification-type';
import { ApplicationTypeFields, ApplicationDetailReport, AllApplication } from '../Classes/application-review';
import { Applications } from '../Classes/Applications';
import { ApplicationValues } from '../Classes/ApplicationValues';
import { Application_Files } from '../Classes/Application_Files';
import { ApplicationType_Documents } from '../Classes/ApplicationType_Documents';
import { ApplicationTypeTemplate } from '../Classes/ApplicationTypeTemplate';
import { EmployeeDeputyAssignment } from '../Classes/emp-deputy-assignment';
import { WorkFlowApi } from '../Classes/WorkFlowApi';
import { WorkFlowApiParameters } from '../Classes/WorkFlowApiParameters';
import { PaymentServices } from '../Classes/PaymentServices';
import { FinesPayment } from '../Classes/FinesPayment ';
import { GeoSpatialMaps } from '../Classes/GeoSpatialMaps';
import { SummaryAversgeByCustomer } from '../Classes/SummaryAversgeByCustomer';
import { DetailedCustomerVisit } from '../Classes/DetailedCustomerVisit';
import { SummaryAverageByLocationArea } from '../Classes/SummaryAverageByLocationArea';
@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {
  //serviceIP: string = 'http://192.168.168.134/BusinessProServices/api/';
  // serviceIP: string = 'http://192.168.168.6/BusinessProServices/api/';
  // For Local API
   serviceIP: string = 'http://localhost:10248/api/';
  // serviceIP: string = 'http://192.168.168.134/AMBusinessProcess/Api/'
  // serviceIP: string = 'http://104.238.125.92/BusinessProServices/api/';
  constructor(private httpclient: HttpClient) {
  }
  //Get withOut Parameter
  GetDetails(UrlName: string): Observable<any> {
    var Url = this.serviceIP + UrlName;
    return this.httpclient.get(Url);
  }
  //Get with Parameter
  getGenericParmas(id: any, paramName: string, UrlName: string): Observable<any> {
    var url = this.serviceIP + UrlName;
    let param1 = new HttpParams().set(paramName, id)
    return this.httpclient.get(url, { params: param1 })
  }
  getGenericParmasfordynamicapi(id: any, paramName: string, UrlName: string): Observable<any> {
    // var url = this.serviceIP + UrlName;
    let param1 = new HttpParams().set(paramName, id)
    return this.httpclient.get(UrlName, { params: param1 })
  }
  ///Post 
  posts(Objectclass: any, APIName: string = ''): Observable<any> {
    return this.httpclient.post(this.serviceIP + APIName, Objectclass)
  }
  DeleteMultipleLocationLevels(Objectclass: Locationlevel, APIName: string = ''): Observable<any> {
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, Objectclass)
  }

  // DeleteMultipleUsers(Objectclass: any, APIName: string = ''): Observable<any> {
  //   var url = this.serviceIP + APIName;
  //   return this.httpclient.post(url, Objectclass)
  // }


  getLogin(Objectclass: Login, APIName: string = ''): Observable<any> {
    var api = this.serviceIP + APIName;
    return this.httpclient.post(api, Objectclass)
  }

  UpdateApp_Settings(Objectclass: appSetReq_params, APIName: string = ''): Observable<any> {
    
     var url = this.serviceIP + APIName;
    return this.httpclient.post(url, Objectclass)
  }
  postDynamicApi(Objectclass: any, APIName: string = ''): Observable<any> {
    //var url = this.serviceIP + APIName;
    return this.httpclient.post(APIName, Objectclass)
  }
  AddVisitType(Objectclass: ApplicationType, APIName: string = ''): Observable<any> {

    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, Objectclass)
  }
  UpdateVisitorStatus(p: applicationStatus, APIName: string): Observable<any> {
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, p)
  }
  AddUser(Objectclass: Sys_Users, APIName: string = ''): Observable<any> {

    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, Objectclass)
  }
  SaveDefineGroup(DefineUserGroup: DefineUserGroup[], APIName: string = ''): Observable<any> {

    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, DefineUserGroup)
  }

  SaveLocationlevel(Objectclass: Locationlevel, APIName: string = ''): Observable<any> {
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, Objectclass)

  }
  UpdateCompany(Objectclass: OrgCompany, APIName: string = ''): Observable<any> {
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, Objectclass)

  }
  AddDeleteCompanyLevel(Objectclass: OrgLevel, APIName: string = ''): Observable<any> {
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, Objectclass)

  }
  UpdateEntity(Objectclass: OrgEntity, APIName: string = ''): Observable<any> {
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, Objectclass)

  }
  saveLocation(Objectclass: LocationDetail, APIName: string = ''): Observable<any> {
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, Objectclass)
  }

  SaveNotificationType(Objectclass: NotificationType, APIName: string = ''): Observable<any> {
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, Objectclass)
  }
  AddUpdateAppStatusEscalation(Objectclass: ApplicationStatus_Escalation, APIName: string = ''): Observable<any> {
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, Objectclass)
  }

  SavePanelsInfo(p: ApplciationTypePanels, APIName: string): Observable<any> {
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, p)
  }
  SaveFieldsItemsInfo(p: FieldListItems, APIName: string): Observable<any> {
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, p)
  }
  SaveAppTypeDocument(p: ApplicationType_Documents, APIName: string): Observable<any> {
    
    var url = this.serviceIP + APIName;
    return this.httpclient.post(url, p)
  } 
    SaveFieldsInfo(p: ApplicationTypeFields, APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }
    GetReport(p: ApplicationDetailReport, APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    } 
    GetReportForSummaryCustomer(p: SummaryAversgeByCustomer, APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    } 
    SearchApplications(p: AllApplication, APIName: string): Observable<any> {
      
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }
	CreateApplication(p: Applications, APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    } 
    SaveApplicationValues(p: ApplicationValues[], APIName: string): Observable<any> {
      
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    } 
    SaveDocumentFiles(p: Application_Files[], APIName: string): Observable<any> {
      
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    } 
    UpdateStatusAndRemarks(p: any, APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    } 
    GetAllFieldListItemsByFieldId(p: Application_Files , APIName: string): Observable<any> {
      
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    } 
    GetReportForDetailedCustomerVisit(p: DetailedCustomerVisit , APIName: string): Observable<any> {
      
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    } 


    
    SaveTemplate(p: ApplicationTypeTemplate , APIName: string): Observable<any> {
      
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }
    AddUpdateEmployeeDeputyAssignment(p: EmployeeDeputyAssignment, APIName: string): Observable<any> {
      
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }
    UpdatePanelOrderUp(p: ApplciationTypePanels, APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }
    UpdatePanelOrderDown(p: ApplciationTypePanels, APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }
    // UpdateFieldOrderDown(p: ApplicationTypeFields, APIName: string): Observable<any> {
    //   var url = this.serviceIP + APIName;
    //   return this.httpclient.post(url, p)
    // }
    UpdateFieldOrder(p: ApplicationTypeFields, APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    } 
    SaveworkFlowApi(p: WorkFlowApi , APIName: string): Observable<any> {
      
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    } 
    SaveworkFlowApiParameters(p: WorkFlowApiParameters , APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }
    SavePaymentServices(p: PaymentServices[], APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }
    SaveFinesPayment(p: FinesPayment[], APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }

    SaveGeoSpecialMaps(p: GeoSpatialMaps[], APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }
    GetCounts(APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.get(url)
    } 
    SaveFieldsGroupInfo(p: FieldListGroups, APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }
    GetReportForSummaryAverageByLocationArea(p: SummaryAverageByLocationArea, APIName: string): Observable<any> {
      var url = this.serviceIP + APIName;
      return this.httpclient.post(url, p)
    }



    
    
}

