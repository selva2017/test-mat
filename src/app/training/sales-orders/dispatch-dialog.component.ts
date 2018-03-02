import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SalesOrdersComponent } from './sales-orders.component';
import { DispatchReport } from '../../shared/dispatch-report';


@Component({
    selector: 'dispatch-dialog',
    template: `
        <h5>Dispatch Report</h5>
        <div *ngFor="let row5 of passedData; let i = index" class="w-100 p-3 table-striped table-bordered ">

          <table>
            <thead>
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
            <tfoot>
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
          <div *ngFor="let row6 of dispatchSalesOrders.salesOrderDispatchs; let i = index">
          </div>
        </div>
      <div>
        <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-info" data-dismiss="modal" >Print</button>
      </div>
    `
  })
  export class DispatchDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: DispatchReport[]) {
        console.log("passedData");
        console.log(passedData);
    }
  }
  