import { DispatchDialogComponent } from './../sales-orders/dispatch-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';
import { ProdPlan } from './../../shared/prod_plan';
import { SalesOrdersPlanned } from '../../shared/sales-order-planned';
import { DispatchReport } from '../../shared/dispatch-report';

@Component({
  selector: 'app-planned',
  templateUrl: './planned.component.html',
  styleUrls: ['./planned.component.css']
})
export class PlannedComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;
  subscription: Subscription;
  dataSource_prodplans = new MatTableDataSource<SalesOrdersPlanned>();
  dataSource_dispatch = new MatTableDataSource<DispatchReport>();
  displayedColumns_planned = ['createdDate', 'batchNumber', 'details', 'reports', 'action'];
  displayedColumns_avail_sales_order = ['orderDate', 'orderNumber', 'company', 'bf', 'size', 'voucherKey', 'weight', 'newWeight', 'reel', 'reelInStock', 'action'];
  displayedColumns_modifyplandetails = ['orderDate', 'orderNumber', 'company', 'bf', 'size', 'voucherKey', 'weight', 'reel', 'reelInStock', 'update', 'delete'];
  displayedColumns_prod_plan_details = ['orderDate', 'orderNumber', 'company', 'bf', 'size', 'voucherKey', 'weight', 'reel', 'reelInStock'];
  displayedColumns_bf = ['bf', 'weight'];
  displayedColumns_bfgsm = ['bf', 'weight'];
  displayedColumns_bfgsmsize = ['bf', 'weight', 'reel', 'reelInStock'];
  displayedColumns_bfgsmsize_prod_plan = ['bf', 'weight', 'reel', 'reelInStock'];
  salesOrder_modified: ProdPlan[] = [];
  salesOrder_selected: ProdPlan[] = [];
  showLoader: boolean;
  // dataSource = new MatTableDataSource<ProdPlan>();

  salesOrder_BFGSM: ProdPlan[] = [];
  salesOrder_BFGSMSize: ProdPlan[] = [];
  salesOrder_BF: ProdPlan[] = [];
  salesOrdersPlanned: SalesOrdersPlanned[] = [];
  dataSource_BF = new MatTableDataSource<ProdPlan>();
  dataSource_BFGSM = new MatTableDataSource<ProdPlan>();
  dataSource_BFGSMSize = new MatTableDataSource<ProdPlan>();
  dispatchSalesOrders: DispatchReport[] = [];
  dispatchSalesOrders_dialog: DispatchReport[] = [];
  dispatchHeader: string;
  batch_number = "";
  dataSource_delete = new MatTableDataSource<ProdPlan>();
  dataSource_avail_so_pp = new MatTableDataSource<ProdPlan>();
  salesOrder: ProdPlan[];
  salesOrderSource: ProdPlan[] = [];
  salesOrdersPlanned_row1: SalesOrdersPlanned[] = [];
  prodution_plan_details_selected_main: boolean = true;
  prodution_plan_details_selected_details: boolean = false;
  prodution_plan_details_selected_right: boolean = false;
  modifyProductionPlan_main: boolean = true;
  // showDispatchReport: boolean = false;
  showAllSalesOrders: boolean = true;
  showSelectedOrders: boolean = false;
  modifyProductionPlan_right: boolean = false;
  modifyProductionPlan_details: boolean = false;

  constructor(private serverService: ServerService, private dialog: MatDialog) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.showLoader = true;
    this.onViewProductionPlans();
  }
  // ngAfterViewChecked(){
  //   console.log("ngAfterViewChecked");
  // this.showLoader = true;
  // }
  ngAfterViewInit() {
    // this.showLoader = true;
    // this.onViewProductionPlans();
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.dataSource_avail_so_pp.sort = this.sort;
    this.dataSource_avail_so_pp.paginator = this.paginator5;
  }

  doFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // setDataSource(indexNumber) {
  //   setTimeout(() => {
  //     // !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
  //   });
  // }

  showPlansInProduction(show_tables: boolean) {
    // console.log("Restore Sales Orders");
    if (show_tables == true) {
      this.showLoader = true;
      this.salesOrdersPlanned = [];
      this.onViewProductionPlans();
      this.dataSource_prodplans.data = this.salesOrdersPlanned;
      // this.showReelInStock_prod_plan = true;
      this.prodution_plan_details_selected_main = true;
      this.prodution_plan_details_selected_details = false;
      this.prodution_plan_details_selected_right = false;
      this.modifyProductionPlan_main = false;
      this.modifyProductionPlan_details = false;
      this.modifyProductionPlan_right = false;
      this.showSelectedOrders = false;
      this.showAllSalesOrders = false;
    }

    if (show_tables == false) {
      // this.showLoader = true;
      // this.salesOrdersPlanned = [];
      // this.onViewProductionPlans();
      // this.dataSource.data = this.salesOrdersPlanned;
      // this.showReelInStock_prod_plan = true;
      this.prodution_plan_details_selected_main = false;
      this.prodution_plan_details_selected_details = false;
      this.prodution_plan_details_selected_right = false;
      this.modifyProductionPlan_main = false;
      this.modifyProductionPlan_details = false;
      this.modifyProductionPlan_right = false;
      this.showSelectedOrders = false;
      this.showAllSalesOrders = false;
      this.dataSource_BF.data = [];
      // this.salesOrder_BFGSM = [];
      this.dataSource_BFGSM.data = [];
      // this.salesOrder_BFGSMSize = [];
      this.dataSource_BFGSMSize.data = [];
    }

  }
  onViewProductionPlans() {
    this.salesOrdersPlanned = [];
    this.subscription = this.serverService.getSalesOrdersPlanned().
      subscribe(list => {
        this.salesOrdersPlanned = list;
        !this.dataSource_prodplans.paginator ? this.dataSource_prodplans.paginator = this.paginator : null;
        this.dataSource_prodplans.data = this.salesOrdersPlanned;
        // console.log(this.salesOrdersPlanned);
        this.showLoader = false;
      })
    this.showLoader = false;
  }
  onViewProductionReport(record1, record2, record3, record4) {
    this.prodution_plan_details_selected_main = false;
    this.prodution_plan_details_selected_details = true;
    this.prodution_plan_details_selected_right = true;
    this.modifyProductionPlan_details = false;
    this.modifyProductionPlan_right = false;
    this.showAllSalesOrders = false;
    this.showSelectedOrders = false;

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
  onViewDispatchReport(batch_number, createdDate) {
    this.batch_number = batch_number;
    this.dispatchHeader = "Production Planned Date : " + createdDate + "     Batch No : " + batch_number;
    // this.showConsolidatedReports = true;
    this.subscription = this.serverService.getSalesOrdersDispatch(batch_number).
      subscribe(list => {
        this.dispatchSalesOrders = list;
        this.dataSource_dispatch.data = this.dispatchSalesOrders;
        // console.log(JSON.stringify(list));
        this.onClickView(list);
        // console.log(this.dispatchSalesOrders);
        // this.showLoader = false;
      })
  }
  onClickView(record: DispatchReport[]) {
    // this.salesOrder_row = record;
    // this.dispatchSalesOrders_dialog = record;
    const dialogRef = this.dialog.open(DispatchDialogComponent, {
      // height: '90%',
      // width: '60%',
      height: "640px",
      width: '"640px"',
      data: {
        progress: record, header: this.dispatchHeader
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("true");
      } else {
        console.log("false");
      }
    });

  }

  // onModifyPlannedReports(record1, record2, record3, record4, createdDate, batch_number) {
  //   this.prodution_plan_details_selected_main = false;
  //   this.modifyProductionPlan_details = true;
  //   this.modifyProductionPlan_right = true;
  //   this.batch_number = batch_number;
  //   this.dispatchHeader = "Production Planned Date : " + createdDate + "     Batch No : " + batch_number;

  //   this.salesOrdersPlanned_row1 = [];
  //   this.salesOrdersPlanned_row1 = record1;
  //   this.dataSource_prodplans.data = [];
  //   this.dataSource_prodplans.data = this.salesOrdersPlanned_row1;

  //   this.salesOrder_BF = [];
  //   this.salesOrder_BF = record2;
  //   this.dataSource_BF.data = [];
  //   this.dataSource_BF.data = this.salesOrder_BF;
  //   // console.log(this.salesOrder_BF);
  //   this.salesOrder_BFGSM = [];
  //   this.salesOrder_BFGSM = record3;
  //   this.dataSource_BFGSM.data = [];
  //   this.dataSource_BFGSM.data = this.salesOrder_BFGSM;
  //   // console.log(this.salesOrder_BFGSM);
  //   this.salesOrder_BFGSMSize = [];
  //   this.salesOrder_BFGSMSize = record4;
  //   this.dataSource_BFGSMSize.data = [];
  //   this.dataSource_BFGSMSize.data = this.salesOrder_BFGSMSize;
  // }
  onModifyPlannedReports(record1, record2, record3, record4, createdDate, batch_number) {
    this.refreshActiveList();
    // console.log(record1);
    // console.log(record2);
    // console.log(record3);
    // console.log(record4);
    this.prodution_plan_details_selected_main = false;
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
  onDeleteProductionPlanItem(row) {
    this.showLoader = true;
    // this.modifyProductionPlan_main = true;
    this.modifyProductionPlan_details = false;
    this.modifyProductionPlan_right = false;
    this.serverService.deleteProductionPlanItem(row.id, row.salesOrderPlannedId, row.altered, row.weight)
      .subscribe(
      (success) => {
        this.refreshActiveList();
        this.onEditProductionPlans();
        this.prodution_plan_details_selected_main = true;
        this.prodution_plan_details_selected_details = false;
        this.prodution_plan_details_selected_right = false;
        this.showLoader = false;
      },
      (error) => console.log(error)
      );
    this.showLoader = false;
  }
  onEditProductionPlans() {
    this.salesOrdersPlanned = [];

    this.subscription = this.serverService.getSalesOrdersPlanned().
      subscribe(list => {
        this.salesOrdersPlanned = list;
        this.dataSource_prodplans.data = this.salesOrdersPlanned;
        // console.log(this.salesOrdersPlanned);
        this.showLoader = false;
      })
    this.showLoader = false;
  }
  refreshActiveList() {

    this.salesOrder = [];
    this.salesOrderSource = [];
    this.subscription = this.serverService.getActiveSalesOrders().
      subscribe(list => {
        // this.dataSource.data = list;
        this.salesOrder = list;
        this.salesOrderSource = this.salesOrder.map(x => Object.assign({}, x));
        // this.dataSource.data = this.salesOrder.slice();
        // console.log(this.dataSource.data);
        // this.dataSource.data = this.salesOrder;
        !this.dataSource_avail_so_pp.paginator ? this.dataSource_avail_so_pp.paginator = this.paginator5 : null;
        this.dataSource_delete.data = this.salesOrder;
        this.dataSource_avail_so_pp.data = this.salesOrder;
        this.showLoader = false;
      })
    this.showLoader = false;
  }
  onAddItemToExistingProductionPlan(key, voucherKey) {
    this.showLoader = true;
    this.salesOrder_selected = [];
    // this.modifyProductionPlan_main = true;
    this.modifyProductionPlan_details = false;
    // this.modifyProductionPlan_right = false;
    // console.log("inside");
    var newWeight = key.newWeight;
    console.log(key, voucherKey);
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
    console.log(this.salesOrder_selected)
    // this.generateItemBFGSM();
    // this.generateItemBFGMSSize();
    // this.generateItemBF();
    this.serverService.addItemToExistingProductionPlan(this.salesOrder_selected, this.batch_number)
      .subscribe(
      (success) => {
        console.log("success");
        this.refreshActiveList();
        this.onEditProductionPlans();
        this.showLoader = false;
      },
      (error) => console.log(error)
      );
    this.showLoader = false;
    // this.clearAll();
    this.prodution_plan_details_selected_main = true;
    this.modifyProductionPlan_right = false;
    this.prodution_plan_details_selected_details = false;
    this.prodution_plan_details_selected_right = false;
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
  updatePlannedSalesOrder(row, id, reel, reel_in_stock, weight) {
    this.showLoader = true;
    (reel == "" || reel == null) ? reel = 0 : reel = reel;
    (reel_in_stock == "" || reel_in_stock == null) ? reel_in_stock = 0 : reel_in_stock = reel_in_stock;
    (weight == "" || weight == null) ? weight = 0 : weight = weight;

    console.log(reel);
    console.log(reel_in_stock);
    console.log(weight);
    this.serverService.updateProductionPlanItem_Weight_Reel_RIS(id, reel, reel_in_stock, weight)
      .subscribe(
      // (res: Daybook) => console.log(res),
      (success) => {
        // console.log("success");
        this.onViewProductionPlans();
        // this.refreshActiveList();
        this.prodution_plan_details_selected_main = true;
        this.modifyProductionPlan_details = false;
        this.prodution_plan_details_selected_details = false;
        this.prodution_plan_details_selected_right = false;
      },
      (error) => console.log(error)
      );
    this.showLoader = false;
  }
}
