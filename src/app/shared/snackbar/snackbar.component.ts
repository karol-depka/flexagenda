import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  selector: 'snack-bar',
  template: ''
})
export class SnackBarComponent implements OnInit {

  constructor( public snackBar: MdSnackBar,
               private _viewContainerRef: ViewContainerRef ) { }

  public showSnackBar(message) {
    let configSnackBar = new MdSnackBarConfig(this._viewContainerRef);
    let SnackBarRef = this.snackBar.open(message, "DISMISS",configSnackBar);
    setTimeout(SnackBarRef.dismiss.bind(SnackBarRef), 2000);
  }

  ngOnInit() {
  }

}
