export interface SKUGenerateOptions {
  prefix: string;
  category: string;
  sequence: number;
}

export interface SKUFormatOptions {
  separator?: string;
  padding?: number;
}

export function generateSKU(
  { prefix, category, sequence }: SKUGenerateOptions,
  options: SKUFormatOptions = {}
): string {
  const { separator = '-', padding = 6 } = options;
  const padded = String(sequence).padStart(padding, '0');
  return `${prefix}${separator}${category}${separator}${padded}`;
}

export interface ParsedSKU {
  prefix: string;
  category: string;
  sequence: number;
}

export function parseSKU(sku: string): ParsedSKU | null {
  const parts = sku.split('-');
  if (parts.length !== 3) return null;
  const seq = parseInt(parts[2], 10);
  if (isNaN(seq)) return null;
  return { prefix: parts[0], category: parts[1], sequence: seq };
}

export function validateSKUFormat(sku: string): boolean {
  return parseSKU(sku) !== null;
}
