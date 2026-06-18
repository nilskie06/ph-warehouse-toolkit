import { describe, it, expect } from 'vitest';
import { calculateEAN13CheckDigit, validateEAN13, generateCode128Data } from './checksum.js';

describe('calculateEAN13CheckDigit', () => {
  it('calculates check digit for known EAN-13', () => {
    expect(calculateEAN13CheckDigit('400638133393')).toBe(1);
  });

  it('calculates check digit for 12 digits', () => {
    const digit = calculateEAN13CheckDigit('590123412345');
    expect(digit).toBeGreaterThanOrEqual(0);
    expect(digit).toBeLessThanOrEqual(9);
  });

  it('throws for wrong length', () => {
    expect(() => calculateEAN13CheckDigit('123')).toThrow();
  });
});

describe('validateEAN13', () => {
  it('validates correct EAN-13', () => {
    expect(validateEAN13('4006381333931')).toBe(true);
  });

  it('rejects incorrect EAN-13', () => {
    expect(validateEAN13('4006381333930')).toBe(false);
  });

  it('rejects wrong length', () => {
    expect(validateEAN13('12345')).toBe(false);
  });
});

describe('generateCode128Data', () => {
  it('returns the input for Code128 (data pass-through)', () => {
    expect(generateCode128Data('WH-EL-000042')).toBe('WH-EL-000042');
  });

  it('trims whitespace', () => {
    expect(generateCode128Data('  TEST  ')).toBe('TEST');
  });
});
