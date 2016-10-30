import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  selector: 'snack-bar',
  template: '',
  styleUrls: ['./snackbar.component.css']
})
export class SnackBarComponent implements OnInit {

  constructor( public snackBar: MdSnackBar,
               public viewContainerRef: ViewContainerRef ) { }

  public showSnackBar(message) {
    console.log("test");
    let config = new MdSnackBarConfig(this.viewContainerRef);
    let SnackBarRef = this.snackBar.open(message, "DISMISS",config);
    setTimeout(SnackBarRef.dismiss.bind(SnackBarRef), 2000);
  }

  ngOnInit() {
  }

}
