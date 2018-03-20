import { ServerService } from './../../shared/server.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SalesDetails } from '../../shared/sales-details';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})

export class SalesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription;
  displayedColumns = ['custId','salesId','voucherNumber', 'partyLedgerName', 'date','effectiveDate','voucherType','voucherKey','ledgerName','amount','companyId'];
  products: SalesDetails[];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<SalesDetails>();
  showLoader: boolean;

  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.showLoader = true;
    this.refreshList();
    // this.refreshCustomersList();
  }
  
  ngAfterViewInit() {
    this.showLoader = true;
    this.refreshList();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // _setDataSource(indexNumber) {
  //   setTimeout(() => {
  //     !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
  //   });
  // }

  refreshList() {
    this.subscription = this.serverService.getSalesList('all').
      subscribe(list => {
        // this.dataSource.data = list;
        this.products = list;
        // this.showLoader = false;
        !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
        this.dataSource.data = list;
        // this.dataSource.data = this.salesOrder.slice();
        // console.log(this.dataSource.data);
      })
    this.showLoader = false;
  }
  // refreshCustomersList() {
  //   this.subscription = this.serverService.getCustomersList().
  //     subscribe(list => {
  //       // this.dataSource.data = list;
  //       // this.products = list;
  //       // this.showLoader = false;
  //       // this.dataSource.data = list;
  //       // this.dataSource.data = this.salesOrder.slice();
  //       console.log(list);
  //     })
  //   // this.showLoader = false;
  // }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }

}

