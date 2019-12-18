import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SharedServicesService } from '../SharedServices/shared-services.service';
import { LocationDetail } from '../Classes/location-detail';
import { GlobalVariableService } from '../SharedServices/global-variable.service';
import { CustomConfirmDialogModel, CustomConfirmModalsComponent } from '../custom-confirm-modals/custom-confirm-modals.component';
declare const $: any;
@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {
  FormName: string = 'Location Detail';
  errorMessage: string = "";
  LocationTreeStructure: any;
  ObjLocationDetail: LocationDetail;
  CompanyEntityID: string;
  LocationForm: Boolean = false;
  Fk_CompanyId: number;
  FK_ParentID: string = "";
  FK_LocationlevelId: string = "";
  constructor(private _svc: SharedServicesService, private GlobalService: GlobalVariableService,
    public dialog: MatDialog) {
    this.ObjLocationDetail = new LocationDetail();
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.getLocationTreeDetail(0);
  }

  getLocationTreeDetail(id: any = null) {
    this._svc.getGenericParmas(id, "id", "Location/GetLocationTreeStructure").subscribe(
      data => {
        this.LocationTreeStructure = data;
        this.LocationTree();
        //this.bindTree();
      })
  }

  saveLocation() {
    
    if (this.initialValidation()) {
      this.ObjLocationDetail.FK_LocationlevelId = Number(this.FK_LocationlevelId);
      this._svc.saveLocation(this.ObjLocationDetail, "Location/AddLocation").subscribe(
        data => {
          this.ObjLocationDetail = new LocationDetail();
          this.GlobalService.openDialog("Location Detail", "Record saved successfully.")
          this.getLocationTreeDetail();
        }
      )
    }
    else {
      this.GlobalService.openDialog('Service Type', "Please Fill Mentioned Fields : " + this.errorMessage)
    }
  }

  initialValidation() {
    this.errorMessage = "";
    if (this.GlobalService.isStringNullOrEmplty(this.ObjLocationDetail.LocationCode)) {
      this.errorMessage = this.errorMessage + 'Location Code ,';
    }
    if (this.GlobalService.isStringNullOrEmplty(this.ObjLocationDetail.LocationName)) {
      this.errorMessage = this.errorMessage + 'Location Name ,';
    }
    if (this.GlobalService.isStringNullOrEmplty(this.ObjLocationDetail.LocationArabicName)) {
      this.errorMessage = this.errorMessage + 'Location Arabic Name ,';
    }
    if (this.errorMessage == "") {
      return true;
    }
    else {
      this.errorMessage = this.errorMessage.substring(0, this.errorMessage.length - 1);
      return false;
    }
  }

  getLocationDetail(id: any) {
    
    this._svc.getGenericParmas(id, "id", "Location/GetLocationById").subscribe(
      data => {
        this.ObjLocationDetail = data;
        this.LocationForm = true;

      })
  }
  Cancel() {
    this.ObjLocationDetail = new LocationDetail()
  }
  DeleteLocation() {

    if (this.FK_ParentID == "0") {
      this.FK_ParentID = "Company" +", "+ this.Fk_CompanyId.toString();
    }else {
      this.FK_ParentID = "Entity" +", "+ this.FK_ParentID;
    }
    this._svc.getGenericParmas(this.FK_ParentID, "id", "Location/DeleteLocation").subscribe(
      data => {
        if (data == '0') {
          this.GlobalService.openDialog("Location Detail", "Record has been delted.");
          this.getLocationTreeDetail(0);
        }
        else {
          this.GlobalService.openDialog("Location Detail", "Some Error Occured.")
        }

      })
  }
  ShowConfirmDialog(): void {
    var msg = '';
    if (this.GlobalService.isStringNullOrEmplty(this.CompanyEntityID)) {
      this.GlobalService.openDialog("Location Detail", "Please select a company to add location");
    }
    else {
      const message = 'Are you sure you want to delete the selected location?';
      const dialogData = new CustomConfirmDialogModel("Location Detail", message);
      const dialogRef = this.dialog.open(CustomConfirmModalsComponent, {
        width: "400px",
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.DeleteLocation();
        }
      });
    }
  }

  AddLocationBelow() {
    
    if (this.GlobalService.isStringNullOrEmplty(this.CompanyEntityID)) {
      this.GlobalService.openDialog("Location Detail", "Please select a company to add location")
      return;
    }
    else {
      // this.ObjLocationDetail = new LocationDetail();
      this._svc.getGenericParmas(this.CompanyEntityID, "value", "Location/GetLocationStatusAgainstCompany").subscribe(
        data => {
          
          this.FK_LocationlevelId = data;
          this.ObjLocationDetail.FK_LocationlevelId = data;
          if (this.ObjLocationDetail.FK_LocationlevelId == 0) {
            this.LocationForm = false;
            this.GlobalService.openDialog("LocationDetail", "Please Add LocationLevel For Adding Location");

          }
          else {
            this.ObjLocationDetail = new LocationDetail();
            this.LocationForm = true;
            // this.ObjLocationDetail.FK_LocationlevelId = data
            this.ObjLocationDetail.FK_CompanyId = this.Fk_CompanyId;
            this.ObjLocationDetail.FK_ParentId = Number(this.FK_ParentID);
          }
          // this.LocationTree();
          //this.bindTree();
        })
    }
  }
  LocationTree(): void {
    var self = this;
    var data = this.LocationTreeStructure;
    var source =
    {
      datatype: "json",
      datafields: [
        { name: 'id' },
        { name: 'parentid' },
        { name: 'text' },
        { name: 'value' },
      ],
      id: 'id',
      localdata: data
    };
    // create data adapter.
    var dataAdapter = new $.jqx.dataAdapter(source);
    // perform Data Binding.
    dataAdapter.dataBind();
    var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
    $('#jqxWidget1').jqxTree({ source: records, width: '300px' });
    $('#jqxWidget1').on('select', function (event) {

      var args = event.args;
      var item = $('#jqxWidget1').jqxTree('getItem', args.element);
      var Level = item.level;
      var myConEle = document.querySelector('[ng-controller=myCntrl]');
      //alert(Level);
      var trt = item.value;
      var itemsplit = trt.split(":");
      var EntId = itemsplit[0];
      var EntityId = parseInt(EntId);
      var id = itemsplit[1];
      var Company = itemsplit[2];
      var ID = parseInt(id);
      self.CompanyEntityID = trt;
      self.Fk_CompanyId = ID;
      
      self.FK_ParentID = EntityId.toString();
      if (Company == "Entity") {
        self.getLocationDetail(EntityId);
      }
    });
  };
}
