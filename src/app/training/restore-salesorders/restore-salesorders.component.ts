import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatTabChangeEvent } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';
import { ProdPlan } from './../../shared/prod_plan';

@Component({
  selector: 'app-restore-salesorders',
  templateUrl: './restore-salesorders.component.html',
  styleUrls: ['./restore-salesorders.component.css']
})
export class RestoreSalesordersComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription;
  name = '';
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
    this.showLoader = true;
    this.refreshInActiveList();
  }
  
  ngAfterViewInit() {
    // this.showLoader = true;
    // this.refreshInActiveList();
    // this.refreshInActiveList();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // setDataSource(indexNumber) {
  //   setTimeout(() => {
  //     !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
  //   });
  // }

  refreshInActiveList() {
    this.salesOrder = [];
    // this.showLoader = true;
    this.subscription = this.serverService.getInActiveSalesOrders().
      subscribe(list => {
        this.salesOrder = list;
        // console.log(this.salesOrder);
        this.dataSource.data = this.salesOrder;
        !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
        this.showLoader = false;
      })
    this.showLoader = false;
  }

  restoreSalesOrder(id) {
    // console.log(this.showLoader);
    this.showLoader = true;
    this.serverService.restoreSalesOrderStatus(id)
      .subscribe(
      (success) => {
        this.refreshInActiveList();
        this.showLoader = false;
      },
      (error) => console.log(error)
      );
  }
}
