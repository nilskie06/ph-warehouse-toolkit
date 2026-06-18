import { describe, it, expect } from 'vitest';
import { isValidPHPhone, isValidTIN, isValidPHZipCode, isValidPHMobile } from './philippine.js';

describe('isValidPHPhone', () => {
  it('validates PLDT landline', () => {
    expect(isValidPHPhone('(02) 8123-4567')).toBe(true);
  });

  it('validates Globe mobile', () => {
    expect(isValidPHPhone('09171234567')).toBe(true);
  });

  it('rejects invalid format', () => {
    expect(isValidPHPhone('123')).toBe(false);
  });
});

describe('isValidPHMobile', () => {
  it('validates Globe prefix', () => {
    expect(isValidPHMobile('09171234567')).toBe(true);
  });

  it('validates Smart prefix', () => {
    expect(isValidPHMobile('09181234567')).toBe(true);
  });

  it('validates DITO prefix', () => {
    expect(isValidPHMobile('09911234567')).toBe(true);
  });

  it('rejects landline', () => {
    expect(isValidPHMobile('(02) 8123-4567')).toBe(false);
  });

  it('rejects short numbers', () => {
    expect(isValidPHMobile('091234')).toBe(false);
  });
});

describe('isValidTIN', () => {
  it('validates 12-digit TIN format', () => {
    expect(isValidTIN('123-456-789-000')).toBe(true);
  });

  it('validates TIN without dashes', () => {
    expect(isValidTIN('123456789000')).toBe(true);
  });

  it('validates TIN with branch code', () => {
    expect(isValidTIN('123-456-789-000-123')).toBe(true);
  });

  it('rejects invalid length', () => {
    expect(isValidTIN('123-456')).toBe(false);
  });
});

describe('isValidPHZipCode', () => {
  it('validates Metro Manila zip code', () => {
    expect(isValidPHZipCode('1200')).toBe(true);
  });

  it('validates provincial zip code', () => {
    expect(isValidPHZipCode('6000')).toBe(true);
  });

  it('rejects 5 digits', () => {
    expect(isValidPHZipCode('12000')).toBe(false);
  });

  it('rejects letters', () => {
    expect(isValidPHZipCode('12AB')).toBe(false);
  });
});
