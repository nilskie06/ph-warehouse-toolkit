/**
 * Philippine BIR Compliance utilities
 * - TIN formatting
 * - VAT registration checks
 * - Invoice numbering per BIR guidelines
 */

export function formatTIN(tin: string): string {
  const cleaned = tin.replace(/[^0-9]/g, '');
  if (cleaned.length === 12) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
  }
  if (cleaned.length === 15) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 9)}-${cleaned.slice(9, 12)}-${cleaned.slice(12)}`;
  }
  return tin; // return as-is if unexpected format
}

export function isValidBIRInvoiceNumber(invoiceNo: string): boolean {
  // BIR serial numbers: 2 letters + 7 digits (e.g., AB1234567) or
  // machine-registered: up to 12 alphanumeric characters
  return /^[A-Z0-9]{2,12}$/.test(invoiceNo.toUpperCase().replace(/[\s-]/g, ''));
}

export function generateBIRSerial(
  branchCode: string,
  sequence: number
): string {
  const prefix = branchCode.slice(0, 2).toUpperCase();
  const seq = String(sequence).padStart(7, '0');
  return `${prefix}${seq}`;
}

export interface InvoiceMetadata {
  invoiceNumber: string;
  date: Date;
  sellerTIN: string;
  sellerName: string;
  buyerName?: string;
  totalAmount: number;
  vatAmount: number;
  isVATExclusive: boolean;
}

export function calculateInvoiceTotals(
  amounts: number[],
  isVATExclusive: boolean
): { subtotal: number; vatAmount: number; totalAmount: number } {
  const subtotal = amounts.reduce((sum, a) => sum + a, 0);
  const vatRate = 0.12;
  const vatAmount = isVATExclusive
    ? Math.round(subtotal * vatRate * 100) / 100
    : Math.round((subtotal - subtotal / (1 + vatRate)) * 100) / 100;
  const totalAmount = isVATExclusive
    ? Math.round(subtotal * (1 + vatRate) * 100) / 100
    : subtotal;
  return { subtotal, vatAmount, totalAmount };
}
