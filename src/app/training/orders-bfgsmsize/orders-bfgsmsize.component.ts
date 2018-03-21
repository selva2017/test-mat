import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { ProdPlan } from './../../shared/prod_plan';

@Component({
  selector: 'app-orders-bfgsmsize',
  templateUrl: './orders-bfgsmsize.component.html',
  styleUrls: ['./orders-bfgsmsize.component.css']
})
export class OrdersBfgsmsizeComponent implements OnInit {


  displayedColumns = ['bf', 'gsm', 'size', 'weight'];
  // displayedColumns = ['id', 'orderDate', 'orderNumber','company','bf', 'gsm',  'reel', 'size', 'voucherKey', 'weight','select'];
  // dataSource = new MatTableDataSource<ProdPlan>();
  dataSource = new MatTableDataSource<ProdPlan>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  subscription: Subscription;
  salesOrder: ProdPlan[];
  salesOrder_selected: ProdPlan[] = [];
  salesOrder_selected1: ProdPlan[] = [];
  salesOrder_row: ProdPlan[] = [];
  salesOrder_modified: ProdPlan[] = [];
  showLoader: boolean;
  showAll: boolean = true;
  salesOrderUpdated: boolean = false;
  salesOrder_BFGSM: ProdPlan[] = [];
  salesOrder_BFGSMSize: ProdPlan[] = [];
  salesOrder_BF: ProdPlan[] = [];
  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.showLoader = true;
    this.refreshList();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  refreshList() {
    this.subscription = this.serverService.getTotalBFGSMSize().
      subscribe(list => {
        // this.dataSource.data = list;
        // console.log(this.dataSource.data);
        this.salesOrder = list;
        this.dataSource.data = this.salesOrder.slice();
        !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
        this.showLoader = false;
      })
    this.showLoader = false;
  }

  // displayINR(amount: number) {
  //   return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  // }

  // onClickView(record) {
  //   this.salesOrder_row = record;
  // }
  // showSelected() {
  //   this.showAll = !this.showAll;
  // }
  // confirmProduction() {
  //   this.salesOrderUpdated = true;
  //   this.showAll = true;
  //   this.serverService.createProductionPlan(this.salesOrder_selected)
  //     .subscribe(
  //     (success) => {
  //       console.log("success");
  //     },
  //     (error) => console.log(error)
  //     );
  //   this.serverService.createProductionPlan(this.salesOrder_modified)
  //     .subscribe(
  //     (success) => {
  //       console.log("success");
  //     },
  //     (error) => console.log(error)
  //     );
  //   this.salesOrderUpdated = false;
  // }
  // clearAll() {
  //   this.salesOrder_selected = [];
  //   this.salesOrder_selected1 = [];
  //   this.salesOrder_BFGSMSize = [];
  //   this.salesOrder_BFGSM = [];
  //   this.salesOrder_BF = [];
  //   this.salesOrder_modified = [];
  //   this.refreshList();
  //   this.showAll = true;
  // }
  // extractModified() {
  //   for (var i = 0; i < this.salesOrder_selected.length; i++) {
  //     for (var j = 0; j < this.salesOrder_modified.length; j++) {
  //       if (this.salesOrder_selected[i].voucherKey === this.salesOrder_modified[j].voucherKey) {
  //         this.salesOrder_selected.splice(i, 1);
  //       }
  //     }
  //   }
  // }
  // generateItemBFGSM() {
  //   this.salesOrder_BFGSM = [];
  //   this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
  //   if (this.salesOrder_selected1.length >= 1) {
  //     for (var i = 0; i < this.salesOrder_selected1.length; i++) {
  //       var match: boolean = false;
  //       for (var j = 0; j < this.salesOrder_BFGSM.length; j++) {
  //         if ((this.salesOrder_BFGSM[j].bf + "" + this.salesOrder_BFGSM[j].gsm) === (this.salesOrder_selected1[i].bf + "" + this.salesOrder_selected1[i].gsm)) {
  //           var sum = Number(Number(this.salesOrder_BFGSM[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
  //           this.salesOrder_BFGSM[j].weight = parseFloat(sum);
  //           match = true;
  //           break;
  //         }
  //       }
  //       if (!match) {
  //         this.salesOrder_BFGSM.push(this.salesOrder_selected1[i]);
  //       }

  //     }
  //   }
  // }
  // generateItemBFGMSSize() {
  //   this.salesOrder_BFGSMSize = [];
  //   this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
  //   if (this.salesOrder_selected1.length >= 1) {
  //     for (var i = 0; i < this.salesOrder_selected1.length; i++) {
  //       var match: boolean = false;
  //       for (var j = 0; j < this.salesOrder_BFGSMSize.length; j++) {
  //         if (((this.salesOrder_BFGSMSize[j].bf + "" + this.salesOrder_BFGSMSize[j].gsm).concat(String(this.salesOrder_BFGSMSize[j].size))).trim() === ((this.salesOrder_selected1[i].bf + "" + this.salesOrder_selected1[i].gsm).concat(String(this.salesOrder_selected1[i].size))).trim()) {
  //           var sum = Number(Number(this.salesOrder_BFGSMSize[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
  //           this.salesOrder_BFGSMSize[j].weight = parseFloat(sum)
  //           match = true;
  //           break;
  //         }
  //       }
  //       if (!match) {
  //         this.salesOrder_BFGSMSize.push(this.salesOrder_selected1[i]);
  //       }
  //     }
  //   }
  // }
  // generateItemBF() {
  //   this.salesOrder_BF = [];
  //   var result;
  //   this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
  //   if (this.salesOrder_selected1.length >= 1) {
  //     for (var i = 0; i < this.salesOrder_selected1.length; i++) {
  //       var match: boolean = false;
  //       for (var j = 0; j < this.salesOrder_BF.length; j++) {
  //         var item = this.salesOrder_selected1[i].bf;
  //         if ((this.salesOrder_BF[j].bf) === this.salesOrder_selected1[i].bf) {
  //           var sum = Number(Number(this.salesOrder_BF[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
  //           this.salesOrder_BF[j].weight = parseFloat(sum);
  //           match = true;
  //           break;
  //         }
  //       }
  //       if (!match) {
  //         this.salesOrder_BF.push(this.salesOrder_selected1[i]);
  //       }
  //     }
  //   }
  // }

  // // selectFromAll(key, voucherKey, newQuantity) {
  // selectFromAll(key, id) {
  //   // console.log(key);
  //   // if (newQuantity > 0) {
  //   //   key.weight = Number(newQuantity);
  //   //   this.salesOrder_modified.push(key);
  //   // }
  //   this.salesOrder_selected.push(key);
  //   for (var i = 0; i < this.salesOrder.length; i++) {
  //     if (this.salesOrder[i].id === id) {
  //       this.salesOrder.splice(i, 1);
  //       this.dataSource.data=this.salesOrder;
  //       break;
  //     }
  //   }
  //   this.generateItemBFGSM();
  //   this.generateItemBFGMSSize();
  //   this.generateItemBF();
  // }
  // selectFromSelected(key, voucherKey) {
  //   this.salesOrder.push(key);
  //   for (var i = 0; i < this.salesOrder_selected.length; i++) {
  //     if (this.salesOrder_selected[i].id === voucherKey) {
  //       this.salesOrder_selected.splice(i, 1);
  //       break;
  //     }
  //   }
  //   this.generateItemBFGSM();
  //   this.generateItemBFGMSSize();
  //   this.generateItemBF();
  // }
  // convertReel(weight, size) {
  //   return ((weight * 1000) / (size * 10)).toFixed(3);
  // }
  // maskContent(item) {
  //   var reg = new RegExp('[0-9]+ (BF)', 'g');
  //   return reg.exec(item.toString())[0];
  // }
  // reel(weight, size) {
  //   var reel: any;
  //   reel = ((weight * 1000) / (size * 10));

  //   if (reel > Math.round(reel)) {
  //     return Math.round(reel);
  //   }
  //   else {
  //     return Math.ceil(reel);
  //   }

// }

}
