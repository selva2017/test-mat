import { Component, OnInit, Input } from '@angular/core';

import { ProdPlan } from './../../shared/prod_plan';

@Component({
  selector: 'app-selected-orders',
  templateUrl: './selected-orders.component.html',
  styleUrls: ['./selected-orders.component.css']
})
export class SelectedOrdersComponent implements OnInit {
  // @Input() salesOrderChild: ProdPlan[] = [];
  // @Input() salesOrderChild: String;

  constructor() { }

  ngOnInit() {
  }

}
