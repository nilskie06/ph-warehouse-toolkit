import { describe, it, expect } from 'vitest';
import { calculateReorderPoint, calculateSafetyStock, calculateEOQ, calculateStockValue } from './stock.js';

describe('calculateReorderPoint', () => {
  it('calculates reorder point from lead time and daily demand', () => {
    expect(calculateReorderPoint(50, 7)).toBe(350);
  });

  it('includes safety stock', () => {
    expect(calculateReorderPoint(50, 7, 20)).toBe(370);
  });
});

describe('calculateSafetyStock', () => {
  it('calculates safety stock from max lead time and max daily demand', () => {
    expect(calculateSafetyStock(60, 50, 10, 7)).toBe(30);
  });
});

describe('calculateEOQ', () => {
  it('calculates Economic Order Quantity', () => {
    const eoq = calculateEOQ(1000, 50, 5);
    expect(eoq).toBeCloseTo(141.42, 0);
  });
});

describe('calculateStockValue', () => {
  it('calculates total stock value', () => {
    const items = [
      { quantity: 100, unitCost: 50 },
      { quantity: 50, unitCost: 120 },
    ];
    expect(calculateStockValue(items)).toBe(11000);
  });

  it('returns 0 for empty items', () => {
    expect(calculateStockValue([])).toBe(0);
  });
});
