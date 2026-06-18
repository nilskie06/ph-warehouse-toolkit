export const VAT_RATE = 0.12;
const VAT_FACTOR = 1 + VAT_RATE;

export function calculateVAT(netAmount: number): number {
  return Math.round(netAmount * VAT_RATE * 100) / 100;
}

export function addVAT(netAmount: number): number {
  return Math.round(netAmount * VAT_FACTOR * 100) / 100;
}

export interface VATBreakdown {
  vatableAmount: number;
  vatAmount: number;
  grossAmount: number;
}

export function extractVAT(grossAmount: number): VATBreakdown {
  const vatableAmount = Math.round((grossAmount / VAT_FACTOR) * 100) / 100;
  const vatAmount = Math.round((grossAmount - vatableAmount) * 100) / 100;
  return { vatableAmount, vatAmount, grossAmount };
}

export function isVATRegistered(tin: string): boolean {
  return /^\d{3}-\d{3}-\d{3}-\d{3}$/.test(tin);
}
