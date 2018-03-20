import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  showStockDetails = false;
  showSalesDetails = false;
  showReceiptDetails = false;
  showBFGSM = false;
  showBFGSMSize = false;
  showCustomers = false;
  constructor() { }

  ngOnInit() {
  }
  onLinkClick(event: MatTabChangeEvent) {
    // console.log('event => ', event);
    // console.log('index => ', event.index);
    // console.log('tab => ', event.tab);
    if (event.tab.textLabel == "Sales Details") {
      this.showSalesDetails = true;
    }
    if (event.tab.textLabel == "Receipt Details") {
      this.showReceiptDetails = true;
    }
    if (event.tab.textLabel == "Orders BF GSM") {
      this.showBFGSM = true;
    }
    if (event.tab.textLabel == "Orders BF GSM Size") {
      this.showBFGSMSize = true;
    }
    if (event.tab.textLabel == "Customers") {
      this.showCustomers = true;
    }
  }

}
