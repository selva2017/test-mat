import { StockList } from './../../shared/stock-list';
import { ServerService } from './../../shared/server.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription;
  // name = '';
  // displayedColumns = ['custId','salesId','voucherNumber', 'partyLedgerName', 'date','effectiveDate','voucherType','voucherKey','ledgerName','amount','companyId'];
  displayedColumns = ['index', 'amount', 'batchName', 'bfAct', 'bfTgt', 'gsmAct', 'gsmTgt', 'stockItemName', 'units', 'voucherEffectiveDate', 'voucherKey', 'voucherNumber'];
  // stock_list: StockList[];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<StockList>();
  showLoader: boolean;

  // isLoading = false;
  // private loadingSubs: Subscription;

  constructor(private serverService: ServerService, private uiService: UIService) {
    this.showLoader = true;
  }

  ngOnInit() {
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });
    this.showLoader = true;
    this.refreshList();
  }

  ngAfterViewInit() {
    // this.showLoader = true;
    // this.refreshList();
    // this.showLoader = true;
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
    // this.uiService.loadingStateChanged.next(true);
    this.subscription = this.serverService.getTallyStockData().
      subscribe(list => {
        // this.dataSource.data = list;
        // this.stock_list = list;
        this.dataSource.data = list;
        !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
        this.showLoader = false;
        // this.dataSource.data = this.salesOrder.slice();
        // console.log(this.dataSource.data);
        // this.uiService.loadingStateChanged.next(false);
      })
    this.showLoader = false;
  }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }

}

