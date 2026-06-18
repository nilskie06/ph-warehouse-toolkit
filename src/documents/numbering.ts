export interface NumberingOptions {
  warehouseCode: string;
  date?: Date;
  sequence: number;
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

export function generateGRNNumber(opts: NumberingOptions): string {
  const dateStr = formatDate(opts.date ?? new Date());
  const seq = String(opts.sequence).padStart(4, '0');
  return `GRN-${opts.warehouseCode}-${dateStr}-${seq}`;
}

export function generateDRNumber(opts: NumberingOptions): string {
  const dateStr = formatDate(opts.date ?? new Date());
  const seq = String(opts.sequence).padStart(4, '0');
  return `DR-${opts.warehouseCode}-${dateStr}-${seq}`;
}

export function generateReferenceNumber(
  prefix: string,
  sequence: number,
  date?: Date
): string {
  const seq = String(sequence).padStart(6, '0');
  if (date) {
    return `${prefix}-${formatDate(date)}-${seq}`;
  }
  return `${prefix}-${seq}`;
}
