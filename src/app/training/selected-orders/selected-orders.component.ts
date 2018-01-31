import { SalesOrdersComponent } from './../sales-orders/sales-orders.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { ProdPlan } from './../../shared/prod_plan';

@Component({
  selector: 'app-selected-orders',
  templateUrl: './selected-orders.component.html',
  styleUrls: ['./selected-orders.component.css']
})
export class SelectedOrdersComponent implements OnInit {
  // @Input() salesOrderChild: ProdPlan[] = [];
  // @Input() salesOrderChild: String;
  
  // Working 1
  // @Input() childMessage: string;
  // message: string = "Hola Mundo!";

  // Working 2
  // parentMessage = "message from parent";
  // @ViewChild(SalesOrdersComponent) child;
  // message1:string;

  // @ViewChild(SalesOrdersComponent) child;
  // message: ProdPlan[];


  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    // working 2
        // this.message1 = this.child.message;
  }
  // ngAfterViewInit() {
  //   this.message = this.child.message;
  //   console.log(this.message)

  // }
}
