import {Component} from 'angular2/core';
import { Component, Directive, OnDestroy, Input } from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `<div (click)="$event.preventDefault()">
        <button type="button" (click)="pushItem()">Push</button>
        <button type="button" (click)="removeItemLast()">Remove Last</button><br/>
        <button type="button" (click)="unshiftItem()">Unshift</button>
        <button type="button" (click)="removeItemFirst()">Remove First</button><br/>
        <ul>
          <li class="my-animation" *ngFor="#item of items">
            {{item.title}}
          </li>
        </ul>
      </div>`
})
export class AppComponent {
  private count:number = 1;
  public items: Array<any>;
  constructor() { 
    console.clear(); 
    this.items = [];
    this.items.push(this.newItem());
    this.items.push(this.newItem());
    }
    pushItem() {
        this.items.push(this.newItem());
    },
    removeItemLast() {
      if(this.items.length > 0) this.items.splice(this.items.length - 1, 1);
    },
    unshiftItem() {
        this.items.unshift(this.newItem());
    },
    removeItemFirst() {
      if(this.items.length > 0) this.items.splice(0, 1);
    },
    newItem() {
      return {title: 'Item' + this.count++};
    }
    
}
