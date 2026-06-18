import { describe, it, expect } from 'vitest';
import { generateGRNNumber, generateDRNumber, generateReferenceNumber } from './numbering.js';

describe('generateGRNNumber', () => {
  it('generates GRN with warehouse code, date, and sequence', () => {
    const grn = generateGRNNumber({
      warehouseCode: 'WH01',
      date: new Date('2026-06-15'),
      sequence: 1,
    });
    expect(grn).toBe('GRN-WH01-20260615-0001');
  });

  it('uses current date when not provided', () => {
    const grn = generateGRNNumber({ warehouseCode: 'WH01', sequence: 42 });
    expect(grn).toMatch(/^GRN-WH01-\d{8}-0042$/);
  });
});

describe('generateDRNumber', () => {
  it('generates delivery receipt number', () => {
    const dr = generateDRNumber({
      warehouseCode: 'WH01',
      date: new Date('2026-06-15'),
      sequence: 1,
    });
    expect(dr).toBe('DR-WH01-20260615-0001');
  });
});

describe('generateReferenceNumber', () => {
  it('generates reference with prefix', () => {
    const ref = generateReferenceNumber('PO', 1001);
    expect(ref).toBe('PO-001001');
  });

  it('generates reference with date', () => {
    const ref = generateReferenceNumber('PO', 1, new Date('2026-06-15'));
    expect(ref).toBe('PO-20260615-000001');
  });
});
