import { ServerService } from './../../shared/server.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { CustomerDialog } from './customer-dialog.component';
import { Customer } from '../../shared/customer';
import { Receipts } from '../../shared/receipts';
import { SalesDetails } from '../../shared/sales-details';
import { CustomerDetails } from '../../shared/customer-details';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription;
  displayedColumns = ['index','customerID', 'name', 'gstNo', 'companyId', 'createdDate', 'action'];
  // displayedColumns = ['index','customerID', 'name', 'gstNo', 'companyId', 'createdDate', 'customerGroup', 'customerType', 'action'];
  customer: Customer[] = [];
  customer_details: CustomerDetails[] = [];
  receipt: Receipts[] = [];
  sales: SalesDetails[] = [];

  dataSource = new MatTableDataSource<Customer[]>();
  showLoader: boolean;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private serverService: ServerService, private uiService: UIService, private dialog: MatDialog) {
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
    this.subscription = this.serverService.getCustomersList().
      subscribe(list => {
        // this.dataSource.data = list;
        // this.customer = list;
        this.dataSource.data = list;
        !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
        this.showLoader = false;
        // this.dataSource.data = this.salesOrder.slice();
        // console.log(this.dataSource.data);
        this.uiService.loadingStateChanged.next(false);
      })
    this.showLoader = false;
  }
  onViewDetails(record) {
    // console.log(record);
    this.subscription = this.serverService.getCustomerDetails(record).
      subscribe(list => {
        // this.customer_details = list;
        this.onClickView(list)
        // console.log(list);
      })
  }
  // this.receipt = [];
  // this.subscription = this.serverService.getReceiptList(record).
  //   subscribe(list => {
  //     this.receipt = list;
  //     console.log(list);
  //   })
  // // this.sales = [];
  // this.subscription = this.serverService.getSalesList(record).
  //   subscribe(list => {
  //     this.sales = list;
  //     console.log(list);
  //   })
  onClickView(record: CustomerDetails[]) {
    const dialogRef = this.dialog.open(CustomerDialog, {
      // height: '90%',
      // width: '60%',
      height: "640px",
      width: '"640px"',
      data: {
        progress: record
        // sales_data: this.sales.slice(), receipt_data: this.receipt.slice()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log("true");
      } else {
        // console.log("false");
      }
    });
  }
}
