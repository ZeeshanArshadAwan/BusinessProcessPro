import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-common-modals',
  templateUrl: './common-modals.component.html',
  styleUrls: ['./common-modals.component.css']
})
export class CommonModalsComponent implements OnInit {
  title: string = '';
  message: string= '';

  constructor(public dialogRef: MatDialogRef<CommonModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommonDialogModel) {
    this.title = data.title;
    this.message = data.message;
   }

  ngOnInit() {
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

export class CommonDialogModel {

  constructor(public title: string, public message: string) { 

  }

    

}
