import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  selector: 'snack-bar',
  template: ''
})
export class SnackBarComponent implements OnInit {

  constructor( public snackBar: MdSnackBar ) { }

  public showSnackBar(message) {
    let SnackBarRef = this.snackBar.open(message, "DISMISS");
    setTimeout(SnackBarRef.dismiss.bind(SnackBarRef), 2000);
  }

  ngOnInit() {
  }

}
