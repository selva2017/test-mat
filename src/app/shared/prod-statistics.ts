export interface ProdStatistics {
    monthlyProduction: string;
    monthlySales: number;
    productionSummaryByMonth: [
        {
            month: string;
            amount: number;
        }];
    productionSummaryByYear: [
        {
            year: number;
            amount: number;
        }];
    quarterlyProduction: string;
    quarterlySales: number;
    salesSummaryByMonth: [
        {
            month: string;
            amount: number;
        }];
    salesSummaryByYear: [
        {
            year: number;
            amount: number;
        }];
    yearlyProduction: string;
    yearlySales: number;
}