import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';
import { TrialBal } from '../../shared/trialbal';

@Component({
  selector: 'app-trial-bal',
  templateUrl: './trial-bal.component.html',
  styleUrls: ['./trial-bal.component.css']
})
export class TrialBalComponent implements OnInit {
  displayedColumns = ['reportId', 'createdTime', 'reportKey', 'reportValue1', 'reportValue2', 'tallySummaryIid'];
  dataSource = new MatTableDataSource<TrialBal>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  products: TrialBal[];
  subscription: Subscription;
  items: TrialBal[] = [];
  showLoader: boolean;

  constructor(private productService: ServerService) {
    this.showLoader = true;
  }


  ngOnInit() {
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
  refreshList() {
    this.subscription = this.productService.getTallyData()
      .subscribe(products => {
        // console.log(products);
        this.dataSource.data = products;
        !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
        // this.products = products;
        // this.showLoader = false;
      });
    this.showLoader = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // _setDataSource(indexNumber) {
  //   setTimeout(() => {
  //     !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
  //   });
  // }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }
}
