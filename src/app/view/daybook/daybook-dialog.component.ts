import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Daybook } from '../../shared/daybook';
import { CommonDetails } from './../../shared/common-details';

@Component({
  selector: 'daybook-dialog',
  template: `
    <div class="main-content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header" data-background-color="red">
            <h2 class="title">Day Book Detail</h2>
            <h4 class="title">Master Details</h4>
          </div>
          <table class="table">
            <tr>
              <td>Voucher Date</td>
              <td>{{passedData.progress.voucherDate}} </td>
            </tr>
            <tr>
              <td>Ledger Name</td>
              <td>{{passedData.progress.partyLedgerName}} </td>
            </tr>
            <tr>
              <td>Voucher Type</td>
              <td>{{passedData.progress.voucherType}} </td>
            </tr>
            <tr>
              <td>Voucher Number</td>
              <td>{{passedData.progress.voucherNumber}} </td>
            </tr>
            <tr>
              <td>Voucher Key</td>
              <td>{{passedData.progress.voucherKey}} </td>
            </tr>
          </table>
          <hr class="style2">
          <h4 *ngIf="passedData.progress.ledgerEntryVOs?.length > 0">Ledger Details</h4>
          <table *ngIf="passedData.progress.ledgerEntryVOs?.length > 0" class="w-100 p-3 table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let ledger of passedData.progress.ledgerEntryVOs">
                <td>{{ledger.ledgerName}} </td>
                <td>{{displayINR(ledger.amount) }} </td>
              </tr>
            </tbody>

          </table>
          <hr class="style2">

          <h4 *ngIf="passedData.progress.inventoryEntryVOs?.length > 0">Inventory Details</h4>

          <table *ngIf="passedData.progress.inventoryEntryVOs?.length > 0" class="w-100 p-3 table-striped table-bordered">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Rate/ton</th>
                <th>Amount</th>
                <th>Billed Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let inventory of passedData.progress.inventoryEntryVOs">
                <td>{{inventory.stockItemName}} </td>
                <td>{{inventory.rate}} </td>
                <td>{{displayINR(inventory.amount) }} </td>
                <td>{{inventory.billedQuantity}} </td>
              </tr>
            </tbody>
          </table>
          <br>
            <div align="center">
            <button mat-raised-button color="accent" [mat-dialog-close]="true">Hide</button>
            <button mat-raised-button color="primary" [mat-dialog-close]="false" cdkFocusInitial>Cancel</button>
            </div>
      </div>
    </div>
  </div>
`
})
export class DaybookDialogComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public passedData: any) {
    // console.log("passedData");
    // console.log(passedData);
  }
  onClickPrint() {
    window.print();
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }

}
