import { ServerService } from './../../shared/server.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Receipts } from '../../shared/receipts';
import { UIService } from '../../shared/ui.service';

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
  displayedColumns = ['index', 'custId', 'voucherNumber', 'date', 'partyLedgerName', 'voucherKey', 'amount', 'companyId'];
  // displayedColumns = ['index','custId', 'receiptId', 'voucherNumber', 'partyLedgerName', 'date', 'effectiveDate', 'voucherType', 'voucherKey', 'ledgerName', 'amount', 'companyId'];
  receipts: Receipts[];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Receipts[]>();
  showLoader: boolean;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private serverService: ServerService, private uiService: UIService) {
    this.showLoader = true;
  }
  
  ngOnInit() {
    this.showLoader = true;
    this.refreshList();
  }
  
  ngAfterViewInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    // this.showLoader = true;
    // this.refreshList();
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
    this.uiService.loadingStateChanged.next(true);
    this.subscription = this.serverService.getReceiptList('all').
      subscribe(list => {
        // this.dataSource.data = list;
        this.receipts = list;
        this.dataSource.data = list;
        !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
        this.showLoader = false;
        this.uiService.loadingStateChanged.next(false);
        // this.dataSource.data = this.salesOrder.slice();
        // console.log(this.dataSource.data);
      })
    this.showLoader = false;
  }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }
}