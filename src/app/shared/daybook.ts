
export interface Daybook {
    voucherType: string;
    voucherDate: string;
    voucherNumber: string;
    partyLedgerName: string;
    voucherKey: string;
    effectiveDate: string;
    masterId: string;
    checkFlag: string;
    ledgerEntryVOs: [
        {
            ledgerName: string;
            amount: number;
            voucherKey: string;
            id: string;
        }];
    inventoryEntryVOs: [
        {
            voucherKey: string;
            ledgerName: string;
            stockItemName: string;
            rate: number;
            amount: number;
            billedQuantity: string;
            id: string;
        }];
}