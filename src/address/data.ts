export interface Region {
  code: string;
  name: string;
  provinces: string[];
}

export interface PhilippineAddress {
  region?: string;
  province?: string;
  city?: string;
  barangay?: string;
  zipCode?: string;
  street?: string;
  building?: string;
  floor?: string;
  unit?: string;
}

export const REGIONS: Region[] = [
  { code: 'NCR', name: 'National Capital Region', provinces: ['Metro Manila'] },
  { code: '01', name: 'Ilocos Region', provinces: ['Ilocos Norte', 'Ilocos Sur', 'La Union', 'Pangasinan'] },
  { code: '02', name: 'Cagayan Valley', provinces: ['Batanes', 'Cagayan', 'Isabela', 'Nueva Vizcaya', 'Quirino'] },
  { code: '03', name: 'Central Luzon', provinces: ['Aurora', 'Bataan', 'Bulacan', 'Nueva Ecija', 'Pampanga', 'Tarlac', 'Zambales'] },
  { code: '04A', name: 'CALABARZON', provinces: ['Batangas', 'Cavite', 'Laguna', 'Quezon', 'Rizal'] },
  { code: '04B', name: 'MIMAROPA', provinces: ['Marinduque', 'Occidental Mindoro', 'Oriental Mindoro', 'Palawan', 'Romblon'] },
  { code: '05', name: 'Bicol Region', provinces: ['Albay', 'Camarines Norte', 'Camarines Sur', 'Catanduanes', 'Masbate', 'Sorsogon'] },
  { code: '06', name: 'Western Visayas', provinces: ['Aklan', 'Antique', 'Capiz', 'Guimaras', 'Iloilo', 'Negros Occidental'] },
  { code: '07', name: 'Central Visayas', provinces: ['Bohol', 'Cebu', 'Negros Oriental', 'Siquijor'] },
  { code: '08', name: 'Eastern Visayas', provinces: ['Biliran', 'Eastern Samar', 'Leyte', 'Northern Samar', 'Samar', 'Southern Leyte'] },
  { code: '09', name: 'Zamboanga Peninsula', provinces: ['Zamboanga del Norte', 'Zamboanga del Sur', 'Zamboanga Sibugay'] },
  { code: '10', name: 'Northern Mindanao', provinces: ['Bukidnon', 'Camiguin', 'Lanao del Norte', 'Misamis Occidental', 'Misamis Oriental'] },
  { code: '11', name: 'Davao Region', provinces: ['Davao de Oro', 'Davao del Norte', 'Davao del Sur', 'Davao Occidental', 'Davao Oriental'] },
  { code: '12', name: 'SOCCSKSARGEN', provinces: ['Cotabato', 'Sarangani', 'South Cotabato', 'Sultan Kudarat'] },
  { code: '13', name: 'Caraga', provinces: ['Agusan del Norte', 'Agusan del Sur', 'Dinagat Islands', 'Surigao del Norte', 'Surigao del Sur'] },
  { code: 'BARMM', name: 'Bangsamoro Autonomous Region in Muslim Mindanao', provinces: ['Basilan', 'Lanao del Sur', 'Maguindanao', 'Sulu', 'Tawi-Tawi'] },
  { code: 'CAR', name: 'Cordillera Administrative Region', provinces: ['Abra', 'Apayao', 'Benguet', 'Ifugao', 'Kalinga', 'Mountain Province'] },
];
