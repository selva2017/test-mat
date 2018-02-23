import { Component, OnInit, Input,ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { ProdPlan } from './../../shared/prod_plan';
import { SelectedOrdersComponent } from './../selected-orders/selected-orders.component';

@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.component.html',
  styleUrls: ['./sales-orders.component.css']
})
export class SalesOrdersComponent implements OnInit {
  // displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  displayedColumns = ['id', 'orderDate', 'orderNumber','company','bf', 'gsm',  'reel', 'size', 'voucherKey', 'weight','select'];
  // displayedColumns = ['bf', 'company', 'gsm', 'id', 'orderDate','reel','size','voucherKey','weight'];
  // dataSource = new MatTableDataSource<ProdPlan>();
  dataSource = new MatTableDataSource<ProdPlan>();
  dataSource2 = new MatTableDataSource<ProdPlan>();

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
    this.refreshList();
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
          break;
        case 1:
          !this.dataSource2.paginator ? this.dataSource2.paginator = this.paginator2 : null;
      }
    });
  }
  
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
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
  confirmProduction() {
    // this.salesOrderUpdated = true;
    // this.showAll = true;
    // this.serverService.completedOrders(this.salesOrder_selected)
    //   .subscribe(
    //   (success) => {
    //     console.log("success");
    //   },
    //   (error) => console.log(error)
    //   );
    // this.serverService.completedOrders(this.salesOrder_modified)
    //   .subscribe(
    //   (success) => {
    //     console.log("success");
    //   },
    //   (error) => console.log(error)
    //   );
    // this.salesOrderUpdated = false;
  }
  clearAll() {
    this.salesOrder_selected = [];
    this.salesOrder_selected1 = [];
    this.salesOrder_BFGSMSize = [];
    this.salesOrder_BFGSM = [];
    this.salesOrder_BF = [];
    this.salesOrder_modified = [];
    this.refreshList();
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
        this.dataSource.data=this.salesOrder;
        break;
      }
    }
    // this.dataSource2.data=this.salesOrder_selected;
    this.dataSource2.data=this.salesOrder_selected.slice();
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
    this.dataSource2.data=this.salesOrder_selected;
    this.dataSource.data=this.salesOrder;
    this.ngAfterViewInit();
    // this.dataSource2.data=this.salesOrder_selected.slice();
    // this.dataSource.data = this.salesOrder.slice();
    this.generateItemBFGSM();
    this.generateItemBFGMSSize();
    this.generateItemBF();
  }
  refreshList() {
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
//     this.refreshList();
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
//     this.refreshList();
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
//   refreshList() {
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

