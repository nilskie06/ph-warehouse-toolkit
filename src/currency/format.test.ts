import { describe, it, expect } from 'vitest';
import { formatPeso, parsePeso, formatPesoShort } from './format.js';

describe('formatPeso', () => {
  it('formats whole numbers with peso sign and commas', () => {
    expect(formatPeso(1234567.89)).toBe('\u20B11,234,567.89');
  });

  it('formats zero', () => {
    expect(formatPeso(0)).toBe('\u20B10.00');
  });

  it('formats negative values', () => {
    expect(formatPeso(-5000)).toBe('-\u20B15,000.00');
  });

  it('formats without decimal places', () => {
    expect(formatPeso(1000, { decimals: 0 })).toBe('\u20B11,000');
  });
});

describe('parsePeso', () => {
  it('parses peso-formatted string to number', () => {
    expect(parsePeso('\u20B11,234,567.89')).toBe(1234567.89);
  });

  it('parses string without peso sign', () => {
    expect(parsePeso('5,000.00')).toBe(5000);
  });

  it('parses negative peso strings', () => {
    expect(parsePeso('-\u20B11,000')).toBe(-1000);
  });

  it('returns NaN for invalid strings', () => {
    expect(parsePeso('abc')).toBeNaN();
  });
});

describe('formatPesoShort', () => {
  it('formats thousands with K suffix', () => {
    expect(formatPesoShort(15000)).toBe('\u20B115K');
  });

  it('formats millions with M suffix', () => {
    expect(formatPesoShort(2500000)).toBe('\u20B12.5M');
  });

  it('formats below 1000 normally', () => {
    expect(formatPesoShort(500)).toBe('\u20B1500');
  });
});
