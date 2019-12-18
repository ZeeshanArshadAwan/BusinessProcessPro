import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-custom-confirm-modals',
  templateUrl: './custom-confirm-modals.component.html',
  styleUrls: ['./custom-confirm-modals.component.css']
})
export class CustomConfirmModalsComponent implements OnInit {
  title: string;
  message: string;
  constructor(public dialogRef: MatDialogRef<CustomConfirmModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomConfirmDialogModel) {
      this.title = data.title;
      this.message = data.message;

     }

  ngOnInit() {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}

export class CustomConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}