import { ServerService } from './../../shared/server.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { CustomerDialog } from './customer-dialog.component';
import { Customer } from '../../shared/customer';
import { Receipts } from '../../shared/receipts';
import { SalesDetails } from '../../shared/sales-details';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription;
  displayedColumns = ['customerID', 'name', 'gstNo', 'companyId', 'createdDate', 'customerGroup', 'customerType', 'action'];
  customer: Customer[] = [];
  receipt: Receipts[] = [];
  sales: SalesDetails[] = [];

  dataSource = new MatTableDataSource<Customer[]>();
  showLoader: boolean;
  constructor(private serverService: ServerService, private dialog: MatDialog) {
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
    this.subscription = this.serverService.getCustomersList().
      subscribe(list => {
        // this.dataSource.data = list;
        this.customer = list;
        this.showLoader = false;
        this.dataSource.data = list;
        // this.dataSource.data = this.salesOrder.slice();
        // console.log(this.dataSource.data);
      })
    this.showLoader = false;
  }
  onViewDetails(record) {
    console.log(record);
    this.subscription = this.serverService.getCustomerDetails(record).
      subscribe(list => {
        this.receipt = list;
        console.log(list);
      })

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

    // const dialogRef = this.dialog.open(CustomerDialog, {
    //   // height: '90%',
    //   // width: '60%',
    //   height: "640px",
    //   width: '"640px"',
    //   data: {
    //     sales_data: this.sales.slice(), receipt_data: this.receipt.slice()
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log("true");
    //   } else {
    //     console.log("false");
    //   }
    // });
  }
}
