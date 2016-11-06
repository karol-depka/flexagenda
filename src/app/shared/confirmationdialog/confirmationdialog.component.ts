import { Component, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'confirmation',
  template: ''
})
export class ConfirmationDialogComponent {
  dialogRef: MdDialogRef<ConfirmationDialog>;
  lastCloseResult: string;

  constructor(
      public dialog: MdDialog,
      public viewContainerRef: ViewContainerRef) { }

  confirm(message): string {
    let configDialog = new MdDialogConfig();
    configDialog.viewContainerRef = this.viewContainerRef;
    this.dialogRef = this.dialog.open(ConfirmationDialog, configDialog);

    this.dialogRef.afterClosed().subscribe(result => {
      this.lastCloseResult = result;
      this.dialogRef = null;

    });
    return this.lastCloseResult;
  }
}



@Component({
  selector: 'confirmation-dialog',
  template: `
  <p>Are you sure you want to delete?</p>
  <button type="button" (click)="dialogRef.close()">YES</button>
  <button type="button" (click)="dialogRef.close()">No</button>`
})
export class ConfirmationDialog {

  constructor(public dialogRef: MdDialogRef<ConfirmationDialog>) { }
}
