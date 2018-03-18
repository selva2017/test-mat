export interface CustomerDetails {
    companyId: string;
    createdDate: string;
    customerGroup: string;
    customerID: string;
    customerType: string;
    gstNo: string;
    name: string;
    receipts: [
        {
            id: string;
            custId: string;
            receiptId: string;
            voucherNumber: string;
            partyLedgerName: string;
            date: string;
            effectiveDate: string;
            voucherType: string;
            voucherKey: string;
            ledgerName: string;
            amount: string;
            createdDate: string;
            modifiesDate: string;
            companyId: string;
        }];
    sales: [
        {
            id: string;
            custId: string;
            salesId: string;
            voucherNumber: string;
            partyLedgerName: string;
            date: string;
            effectiveDate: string;
            voucherType: string;
            voucherKey: string;
            ledgerName: string;
            amount: string;
            createdDate: string;
            modifiesDate: string;
            companyId: string;
        }];
}