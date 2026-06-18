import { describe, it, expect } from 'vitest';
import { getRegions, getRegionByCode, getProvinces, formatAddress } from './lookup.js';

describe('getRegions', () => {
  it('returns all Philippine regions', () => {
    expect(getRegions().length).toBeGreaterThanOrEqual(17);
  });
});

describe('getRegionByCode', () => {
  it('finds NCR by code', () => {
    const region = getRegionByCode('NCR');
    expect(region?.name).toBe('National Capital Region');
  });

  it('returns undefined for unknown code', () => {
    expect(getRegionByCode('XYZ')).toBeUndefined();
  });
});

describe('getProvinces', () => {
  it('returns provinces for a valid region', () => {
    const provinces = getProvinces('03');
    expect(provinces).toContain('Pampanga');
    expect(provinces).toContain('Bulacan');
  });

  it('returns empty array for unknown region', () => {
    expect(getProvinces('UNKNOWN')).toEqual([]);
  });
});

describe('formatAddress', () => {
  it('formats a complete address', () => {
    const addr = {
      street: '123 Rizal Ave',
      barangay: '123',
      city: 'Makati City',
      province: 'Metro Manila',
      zipCode: '1200',
    };
    expect(formatAddress(addr)).toBe('123 Rizal Ave, Brgy. 123, Makati City, Metro Manila, 1200');
  });

  it('handles minimal address', () => {
    expect(formatAddress({ city: 'Cebu City' })).toBe('Cebu City');
  });

  it('includes unit and floor', () => {
    const addr = {
      unit: 'Unit 5A',
      floor: '5',
      building: 'Tower One',
      street: 'Bonifacio High Street',
      city: 'Taguig City',
      zipCode: '1634',
    };
    expect(formatAddress(addr)).toBe('Unit 5A, Floor 5, Tower One, Bonifacio High Street, Taguig City, 1634');
  });
});
