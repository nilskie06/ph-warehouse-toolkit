import { describe, it, expect } from 'vitest';
import { calculateVAT, extractVAT, addVAT, isVATRegistered, VAT_RATE } from './tax.js';

describe('calculateVAT', () => {
  it('calculates 12% VAT on amount', () => {
    expect(calculateVAT(1000)).toBe(120);
  });

  it('handles zero amount', () => {
    expect(calculateVAT(0)).toBe(0);
  });

  it('rounds to 2 decimal places', () => {
    expect(calculateVAT(100.50)).toBe(12.06);
  });
});

describe('extractVAT', () => {
  it('extracts VAT from VAT-inclusive amount (gross)', () => {
    const result = extractVAT(1120);
    expect(result.vatableAmount).toBe(1000);
    expect(result.vatAmount).toBe(120);
  });

  it('handles exact values', () => {
    const result = extractVAT(1000);
    expect(result.vatableAmount).toBeCloseTo(892.86);
    expect(result.vatAmount).toBeCloseTo(107.14);
  });
});

describe('addVAT', () => {
  it('adds 12% VAT to net amount', () => {
    expect(addVAT(1000)).toBe(1120);
  });

  it('rounds to 2 decimal places', () => {
    expect(addVAT(100.50)).toBe(112.56);
  });
});

describe('VAT_RATE', () => {
  it('is 0.12 (12%)', () => {
    expect(VAT_RATE).toBe(0.12);
  });
});

describe('isVATRegistered', () => {
  it('returns true for TIN format with VAT registration', () => {
    expect(isVATRegistered('123-456-789-000')).toBe(true);
  });

  it('returns false for invalid format', () => {
    expect(isVATRegistered('12345')).toBe(false);
  });
});
