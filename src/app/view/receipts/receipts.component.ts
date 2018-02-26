import { ServerService } from './../../shared/server.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Receipts } from '../../shared/receipts';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription;
  name = '';
  displayedColumns = ['custId','receiptId','voucherNumber', 'partyLedgerName', 'date','effectiveDate','voucherType','voucherKey','ledgerName','amount','companyId'];
  receipts: Receipts[];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Receipts[]>();
  showLoader: boolean;

  constructor(private serverService: ServerService) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.refreshList();
  }

  ngAfterViewInit() {
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

  refreshList() {
    this.subscription = this.serverService.getSalesList('all').
      subscribe(list => {
        // this.dataSource.data = list;
        this.receipts = list;
        this.showLoader = false;
        this.dataSource.data = list;
        // this.dataSource.data = this.salesOrder.slice();
        // console.log(this.dataSource.data);
      })
    this.showLoader = false;
  }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }
}