export interface DispatchReport 
{
    company: string;
    orderNumber: string;
    totalReel: Number;
    totalReelInStock: Number;
    totalWeight: Number;
    salesOrderDispatchs: [
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
            reel: String,
            size: Number,
            voucherKey: Number,
            weight: Number
            reelInStock: String,
        }];
}
