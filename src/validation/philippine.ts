export function isValidPHPhone(phone: string): boolean {
  const mobilePattern = /^09\d{9}$/;
  // Landline: (0X) XXXX-XXXX or 0X-XXXX-XXXX or (0X)XXXX-XXXX
  const landlinePattern = /^\(0\d\)\s?\d{3,4}[-]?\d{4}$/;
  return mobilePattern.test(phone.replace(/[\s-]/g, '')) || landlinePattern.test(phone);
}

export function isValidPHMobile(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^09\d{9}$/.test(cleaned);
}

export function isValidTIN(tin: string): boolean {
  const cleaned = tin.replace(/-/g, '');
  // Standard: 12 digits, Branch: 15 digits (12 + 3)
  return /^\d{12}$/.test(cleaned) || /^\d{15}$/.test(cleaned);
}

export function isValidPHZipCode(zip: string): boolean {
  return /^\d{4}$/.test(zip);
}
