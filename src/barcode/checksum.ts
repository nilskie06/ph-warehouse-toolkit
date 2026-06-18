export function calculateEAN13CheckDigit(digits12: string): number {
  const cleaned = digits12.replace(/\D/g, '');
  if (cleaned.length !== 12) {
    throw new Error('EAN-13 requires exactly 12 digits (without check digit)');
  }
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const d = parseInt(cleaned[i], 10);
    sum += i % 2 === 0 ? d : d * 3;
  }
  return (10 - (sum % 10)) % 10;
}

export function validateEAN13(ean: string): boolean {
  const cleaned = ean.replace(/\D/g, '');
  if (cleaned.length !== 13) return false;
  const expectedCheck = calculateEAN13CheckDigit(cleaned.slice(0, 12));
  return parseInt(cleaned[12], 10) === expectedCheck;
}

export function generateCode128Data(data: string): string {
  return data.trim();
}
