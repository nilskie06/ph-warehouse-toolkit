import { REGIONS, type Region, type PhilippineAddress } from './data.js';

export function getRegions(): Region[] {
  return [...REGIONS];
}

export function getRegionByCode(code: string): Region | undefined {
  return REGIONS.find(r => r.code === code);
}

export function getProvinces(regionCode: string): string[] {
  const region = getRegionByCode(regionCode);
  return region ? [...region.provinces] : [];
}

export function formatAddress(addr: PhilippineAddress): string {
  const parts: string[] = [];
  if (addr.unit) parts.push(addr.unit);
  if (addr.floor) parts.push(`Floor ${addr.floor}`);
  if (addr.building) parts.push(addr.building);
  if (addr.street) parts.push(addr.street);
  if (addr.barangay) parts.push(`Brgy. ${addr.barangay}`);
  if (addr.city) parts.push(addr.city);
  if (addr.province) parts.push(addr.province);
  if (addr.zipCode) parts.push(addr.zipCode);
  return parts.join(', ');
}
