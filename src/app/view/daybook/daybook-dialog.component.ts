import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Daybook } from '../../shared/daybook';


@Component({
    selector: 'daybook-dialog',
    template: `
    <div class="main-content">
    <div class="container-fluid">
        <div class="row" align="center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header" data-background-color="red">
                        <h4 class="title">Simple Table</h4>
                        <p class="category">Here is a subtitle for this table</p>
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
    <h5 *ngIf="passedData.progress.ledgerEntryVOs?.length > 0">Ledger Details</h5>
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
          <td>{{ledger.amount }} </td>
        </tr>
      </tbody>
     
    </table>
    <hr class="style2">

    <h5 *ngIf="passedData.progress.inventoryEntryVOs?.length > 0">Inventory Details</h5>

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
          <td>{{inventory.amount }} </td>
          <td>{{inventory.billedQuantity}} </td>
        </tr>
      </tbody>
    </table>
    <mat-dialog-actions>
              <button mat-raised-button color="warn" [mat-dialog-close]="true">Hide</button>
              <button mat-raised-button color="primary" [mat-dialog-close]="false">Close</button>
            </mat-dialog-actions>
            </div>
            </div>
        </div>
    </div>
</div>

<div class="main-content">
    <div class="container-fluid">
        <div class="row" align="center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header" data-background-color="red">
                        <h4 class="title">Simple Table</h4>
                        <p class="category">Here is a subtitle for this table</p>
                    </div>
                    <div class="card-content table-responsive">
                        <table class="table">
                            <thead class="text-danger">
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Dakota Rice</td>
                                    <td>Niger</td>
                                    <td>Oud-Turnhout</td>
                                    <td class="text-danger">$36,738</td>
                                </tr>
                                <tr>
                                    <td>Minerva Hooper</td>
                                    <td>Curaçao</td>
                                    <td>Sinaai-Waas</td>
                                    <td class="text-danger">$23,789</td>
                                </tr>
                                <tr>
                                    <td>Sage Rodriguez</td>
                                    <td>Netherlands</td>
                                    <td>Baileux</td>
                                    <td class="text-danger">$56,142</td>
                                </tr>
                                <tr>
                                    <td>Philip Chaney</td>
                                    <td>Korea, South</td>
                                    <td>Overland Park</td>
                                    <td class="text-danger">$38,735</td>
                                </tr>
                                <tr>
                                    <td>Doris Greene</td>
                                    <td>Malawi</td>
                                    <td>Feldkirchen in Kärnten</td>
                                    <td class="text-danger">$63,542</td>
                                </tr>
                                <tr>
                                    <td>Mason Porter</td>
                                    <td>Chile</td>
                                    <td>Gloucester</td>
                                    <td class="text-danger">$78,615</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

            <div class="col-md-12">
                <div class="card card-plain">
                    <div class="card-header" data-background-color="red">
                        <h4 class="title">Table on Plain Background</h4>
                        <p class="category">Here is a subtitle for this table</p>
                    </div>
                    <div class="card-content table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Salary</th>
                                    <th>Country</th>
                                    <th>City</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Dakota Rice</td>
                                    <td>$36,738</td>
                                    <td>Niger</td>
                                    <td>Oud-Turnhout</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Minerva Hooper</td>
                                    <td>$23,789</td>
                                    <td>Curaçao</td>
                                    <td>Sinaai-Waas</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Sage Rodriguez</td>
                                    <td>$56,142</td>
                                    <td>Netherlands</td>
                                    <td>Baileux</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Philip Chaney</td>
                                    <td>$38,735</td>
                                    <td>Korea, South</td>
                                    <td>Overland Park</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Doris Greene</td>
                                    <td>$63,542</td>
                                    <td>Malawi</td>
                                    <td>Feldkirchen in Kärnten</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Mason Porter</td>
                                    <td>$78,615</td>
                                    <td>Chile</td>
                                    <td>Gloucester</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

`
  })
  export class DaybookDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
        console.log("passedData");
        console.log(passedData);
    }
  }
  