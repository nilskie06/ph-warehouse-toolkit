export interface PhilippineHoliday {
  name: string;
  date: string;
  type: 'regular' | 'special_non_working';
}

const FIXED_HOLIDAYS: { month: number; day: number; name: string; type: PhilippineHoliday['type'] }[] = [
  { month: 1, day: 1, name: "New Year's Day", type: 'regular' },
  { month: 2, day: 25, name: 'EDSA People Power Revolution', type: 'regular' },
  { month: 4, day: 9, name: 'Araw ng Kagitingan (Day of Valor)', type: 'regular' },
  { month: 5, day: 1, name: 'Labor Day', type: 'regular' },
  { month: 6, day: 12, name: 'Independence Day', type: 'regular' },
  { month: 8, day: 21, name: 'Ninoy Aquino Day', type: 'special_non_working' },
  { month: 8, day: 26, name: 'National Heroes Day', type: 'regular' },
  { month: 11, day: 1, name: "All Saints' Day", type: 'special_non_working' },
  { month: 11, day: 2, name: "All Souls' Day", type: 'special_non_working' },
  { month: 11, day: 30, name: 'Bonifacio Day', type: 'regular' },
  { month: 12, day: 8, name: 'Feast of the Immaculate Conception', type: 'special_non_working' },
  { month: 12, day: 24, name: 'Christmas Eve', type: 'special_non_working' },
  { month: 12, day: 25, name: 'Christmas Day', type: 'regular' },
  { month: 12, day: 30, name: 'Rizal Day', type: 'regular' },
  { month: 12, day: 31, name: 'Last Day of the Year', type: 'special_non_working' },
];

export function getPhilippineHolidays(year: number): PhilippineHoliday[] {
  const holidays: PhilippineHoliday[] = [];

  for (const h of FIXED_HOLIDAYS) {
    holidays.push({
      name: h.name,
      date: `${year}-${String(h.month).padStart(2, '0')}-${String(h.day).padStart(2, '0')}`,
      type: h.type,
    });
  }

  const easterDate = getEasterDate(year);
  const goodFriday = new Date(easterDate);
  goodFriday.setDate(easterDate.getDate() - 2);
  const blackSaturday = new Date(easterDate);
  blackSaturday.setDate(easterDate.getDate() - 1);

  holidays.push({
    name: 'Maundy Thursday',
    date: formatDateISO(new Date(easterDate.getTime() - 3 * 86400000)),
    type: 'regular',
  });
  holidays.push({
    name: 'Good Friday',
    date: formatDateISO(goodFriday),
    type: 'regular',
  });
  holidays.push({
    name: 'Black Saturday',
    date: formatDateISO(blackSaturday),
    type: 'special_non_working',
  });
  holidays.push({
    name: 'Easter Sunday',
    date: formatDateISO(easterDate),
    type: 'regular',
  });

  return holidays;
}

function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function formatDateISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function isHoliday(date: Date): boolean {
  const iso = formatDateISO(date);
  return getPhilippineHolidays(date.getFullYear()).some(h => h.date === iso);
}

export function isRegularHoliday(date: Date): boolean {
  const iso = formatDateISO(date);
  return getPhilippineHolidays(date.getFullYear()).some(h => h.date === iso && h.type === 'regular');
}

export interface WarehouseOpenOptions {
  closedDays?: number[];
}

export function isWarehouseOpen(date: Date, options: WarehouseOpenOptions = {}): boolean {
  const { closedDays = [0] } = options;
  if (closedDays.includes(date.getDay())) return false;
  if (isHoliday(date)) return false;
  return true;
}
