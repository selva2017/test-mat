import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SalesOrdersComponent } from './sales-orders.component';
import { DispatchReport } from '../../shared/dispatch-report';


@Component({
  selector: 'dispatch-dialog',
  template: `
  <div class="main-content" id="print_dispatch_report">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header" data-background-color="red">
            <h2 class="title">Dispatch Report</h2>
            <h4 class="title">{{passedData.header}}</h4>
          </div>
          <div *ngFor="let row5 of passedData.progress; let i = index" class="w-100 p-3 table-striped table-bordered ">
            <table class="ngx-table" style="border:2px">
              <!-- <table *ngIf="passedData.progress?.length > 0" class="w-100 p-3 table-striped table-bordered"> -->
              <thead style="background:#rgb(40, 255, 183)">
                <tr class="bg-success">
                  <th colspan="7">Order# {{row5.orderNumber}} - {{row5.company}}</th>
                </tr>
                <tr class="bg-success">
                  <th>No</th>
                  <th>Item</th>
                  <th>Size (Inch)</th>
                  <th>Size (Cm)</th>
                  <th>Weight</th>
                  <th>Prod Reel</th>
                  <th>Reel In Stock</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr *ngFor="let ledger of passedData.progress"> -->
                <!-- <td>{{ledger.company}} </td>
        <td>{{ledger.orderNumber }} </td>
      </tr> -->
                <tr *ngFor="let row6 of row5.salesOrderDispatchs; let i = index">
                  <td>{{i+1}}</td>
                  <td>{{row6.bf}} BF {{row6.gsm}} GSM</td>
                  <td>{{row6.size}}</td>
                  <td>{{(row6.size)*2.54 | number: '1.0-0'}}</td>
                  <td>{{row6.weight | number: '1.2-2'}}</td>
                  <td>{{row6.reel | number: '1.0-0'}}</td>
                  <td>{{row6.reelInStock | number: '1.0-0'}}</td>
                </tr>
              </tbody>
              <tfoot style="background:rgb(150, 233, 139)">
                <tr>
                  <th id="total" colspan="4">Total :</th>
                  <th>{{row5.totalWeight | number: '1.2-2'}}</th>
                  <th>{{row5.totalReel | number: '1.0-0'}}</th>
                  <th>{{row5.totalReelInStock | number: '1.0-0'}}</th>
                </tr>
                <tr>
                  <th colspan="5">Total (Reels for Production + Reels In Stock)</th>
                  <th colspan="2" class="text-center">{{sumReels(row5.totalReel,row5.totalReelInStock) | number: '1.0-0'}}</th>
                </tr>
              </tfoot>
            </table>
            <br>
            <div *ngFor="let row6 of passedData.progress.salesOrderDispatchs; let i = index">
            </div>
          </div>
          <br>
          <div align="center">
            <button mat-raised-button color="primary" (click)="onClickPrint('print_dispatch_report')">Print</button>
            <button mat-raised-button color="warn" [mat-dialog-close]="" cdkFocusInitial>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
   `
})
export class DispatchDialogComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public passedData: any) {
    console.log("passedData");
    console.log(passedData);
  }
  sumReels(reel, reelInstock) {
    return (Number(reel) + Number(reelInstock));
  }
  onClickPrint(printSectionId: string) {
    // window.print();
    // let popupWinindow;
    // let innerContents = document.getElementById(printSectionId).innerHTML;
    // popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    // popupWinindow.document.open();
    // popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    // popupWinindow.document.close();
    let printContents, popupWin;
    printContents = document.getElementById('print_dispatch_report').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
