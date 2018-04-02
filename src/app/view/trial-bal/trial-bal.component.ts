import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../../shared/server.service';
import { TrialBal } from '../../shared/trialbal';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-trial-bal',
  templateUrl: './trial-bal.component.html',
  styleUrls: ['./trial-bal.component.css']
})
export class TrialBalComponent implements OnInit {
  displayedColumns = ['index','reportKey', 'reportValue2', 'reportValue1', 'createdTime','action'];
  dataSource = new MatTableDataSource<TrialBal>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  products: TrialBal[];
  subscription: Subscription;
  items: TrialBal[] = [];
  showLoader: boolean;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private productService: ServerService, private uiService: UIService) {
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
  refreshList() {
    this.uiService.loadingStateChanged.next(true);
    this.subscription = this.productService.getTallyData()
      .subscribe(products => {
        // console.log(products);
        this.dataSource.data = products;
        !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
        // this.products = products;
        // this.showLoader = false;
        this.uiService.loadingStateChanged.next(false);
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
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  onClick(row: TrialBal[]) {
    this.productService.putTallyData(row)
      .subscribe(
      (success) => {
        this.refreshList();
        console.log("success");
      },
      (error) => console.log(error)
      );
   
  }
}
