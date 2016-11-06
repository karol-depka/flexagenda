import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.css'],
})
export class ConfirmationDialog {

  constructor(public dialogRef: MdDialogRef<ConfirmationDialog>) { }
}
