import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Daybook } from '../../shared/daybook';


@Component({
    selector: 'customer-dialog',
    template: `
    <div class="main-content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header" data-background-color="red">
            <h2 class="title">Customer Details</h2>
            <h4 class="title">Sales and Receipt Details</h4>
          </div>
          <hr class="style2">
          <table class="w-100 p-3 table-striped table-bordered">
            <thead>
              <tr>
                <th>Cust ID</th>
                <th>Sales ID</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ledger of passedData.sales_data">
                <td>{{ledger.custId}} </td>
                <td>{{ledger.salesId }} </td>
              </tr>
            </tbody>

          </table>
          <hr class="style2">

          <table class="w-100 p-3 table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Receipt</th>
                <th>Voucher</th>
                <th>Ledger Name</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let inventory of passedData.receipt_data">
                <td>{{inventory.custId}} </td>
                <td>{{inventory.receiptId}} </td>
                <td>{{inventory.voucherNumber }} </td>
                <td>{{inventory.partyLedgerName}} </td>
              </tr>
            </tbody>
          </table>
          <br>
            <div align="center">
            <button mat-raised-button color="primary" [mat-dialog-close]="" cdkFocusInitial>Cancel</button>
            </div>
      </div>
    </div>
  </div>
`
  })
  export class CustomerDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
        console.log("passedData");
        console.log(passedData);
    }
  }
  