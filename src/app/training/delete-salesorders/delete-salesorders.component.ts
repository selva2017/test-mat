import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';
import { ProdPlan } from './../../shared/prod_plan';

@Component({
  selector: 'app-delete-salesorders',
  templateUrl: './delete-salesorders.component.html',
  styleUrls: ['./delete-salesorders.component.css']
})
export class DeleteSalesordersComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription;
  displayedColumns = ['orderDate', 'orderNumber', 'company', 'bf', 'size', 'voucherKey', 'weight', 'reel', 'select'];
  salesOrder: ProdPlan[];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<ProdPlan>();
  // dataSource = new MatTableDataSource<Receipts[]>();
  showLoader: boolean;


  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }

  ngOnInit() {
    // this.refreshActiveList();
    // this.showLoader = true;
    // this.refreshActiveList();
  }

  ngAfterViewInit() {
    this.showLoader = true;
    this.refreshActiveList();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  _setDataSource(indexNumber) {
    setTimeout(() => {
      !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
    });
  }

  refreshActiveList() {
    this.salesOrder = [];
    this.subscription = this.serverService.getActiveSalesOrders().
      subscribe(list => {
        this.salesOrder = list;
        // !this.dataSource_delete.paginator ? this.dataSource_delete.paginator = this.paginator1 : null;
        this.dataSource.data = this.salesOrder;
        this.showLoader = false;
      })
    this.showLoader = false;
  }
  deleteSalesOrder(id) {
    this.salesOrder = [];
    this.showLoader = true;
    this.serverService.removeSalesOrderStatus(id)
      .subscribe(
      (success) => {
        this.refreshActiveList();
        // this.dataSource_delete.data = this.salesOrder;
        this.dataSource.data = this.salesOrder;
        this.showLoader = false;
      },
      (error) => console.log(error)
      );
    // this.showLoader = false;
  }



}
