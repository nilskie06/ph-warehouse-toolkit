# @ph-itdev/ph-warehouse-toolkit

Philippine warehousing utilities for Node.js — currency, BIR compliance,
inventory management, address lookup, validation, barcode support, and more.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

## Install

```bash
npm install @ph-itdev/ph-warehouse-toolkit
```

## Quick Start

```ts
import { formatPeso, calculateVAT, generateSKU, isWarehouseOpen } from '@ph-itdev/ph-warehouse-toolkit';

// Philippine Peso formatting
formatPeso(125000);        // ₱125,000.00

// BIR VAT calculations (12%)
calculateVAT(1000);        // 120

// SKU generation
generateSKU({ prefix: 'WH', category: 'EL', sequence: 1 });  // WH-EL-000001

// Warehouse scheduling
isWarehouseOpen(new Date());  // true/false
```

## Modules

### 💰 Currency
```ts
import { formatPeso, parsePeso, formatPesoShort, calculateVAT, addVAT, extractVAT } from '@ph-itdev/ph-warehouse-toolkit/currency';

formatPeso(1234567.89);        // ₱1,234,567.89
formatPesoShort(2500000);       // ₱2.5M
calculateVAT(1000);            // 120
addVAT(1000);                  // 1120
extractVAT(1120);              // { vatableAmount: 1000, vatAmount: 120, grossAmount: 1120 }
```

### 📍 Address
```ts
import { getRegions, getProvinces, formatAddress } from '@ph-itdev/ph-warehouse-toolkit/address';

getRegions();           // All 17 PH regions
getProvinces('03');      // ['Aurora', 'Bataan', 'Bulacan', 'Pampanga', ...]
formatAddress({ street: '123 Rizal Ave', barangay: '123', city: 'Makati City', province: 'Metro Manila', zipCode: '1200' });
// '123 Rizal Ave, Brgy. 123, Makati City, Metro Manila, 1200'
```

### ✅ Validation
```ts
import { isValidPHPhone, isValidPHMobile, isValidTIN, isValidPHZipCode } from '@ph-itdev/ph-warehouse-toolkit/validation';

isValidPHPhone('09171234567');    // true (Globe mobile)
isValidPHMobile('09171234567');  // true
isValidTIN('123-456-789-000');   // true
isValidPHZipCode('1200');        // true
```

### 📦 Inventory
```ts
import { generateSKU, parseSKU, calculateReorderPoint, calculateEOQ, calculateStockValue } from '@ph-itdev/ph-warehouse-toolkit/inventory';

generateSKU({ prefix: 'WH', category: 'EL', sequence: 1 });  // 'WH-EL-000001'
parseSKU('WH-EL-000042');  // { prefix: 'WH', category: 'EL', sequence: 42 }
calculateReorderPoint(50, 7);       // 350
calculateEOQ(1000, 50, 5);          // ~141
calculateStockValue([{ quantity: 100, unitCost: 50 }, { quantity: 50, unitCost: 120 }]);  // 11000
```

### 🏷️ Barcode
```ts
import { calculateEAN13CheckDigit, validateEAN13, generateCode128Data } from '@ph-itdev/ph-warehouse-toolkit/barcode';

calculateEAN13CheckDigit('400638133393');  // 1
validateEAN13('4006381333931');           // true
```

### 📄 Documents
```ts
import { generateGRNNumber, generateDRNumber, generateReferenceNumber } from '@ph-itdev/ph-warehouse-toolkit/documents';

generateGRNNumber({ warehouseCode: 'WH01', date: new Date('2026-06-15'), sequence: 1 });
// 'GRN-WH01-20260615-0001'
generateDRNumber({ warehouseCode: 'WH01', date: new Date('2026-06-15'), sequence: 1 });
// 'DR-WH01-20260615-0001'
```

### 🎌 Holidays
```ts
import { getPhilippineHolidays, isHoliday, isWarehouseOpen } from '@ph-itdev/ph-warehouse-toolkit/holidays';

getPhilippineHolidays(2026);              // Full list of PH holidays
isHoliday(new Date('2026-01-01'));         // true (New Year's Day)
isWarehouseOpen(new Date());              // closed on Sundays + holidays
isWarehouseOpen(new Date(), { closedDays: [] });  // open every day except holidays
```

## Why This Package?

Warehouse management in the Philippines has unique requirements:
- **Philippine Peso (₱)** — proper currency formatting with peso sign
- **BIR Compliance** — 12% VAT calculations, TIN validation
- **PH Address System** — regions, provinces, cities, barangays
- **Local Holidays** — regular + special non-working holidays for scheduling
- **SKU & Inventory** — generate warehouse SKUs, calculate reorder points
- **Document Numbering** — GRN, DR, and PO reference numbers

## License

MIT © Nilo Besingga
