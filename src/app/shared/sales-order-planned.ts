export interface SalesOrdersPlanned {
    batchNumber: string;
    createdDate: string;
    salesOrderPlanneds: [
        {
            altered: String,
            batchNumber: String,
            bf: String,
            company: String,
            companyId: String,
            createdDate: String,
            gsm: String,
            id: String,
            modifiedDate: String,
            newWeight: String,
            orderDate: String,
            orderNumber: Number,
            orderStatus: Number,
            reel: Number,
            size: Number,
            voucherKey: Number,
            weight: Number
            reelInStock: String,
        }];
}