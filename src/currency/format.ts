export interface FormatPesoOptions {
  decimals?: number;
  showSign?: boolean;
}

export function formatPeso(amount: number, options: FormatPesoOptions = {}): string {
  const { decimals = 2 } = options;
  const sign = amount < 0 ? '-' : '';
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('en-PH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${sign}\u20B1${formatted}`;
}

export function parsePeso(value: string): number {
  const cleaned = value.replace(/[\u20B1,\s]/g, '');
  return Number(cleaned);
}

export function formatPesoShort(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  if (abs >= 1_000_000) {
    const millions = abs / 1_000_000;
    return `${sign}\u20B1${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    const thousands = abs / 1_000;
    return `${sign}\u20B1${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}K`;
  }
  return `${sign}\u20B1${abs}`;
}
