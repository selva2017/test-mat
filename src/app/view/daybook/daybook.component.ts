import { Component, OnInit, Input,ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { Daybook } from '../../shared/daybook';
import { DaybookDialogComponent } from './daybook-dialog.component';

@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.component.html',
  styleUrls: ['./daybook.component.css']
})
export class DaybookComponent implements OnInit {
  displayedColumns = ['voucherKey', 'partyLedgerName', 'voucherNumber','voucherType','select','action'];
  dataSource = new MatTableDataSource<Daybook>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscription: Subscription;
  dayBook: Daybook[];
  dayBook_row: Daybook[] = [];
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
  refreshList() {
    this.subscription=this.serverService.getTallyDaybook().
      subscribe(list => {
        // console.log(list);
 this.dayBook=list;
        this.dataSource.data = list;
        this.showLoader = false;
      })
    this.showLoader = false;
  }
  onClickView(record) {
    this.dayBook_row = record;
    // console.log(this.dayBook_row);
    const dialogRef = this.dialog.open(DaybookDialogComponent, {
      height: '90%',
      width: '60%',   
      //  height: "700px",
      // width: '"1000px"',   
      data: {
        progress: this.dayBook_row
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
console.log("true");
} else {
  console.log("false");
      }
    });
  

  }
  
}
