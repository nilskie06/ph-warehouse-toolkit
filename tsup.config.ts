import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    currency: 'src/currency/index.ts',
    address: 'src/address/index.ts',
    compliance: 'src/compliance/index.ts',
    inventory: 'src/inventory/index.ts',
    validation: 'src/validation/index.ts',
    barcode: 'src/barcode/index.ts',
    documents: 'src/documents/index.ts',
    holidays: 'src/holidays/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
});
