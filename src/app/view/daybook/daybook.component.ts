import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { Daybook } from '../../shared/daybook';
import { DaybookDialogComponent } from './daybook-dialog.component';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.component.html',
  styleUrls: ['./daybook.component.css']
})
export class DaybookComponent implements OnInit {
  displayedColumns = ['index', 'voucherDate', 'partyLedgerName', 'voucherType', 'voucherNumber', 'amount', 'select', 'action'];
  dataSource = new MatTableDataSource<Daybook>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription;
  dayBook: Daybook[];
  dayBook_row: Daybook[] = [];
  showLoader: boolean;

  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private serverService: ServerService, private dialog: MatDialog, private uiService: UIService) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.showLoader = true;
    this.refreshList();
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
    // this.uiService.loadingStateChanged.next(true);
    this.subscription = this.serverService.getTallyDaybook().
      subscribe(list => {
        // console.log(list);
        // this.dayBook = list;
        this.dataSource.data = list;
        !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
        this.showLoader = false;
        // this.uiService.loadingStateChanged.next(false);
      })
    this.showLoader = false;
  }
  onClickView(record, key) {
    this.dayBook_row = record;
    // console.log(this.dayBook_row);
    const dialogRef = this.dialog.open(DaybookDialogComponent, {
      // height: '90%',
      // width: '60%',
      height: "640px",
      width: '"640px"',
      data: {
        progress: this.dayBook_row
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log("true");
        this.onClickReviewed(key);
      } else {
        // console.log("false");
      }
    });
  }

  onClickReviewed(key) {
    // console.log(key);
    this.serverService.setFlagTallyDaybook(key)
      .subscribe(
        (success) => {
          this.refreshList();
        },
        (error) => console.log(error)
      );
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  replaceZeros(key: string) {
    // console.log(key.replace(".000", "")); 
    return key.replace(".000", "");
  }
  displayIndianFormat(amount: number) {
    return Number(Math.round(amount / 1000)).toLocaleString('en-IN');
  }
}
