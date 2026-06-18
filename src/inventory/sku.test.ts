import { describe, it, expect } from 'vitest';
import { generateSKU, parseSKU, validateSKUFormat } from './sku.js';

describe('generateSKU', () => {
  it('generates SKU with prefix and sequential number', () => {
    const sku = generateSKU({ prefix: 'WH', category: 'EL', sequence: 1 });
    expect(sku).toBe('WH-EL-000001');
  });

  it('generates SKU with custom separator', () => {
    const sku = generateSKU({ prefix: 'WH', category: 'EL', sequence: 42 }, { separator: '.' });
    expect(sku).toBe('WH.EL.000042');
  });

  it('pads sequence to 6 digits by default', () => {
    const sku = generateSKU({ prefix: 'WH', category: 'FD', sequence: 100 });
    expect(sku).toBe('WH-FD-000100');
  });
});

describe('parseSKU', () => {
  it('parses a valid SKU', () => {
    const parsed = parseSKU('WH-EL-000042');
    expect(parsed).toEqual({ prefix: 'WH', category: 'EL', sequence: 42 });
  });

  it('returns null for invalid SKU', () => {
    expect(parseSKU('invalid')).toBeNull();
  });

  it('returns null for SKU with non-numeric sequence', () => {
    expect(parseSKU('WH-EL-XXXXXX')).toBeNull();
  });
});

describe('validateSKUFormat', () => {
  it('validates correct SKU format', () => {
    expect(validateSKUFormat('WH-EL-000001')).toBe(true);
  });

  it('rejects SKU with wrong parts', () => {
    expect(validateSKUFormat('WH-EL')).toBe(false);
  });
});
