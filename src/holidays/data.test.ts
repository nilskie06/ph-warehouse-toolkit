import { describe, it, expect } from 'vitest';
import { isHoliday, isRegularHoliday, getPhilippineHolidays, isWarehouseOpen } from './data.js';

describe('getPhilippineHolidays', () => {
  it('returns holidays for 2026', () => {
    const holidays = getPhilippineHolidays(2026);
    expect(holidays.length).toBeGreaterThanOrEqual(18);
  });

  it('includes New Year', () => {
    const holidays = getPhilippineHolidays(2026);
    const newYear = holidays.find(h => h.date === '2026-01-01');
    expect(newYear).toBeDefined();
    expect(newYear?.name).toBe("New Year's Day");
  });
});

describe('isHoliday', () => {
  it('returns true for regular holiday', () => {
    expect(isHoliday(new Date('2026-01-01'))).toBe(true);
  });

  it('returns false for regular weekday', () => {
    expect(isHoliday(new Date('2026-06-15'))).toBe(false);
  });
});

describe('isRegularHoliday', () => {
  it('returns true for regular holiday', () => {
    expect(isRegularHoliday(new Date('2026-12-25'))).toBe(true);
  });

  it('returns false for special non-working holiday', () => {
    expect(isRegularHoliday(new Date('2026-11-01'))).toBe(false);
  });
});

describe('isWarehouseOpen', () => {
  it('returns false on Sunday by default', () => {
    // 2026-06-14 is a Sunday
    expect(isWarehouseOpen(new Date('2026-06-14'))).toBe(false);
  });

  it('returns true on weekdays (non-holiday)', () => {
    // 2026-06-15 is a Monday
    expect(isWarehouseOpen(new Date('2026-06-15'))).toBe(true);
  });

  it('returns false on holidays', () => {
    expect(isWarehouseOpen(new Date('2026-01-01'))).toBe(false);
  });

  it('returns true on Sunday when configured', () => {
    expect(isWarehouseOpen(new Date('2026-06-14'), { closedDays: [] })).toBe(true);
  });
});
