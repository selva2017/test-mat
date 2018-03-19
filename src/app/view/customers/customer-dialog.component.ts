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
            <h2 class="title">Transaction Details</h2>
            <h4 class="title">Customer Details</h4>
          </div>
          <table class="table">
            <tr>
              <td>Customer ID</td>
              <td>{{passedData.progress.customerID}} </td>
            </tr>
          </table>
          <hr class="style2">
          <h4 *ngIf="passedData.progress.receipts?.length > 0">Receipt Details</h4>
          <table *ngIf="passedData.progress.receipts?.length > 0" class="w-100 p-3 table-striped table-bordered">
            <thead>
              <tr>
              <th>Party LedgerName</th>
                <th>Amount</th>
                <th>Cust ID</th>
                <th>Receipt ID</th>
                <th>Voucher Number</th>
                <th>Date</th>
                <th>Voucher Type</th>
                <th>Voucher Key</th>
                <th>Created Date</th>
                <th>Modified Date</th>
                <th>Company ID</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let receipt of passedData.progress.receipts">
              <td>{{receipt.partyLedgerName}} </td>
              <td>{{displayINR(receipt.amount)}} </td>
              <td>{{receipt.custId}} </td>
              <td>{{receipt.receiptId}} </td>
              <td>{{receipt.voucherNumber}} </td>
              <td>{{receipt.date}} </td>
              <td>{{receipt.voucherType}} </td>
              <td>{{receipt.voucherKey}} </td>
              <td>{{receipt.createdDate}} </td>
              <td>{{receipt.modifiesDate}} </td>
              <td>{{receipt.companyId}} </td>
              </tr>
            </tbody>
          </table>
          <hr class="style2">
          <h4 *ngIf="passedData.progress.sales?.length > 0">Sales Details</h4>
          <table *ngIf="passedData.progress.sales?.length > 0" class="w-100 p-3 table-striped table-bordered">
            <thead>
              <tr>
              <th>Party LedgerName</th>
              <th>Amount</th>
              <th>Cust ID</th>
              <th>Sales ID</th>
              <th>Voucher Number</th>
              <th>Date</th>
              <th>Voucher Type</th>
              <th>Voucher Key</th>
              <th>Created Date</th>
              <th>Modified Date</th>
              <th>Company ID</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let sales of passedData.progress.sales">
              <td>{{sales.partyLedgerName}} </td>
              <td>{{displayINR(sales.amount)}} </td>
              <td>{{sales.custId}} </td>
              <td>{{sales.salesId}} </td>
              <td>{{sales.voucherNumber}} </td>
              <td>{{sales.date}} </td>
              <td>{{sales.voucherType}} </td>
              <td>{{sales.voucherKey}} </td>
              <td>{{sales.createdDate}} </td>
              <td>{{sales.modifiesDate}} </td>
              <td>{{sales.companyId}} </td>  
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
  constructor( @Inject(MAT_DIALOG_DATA) public passedData: any) {
    // console.log("passedData");
    // console.log(passedData);
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }

}
