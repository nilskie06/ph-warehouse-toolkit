export function calculateReorderPoint(
  averageDailyDemand: number,
  leadTimeDays: number,
  safetyStock: number = 0
): number {
  return averageDailyDemand * leadTimeDays + safetyStock;
}

export function calculateSafetyStock(
  maxDailyDemand: number,
  averageDailyDemand: number,
  maxLeadTimeDays: number,
  averageLeadTimeDays: number
): number {
  return (maxLeadTimeDays - averageLeadTimeDays) * (maxDailyDemand - averageDailyDemand);
}

export function calculateEOQ(
  annualDemand: number,
  orderingCost: number,
  holdingCostPerUnit: number
): number {
  return Math.sqrt((2 * annualDemand * orderingCost) / holdingCostPerUnit);
}

export interface StockItem {
  quantity: number;
  unitCost: number;
}

export function calculateStockValue(items: StockItem[]): number {
  return items.reduce((total, item) => total + item.quantity * item.unitCost, 0);
}
