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

  refreshList() {
    this.subscription = this.productService.getTallyData()
      .subscribe(products => {
        // console.log(products);
        this.dataSource.data = products;
        this.products = products;
        this.showLoader = false;
      });
      this.showLoader = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.refreshList();
  }
  ngAfterViewInit() {
    this.showLoader = true;
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

}
