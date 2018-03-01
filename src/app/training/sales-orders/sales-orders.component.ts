import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { ProdPlan } from './../../shared/prod_plan';
import { SelectedOrdersComponent } from './../selected-orders/selected-orders.component';
import { SalesOrdersPlanned } from '../../shared/sales-order-planned';
import { DispatchReport } from '../../shared/dispatch-report';

@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.component.html',
  styleUrls: ['./sales-orders.component.css']
})
export class SalesOrdersComponent implements OnInit {
  // displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  displayedColumns = ['id', 'orderDate', 'orderNumber', 'company', 'bf', 'size', 'weight', 'reel', 'select'];
  // displayedColumns = ['id', 'orderDate', 'orderNumber', 'company', 'bf', 'gsm', 'size', 'weight', 'reel', 'select'];
  displayedColumns_selected = ['id', 'orderDate', 'orderNumber', 'company', 'bf', 'size', 'weight', 'reel', 'reelInStock', 'select'];
  // displayedColumns_selected = ['id', 'orderDate', 'orderNumber', 'company', 'bf', 'gsm', 'size', 'weight', 'reel', 'reelInStock', 'select'];
  displayedColumns_restore = ['id', 'orderDate', 'orderNumber', 'company', 'bf', 'size', 'weight', 'select'];
  // displayedColumns_restore = ['id', 'orderDate', 'orderNumber', 'company', 'bf', 'gsm', 'size', 'weight', 'select'];
  displayedColumns_bf = ['bf', 'weight'];
  displayedColumns_bfgsm = ['bf', 'weight'];
  // displayedColumns_bfgsm = ['bf', 'gsm', 'weight'];
  displayedColumns_bfgsmsize = ['bf', 'weight', 'reel'];
  // displayedColumns_bfgsmsize = ['bf', 'gsm', 'size', 'weight', 'reel'];
  displayedColumns_bfgsmsize_prod_plan = ['bf', 'weight', 'reel', 'reelInStock'];
  // displayedColumns_bfgsmsize_prod_plan = ['bf', 'gsm', 'size', 'weight', 'reel', 'reelInStock'];
  displayedColumns_planned = ['createdDate', 'batchNumber', 'details', 'reports'];
  displayedColumns_modifyplan = ['createdDate', 'batchNumber', 'action'];
  displayedColumns_prod_plan_details = ['id', 'orderDate', 'orderNumber', 'company', 'bf', 'size', 'weight', 'reel', 'reelInStock', 'action'];
  // displayedColumns_prod_plan_details = ['id', 'orderDate', 'orderNumber', 'company', 'bf', 'gsm', 'size', 'weight', 'reel', 'reelInStock', 'action'];
  // displayedColumns = ['bf', 'company', 'gsm', 'id', 'orderDate','reel','size','voucherKey','weight'];
  // dataSource = new MatTableDataSource<ProdPlan>();
  dataSource = new MatTableDataSource<ProdPlan>();
  dataSource2 = new MatTableDataSource<ProdPlan>();
  dataSource_BF = new MatTableDataSource<ProdPlan>();
  dataSource_BFGSM = new MatTableDataSource<ProdPlan>();
  dataSource_BFGSMSize = new MatTableDataSource<ProdPlan>();
  dataSource_restore = new MatTableDataSource<ProdPlan>();
  dataSource_prodplans = new MatTableDataSource<SalesOrdersPlanned>();
  dataSource_dispatch = new MatTableDataSource<DispatchReport>();

  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table1') table1: MatSort;
  @ViewChild('table2') table2: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  // childMessage="Test";
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
  salesOrderRestore: ProdPlan[] = [];
  salesOrdersPlanned: SalesOrdersPlanned[] = [];
  salesOrdersPlanned_row1: SalesOrdersPlanned[] = [];
  prodution_plan_details_selected_main: boolean = true;
  prodution_plan_details_selected_details: boolean = false;
  prodution_plan_details_selected_right: boolean = false;
  showReelInStock_prod_plan: boolean = false;
  dispatchSalesOrders: DispatchReport[] = [];
  dispatchHeader: string;
  batch_number = "";
  modifyProductionPlan_main: boolean = true;
  showDispatchReport: boolean = false;
  showAllSalesOrders: boolean = true;
  showSelectedOrders: boolean = false;
  modifyProductionPlan_right: boolean = false;
  modifyProductionPlan_details: boolean = false;
  // Working 1
  // parentMessage = "message from parent";
  // @ViewChild(SelectedOrdersComponent) child;
  // message:string;


  // Working 2
  // @Input() childMessage: string;
  // message: string = "Hola Mundo!";

  // @Input() childMessage: string;
  //  message: ProdPlan[];
  // message: string = "SAles Order Component";

  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }
  ngOnInit() {
    this.refreshActiveList();
    this.refreshInActiveList();
    this.onViewProductionPlans();
  }
  ngAfterViewInit() {
    // working 1
    // this.message = this.child.message;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.dataSource2.sort = this.sort;
    this.dataSource2.sort = this.table2;
    this.dataSource2.paginator = this.paginator2;
  }

  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
          this.showAllSalesOrders = true;
          break;
        case 1:
          !this.dataSource2.paginator ? this.dataSource2.paginator = this.paginator2 : null;
          this.showAllSalesOrders = false;
          this.showSelectedOrders = true;
          break;
        case 2:
          this.showAllSalesOrders = false;
          this.showSelectedOrders = false;
          break;
        case 3:
          this.showAllSalesOrders = false;
          this.showSelectedOrders = false;
        case 4:
          this.dataSource_prodplans.data = this.salesOrdersPlanned;
          this.showReelInStock_prod_plan = true;
          this.prodution_plan_details_selected_main = true;
          this.prodution_plan_details_selected_details = false;
          this.prodution_plan_details_selected_right = false;
          this.modifyProductionPlan_right = false;
          this.modifyProductionPlan_main = false;
          case 5:
          this.dataSource_prodplans.data = this.salesOrdersPlanned;
          this.prodution_plan_details_selected_right = false;
          this.modifyProductionPlan_main = true;
          this.modifyProductionPlan_details = false;
          this.modifyProductionPlan_right = false;
      }
    });
  }
  showReel() {
    // console.log(this.salesOrder);
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }
  onViewProductionReportModel(record1, record2, record3, record4) {
    this.prodution_plan_details_selected_main = false;
    this.prodution_plan_details_selected_details = true;
    this.prodution_plan_details_selected_right = true;
    this.showAllSalesOrders=false;
    this.showSelectedOrders=false;
    this.showReelInStock_prod_plan = true;
    // console.log(record1);
    // console.log(record2);
    // console.log(record3);
    // console.log(record4);
    this.salesOrdersPlanned_row1 = [];
    this.salesOrdersPlanned_row1 = record1;
    this.dataSource_prodplans.data = [];
    this.dataSource_prodplans.data = this.salesOrdersPlanned_row1;
    this.salesOrder_BF = [];
    this.salesOrder_BF = record2;
    this.dataSource_BF.data = [];
    this.dataSource_BF.data = this.salesOrder_BF;
    this.salesOrder_BFGSM = [];
    this.salesOrder_BFGSM = record3;
    this.dataSource_BFGSM.data = [];
    this.dataSource_BFGSM.data = this.salesOrder_BFGSM;
    this.salesOrder_BFGSMSize = [];
    this.salesOrder_BFGSMSize = record4;
    this.dataSource_BFGSMSize.data = [];
    this.dataSource_BFGSMSize.data = this.salesOrder_BFGSMSize;
  }
  onViewDispatchModel(batch_number, createdDate) {
    this.showDispatchReport = true
    this.prodution_plan_details_selected_main = false
    this.batch_number = batch_number;
    this.dispatchHeader = "Production Planned Date : " + createdDate + "     Batch No : " + batch_number;
    // this.showConsolidatedReports = true;
    this.subscription = this.serverService.getSalesOrdersDispatch(batch_number).
      subscribe(list => {
        this.dispatchSalesOrders = list;
        this.dataSource_dispatch.data = this.dispatchSalesOrders;
        // console.log(list);
        // console.log(this.dispatchSalesOrders);
        // this.showLoader = false;
      })
  }

  onModifyPlannedReports(record1, record2, record3, record4, createdDate, batch_number) {
    this.modifyProductionPlan_main = false;
    this.modifyProductionPlan_details = true;
    this.modifyProductionPlan_right = true;
    this.batch_number = batch_number;
    this.dispatchHeader = "Production Planned Date : " + createdDate + "     Batch No : " + batch_number;

    // this.modifyProductionPlan = false;
    this.salesOrdersPlanned_row1 = [];
    this.salesOrdersPlanned_row1 = record1;
    this.dataSource_prodplans.data = [];
    this.dataSource_prodplans.data = this.salesOrdersPlanned_row1;
    // console.log(this.salesOrdersPlanned_row1);
    this.salesOrder_BF = [];
    this.salesOrder_BF = record2;
    this.dataSource_BF.data = [];
    this.dataSource_BF.data = this.salesOrder_BF;
    // console.log(this.salesOrder_BF);
    this.salesOrder_BFGSM = [];
    this.salesOrder_BFGSM = record3;
    this.dataSource_BFGSM.data = [];
    this.dataSource_BFGSM.data = this.salesOrder_BFGSM;
    // console.log(this.salesOrder_BFGSM);
    this.salesOrder_BFGSMSize = [];
    this.salesOrder_BFGSMSize = record4;
    this.dataSource_BFGSMSize.data = [];
    this.dataSource_BFGSMSize.data = this.salesOrder_BFGSMSize;
  }

  onClickView(record) {
    this.salesOrder_row = record;
  }
  showSelected() {
    this.showAll = !this.showAll;
    // console.log(this.showAll);
    // this.dataSource2.data=this.salesOrder_selected;
    // this.message=this.salesOrder_selected;
  }
  updatePlannedSalesOrder(id, reel) {
    // console.log(id,reel);
    this.serverService.updateProductionPlanItemReel(id, reel)
      .subscribe(
      // (res: Daybook) => console.log(res),
      (success) => {
        // console.log("success");
        this.onViewProductionPlans();
        // this.refreshActiveList();
      },
      (error) => console.log(error)
      );

  }

  confirmProduction() {
    // console.log(this.salesOrder_selected);
    this.serverService.createProductionPlan(this.salesOrder_selected)
      .subscribe(
      (success) => {
        console.log("success");
        this.clearAll();
      },
      (error) => console.log(error)
      );
  }
  onAddItemToExistingProductionPlan(key, voucherKey, newWeight) {
    console.log(key, voucherKey, newWeight);
    console.log(this.batch_number);
    // this.showConsolidatedReports = false;
    key["altered"] = 0;
    if (newWeight > 0) {
      var wt = Number(key["weight"]) - Number(newWeight);
      key.weight = Number(newWeight);
      key["altered"] = 1;
      key["newWeight"] = wt;
      key['reel'] = this.reel(newWeight, key['size']);
      this.salesOrder_modified.push(key);
    }
    this.salesOrder_selected.push(key);
    for (var i = 0; i < this.salesOrder.length; i++) {
      if (this.salesOrder[i].id === voucherKey) {
        this.salesOrder.splice(i, 1);
        break;
      }
    }
    // this.generateItemBFGSM();
    // this.generateItemBFGMSSize();
    // this.generateItemBF();

    this.serverService.addItemToExistingProductionPlan(this.salesOrder_selected, this.batch_number)
      .subscribe(
      (success) => {
        console.log("success");
        this.refreshActiveList();
        this.onEditProductionPlans();
      },
      (error) => console.log(error)
      );
    // this.clearAll();
  }
  onEditProductionPlans() {
    this.salesOrdersPlanned = [];

    this.subscription = this.serverService.getSalesOrdersPlanned().
      subscribe(list => {
        this.salesOrdersPlanned = list;
        this.dataSource_prodplans.data = this.salesOrdersPlanned;
        // console.log(this.salesOrdersPlanned);
        // this.showLoader = false;
      })
  }

  clearAll() {
    this.salesOrder_selected = [];
    this.salesOrder_selected1 = [];
    this.salesOrder_BFGSMSize = [];
    this.salesOrder_BFGSM = [];
    this.salesOrder_BF = [];
    this.salesOrder_modified = [];
    this.refreshActiveList();
    this.dataSource2.data = this.salesOrder_selected;
    this.showAll = true;
  }
  extractModified() {
    for (var i = 0; i < this.salesOrder_selected.length; i++) {
      for (var j = 0; j < this.salesOrder_modified.length; j++) {
        if (this.salesOrder_selected[i].voucherKey === this.salesOrder_modified[j].voucherKey) {
          this.salesOrder_selected.splice(i, 1);
        }
      }
    }
  }
  generateItemBFGSM() {
    this.salesOrder_BFGSM = [];
    this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
    if (this.salesOrder_selected1.length >= 1) {
      for (var i = 0; i < this.salesOrder_selected1.length; i++) {
        var match: boolean = false;
        for (var j = 0; j < this.salesOrder_BFGSM.length; j++) {
          if ((this.salesOrder_BFGSM[j].bf + "" + this.salesOrder_BFGSM[j].gsm) === (this.salesOrder_selected1[i].bf + "" + this.salesOrder_selected1[i].gsm)) {
            var sum = Number(Number(this.salesOrder_BFGSM[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
            this.salesOrder_BFGSM[j].weight = parseFloat(sum);
            match = true;
            break;
          }
        }
        if (!match) {
          this.salesOrder_BFGSM.push(this.salesOrder_selected1[i]);
        }

      }
    }
    this.dataSource_BFGSM.data = this.salesOrder_BFGSM;
  }
  generateItemBFGMSSize() {
    this.salesOrder_BFGSMSize = [];
    this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
    if (this.salesOrder_selected1.length >= 1) {
      for (var i = 0; i < this.salesOrder_selected1.length; i++) {
        var match: boolean = false;
        for (var j = 0; j < this.salesOrder_BFGSMSize.length; j++) {
          if (((this.salesOrder_BFGSMSize[j].bf + "" + this.salesOrder_BFGSMSize[j].gsm).concat(String(this.salesOrder_BFGSMSize[j].size))).trim() === ((this.salesOrder_selected1[i].bf + "" + this.salesOrder_selected1[i].gsm).concat(String(this.salesOrder_selected1[i].size))).trim()) {
            var sum = Number(Number(this.salesOrder_BFGSMSize[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
            this.salesOrder_BFGSMSize[j].weight = parseFloat(sum)
            match = true;
            break;
          }
        }
        if (!match) {
          this.salesOrder_BFGSMSize.push(this.salesOrder_selected1[i]);
        }
      }
    }
    this.dataSource_BFGSMSize.data = this.salesOrder_BFGSMSize;
  }
  generateItemBF() {
    this.salesOrder_BF = [];
    var result;
    this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
    if (this.salesOrder_selected1.length >= 1) {
      for (var i = 0; i < this.salesOrder_selected1.length; i++) {
        var match: boolean = false;
        for (var j = 0; j < this.salesOrder_BF.length; j++) {
          var item = this.salesOrder_selected1[i].bf;
          if ((this.salesOrder_BF[j].bf) === this.salesOrder_selected1[i].bf) {
            var sum = Number(Number(this.salesOrder_BF[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
            this.salesOrder_BF[j].weight = parseFloat(sum);
            match = true;
            break;
          }
        }
        if (!match) {
          this.salesOrder_BF.push(this.salesOrder_selected1[i]);
        }
      }
    }
    // console.log(this.salesOrder_BF);
    this.dataSource_BF.data = this.salesOrder_BF;
  }

  // selectFromAll(key, voucherKey, newQuantity) {
  selectFromAll(key, id) {
    // console.log(key);
    // if (newQuantity > 0) {
    //   key.weight = Number(newQuantity);
    //   this.salesOrder_modified.push(key);
    // }
    this.salesOrder_selected.push(key);
    for (var i = 0; i < this.salesOrder.length; i++) {
      if (this.salesOrder[i].id === id) {
        this.salesOrder.splice(i, 1);
        this.dataSource.data = this.salesOrder;
        break;
      }
    }
    // this.dataSource2.data=this.salesOrder_selected;
    this.dataSource2.data = this.salesOrder_selected.slice();
    // this.dataSource.data = this.salesOrder.slice();
    this.generateItemBFGSM();
    this.generateItemBFGMSSize();
    this.generateItemBF();
  }
  selectFromSelected(key, voucherKey) {
    this.salesOrder.push(key);
    for (var i = 0; i < this.salesOrder_selected.length; i++) {
      if (this.salesOrder_selected[i].id === voucherKey) {
        this.salesOrder_selected.splice(i, 1);
        break;
      }
    }
    this.dataSource2.data = this.salesOrder_selected;
    this.dataSource.data = this.salesOrder;
    this.ngAfterViewInit();
    // this.dataSource2.data=this.salesOrder_selected.slice();
    // this.dataSource.data = this.salesOrder.slice();
    this.generateItemBFGSM();
    this.generateItemBFGMSSize();
    this.generateItemBF();
  }
  refreshActiveList() {
    this.subscription = this.serverService.getActiveSalesOrders().
      subscribe(list => {
        // this.dataSource.data = list;
        this.salesOrder = list;
        this.showLoader = false;
        this.dataSource.data = list;
        // this.dataSource.data = this.salesOrder.slice();
        // console.log(this.dataSource.data);
      })
    this.showLoader = false;
  }
  onDeleteSalesOrders() {
    this.refreshActiveList();
  }
  deleteSalesOrder(id) {
    // this.showLoader=true;
    this.serverService.removeSalesOrderStatus(id)
      .subscribe(
      (success) => {
        this.refreshActiveList();
      },
      (error) => console.log(error)
      );
  }

  restoreSalesOrder(id) {
    this.showLoader = true;
    this.serverService.restoreSalesOrderStatus(id)
      .subscribe(
      (success) => {
        this.refreshInActiveList();
      },
      (error) => console.log(error)
      );
  }
  refreshInActiveList() {
    this.salesOrderRestore = [];
    // this.showLoader = true;
    this.subscription = this.serverService.getInActiveSalesOrders().
      subscribe(list => {
        this.salesOrderRestore = list;
        // console.log(this.salesOrderRestore);
        this.showLoader = false;
        this.dataSource_restore.data = list;
      })
    // this.showLoader = false;
  }

  onViewProductionPlans() {
    this.subscription = this.serverService.getSalesOrdersPlanned().
      subscribe(list => {
        this.salesOrdersPlanned = list;
        this.dataSource_prodplans.data = this.salesOrdersPlanned;
        // console.log(this.salesOrdersPlanned);
        // this.showLoader = false;
      })
  }

  convertReel(weight, size) {
    return ((weight * 1000) / (size * 10)).toFixed(3);
  }
  maskContent(item) {
    var reg = new RegExp('[0-9]+ (BF)', 'g');
    return reg.exec(item.toString())[0];
  }
  reel(weight, size) {
    var reel: any;
    reel = ((weight * 1000) / (size * 10));

    if (reel > Math.round(reel)) {
      return Math.round(reel);
    }
    else {
      return Math.ceil(reel);
    }

  }
}


// import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';

// import { ServerService } from './../../shared/server.service';
// import { ProdPlan } from './../../shared/prod_plan';

// @Component({
//   selector: 'app-sales-orders',
//   templateUrl: './sales-orders.component.html',
//   styleUrls: ['./sales-orders.component.css']
// })
// export class SalesOrdersComponent implements OnInit {

//   subscription: Subscription;
//   salesOrder: ProdPlan[];
//   salesOrder_selected: ProdPlan[] = [];
//   salesOrder_selected1: ProdPlan[] = [];
//   salesOrder_row: ProdPlan[] = [];
//   salesOrder_modified: ProdPlan[] = [];
//   showLoader: boolean;
//   showAll: boolean = true;
//   salesOrderUpdated: boolean = false;
//   salesOrder_BFGSM: ProdPlan[] = [];
//   salesOrder_BFGSMSize: ProdPlan[] = [];
//   salesOrder_BF: ProdPlan[] = [];
//   constructor(private serverService: ServerService) {
//     this.showLoader = true;
//   }

//   ngOnInit() {
//     this.refreshActiveList();
//   }
//   displayINR(amount: number) {
//     return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
//   }

//   onClickView(record) {
//     this.salesOrder_row = record;
//   }
//   showSelected() {
//     this.showAll = !this.showAll;
//   }
//   confirmProduction() {
//     this.salesOrderUpdated = true;
//     this.showAll = true;
//       this.serverService.completedOrders(this.salesOrder_selected)
//       .subscribe(
//         (success) => {
//           console.log("success");
//         },
//         (error) => console.log(error)
//       );
//       this.serverService.completedOrders(this.salesOrder_modified)
//       .subscribe(
//         (success) => {
//           console.log("success");
//         },
//         (error) => console.log(error)
//       );
//       this.salesOrderUpdated = false;
//     }
//   clearAll() {
//     this.salesOrder_selected = [];
//     this.salesOrder_selected1 = [];
//     this.salesOrder_BFGSMSize = [];
//     this.salesOrder_BFGSM = [];
//     this.salesOrder_BF = [];
//     this.salesOrder_modified = [];
//     this.refreshActiveList();
//     this.showAll = true;
//   }
//   extractModified() {
//     for (var i = 0; i < this.salesOrder_selected.length; i++) {
//       for (var j = 0; j < this.salesOrder_modified.length; j++) {
//         if (this.salesOrder_selected[i].voucherKey === this.salesOrder_modified[j].voucherKey) {
//           this.salesOrder_selected.splice(i, 1);
//         }
//       }
//     }
//   }
//   generateItemBFGSM() {
//     this.salesOrder_BFGSM = [];
//     this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
//     if (this.salesOrder_selected1.length >= 1) {
//       for (var i = 0; i < this.salesOrder_selected1.length; i++) {
//         var match: boolean = false;
//         for (var j = 0; j < this.salesOrder_BFGSM.length; j++) {
//           if ((this.salesOrder_BFGSM[j].bf+""+this.salesOrder_BFGSM[j].gsm) === (this.salesOrder_selected1[i].bf+""+this.salesOrder_selected1[i].gsm)) {
//             var sum = Number(Number(this.salesOrder_BFGSM[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
//             this.salesOrder_BFGSM[j].weight = parseFloat(sum);
//             match = true;
//             break;
//           }
//         }
//         if (!match) {
//           this.salesOrder_BFGSM.push(this.salesOrder_selected1[i]);
//         }

//       }
//     }
//   }
//   generateItemBFGMSSize() {
//     this.salesOrder_BFGSMSize = [];
//     this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
//     if (this.salesOrder_selected1.length >= 1) {
//       for (var i = 0; i < this.salesOrder_selected1.length; i++) {
//         var match: boolean = false;
//         for (var j = 0; j < this.salesOrder_BFGSMSize.length; j++) {
//           if (((this.salesOrder_BFGSMSize[j].bf+""+this.salesOrder_BFGSMSize[j].gsm).concat(String(this.salesOrder_BFGSMSize[j].size))).trim() === ((this.salesOrder_selected1[i].bf+""+this.salesOrder_selected1[i].gsm).concat(String(this.salesOrder_selected1[i].size))).trim()) {
//             var sum = Number(Number(this.salesOrder_BFGSMSize[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
//             this.salesOrder_BFGSMSize[j].weight = parseFloat(sum)
//             match = true;
//             break;
//           }
//         }
//         if (!match) {
//           this.salesOrder_BFGSMSize.push(this.salesOrder_selected1[i]);
//         }
//       }
//     }
//   }
//   generateItemBF() {
//     this.salesOrder_BF = [];
//     var result;
//     this.salesOrder_selected1 = this.salesOrder_selected.map(x => Object.assign({}, x));
//     if (this.salesOrder_selected1.length >= 1) {
//       for (var i = 0; i < this.salesOrder_selected1.length; i++) {
//         var match: boolean = false;
//         for (var j = 0; j < this.salesOrder_BF.length; j++) {
//           var item = this.salesOrder_selected1[i].bf;
//           if ((this.salesOrder_BF[j].bf) === this.salesOrder_selected1[i].bf) {
//             var sum = Number(Number(this.salesOrder_BF[j].weight) + Number(this.salesOrder_selected1[i].weight)).toFixed(2);
//             this.salesOrder_BF[j].weight = parseFloat(sum);
//             match = true;
//             break;
//           }
//         }
//         if (!match) {
//           this.salesOrder_BF.push(this.salesOrder_selected1[i]);
//         }
//       }
//     }
//   }

//   selectFromAll(key, voucherKey, newQuantity) {
//     if (newQuantity > 0) {
//       key.weight = Number(newQuantity);
//       this.salesOrder_modified.push(key);
//     }
//     this.salesOrder_selected.push(key);
//     for (var i = 0; i < this.salesOrder.length; i++) {
//       if (this.salesOrder[i].id === voucherKey) {
//         this.salesOrder.splice(i, 1);
//         break;
//       }
//     }
//     this.generateItemBFGSM();
//     this.generateItemBFGMSSize();
//     this.generateItemBF();
//   }
//   selectFromSelected(key, voucherKey) {
//     this.salesOrder.push(key);
//     for (var i = 0; i < this.salesOrder_selected.length; i++) {
//       if (this.salesOrder_selected[i].id === voucherKey) {
//         this.salesOrder_selected.splice(i, 1);
//         break;
//       }
//     }
//     this.generateItemBFGSM();
//     this.generateItemBFGMSSize();
//     this.generateItemBF();
//   }
//   refreshActiveList() {
//     this.subscription = this.serverService.getSalesOrder().
//       subscribe(list => {
//         this.salesOrder = list;
//         this.showLoader = false;
//       })
//     this.showLoader = false;
//   }
//   convertReel(weight, size) {
//     return ((weight * 1000) / (size * 10)).toFixed(3);
//   }
//   maskContent(item) {
//     var reg = new RegExp('[0-9]+ (BF)', 'g');
//     return reg.exec(item.toString())[0];
//   }
//   reel(weight, size) {
//     var reel: any;
//     reel = ((weight * 1000) / (size * 10));

//     if (reel > Math.round(reel)) {
//       return Math.round(reel);
//     }
//     else {
//       return Math.ceil(reel);
//     }

//   }
// }

