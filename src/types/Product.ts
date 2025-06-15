
export interface Product {
  id: number; // Auto-incrementing ID (internal use only)
  serialID: string; // Serial number displayed to users
  url1: string; // Vinted
  url2: string; // La Chiffo
  emplacement: string;
  created_at?: string;
}

// URL generation functions
export const generateLabelEmmausUrl = (serialID: string): string => {
  if (!serialID || serialID.trim() === '') {
    return '';
  }
  return `https://labo.label-emmaus.co/annonce/catalogue?&q=sku:${serialID}&status=&page=1&tri=0`;
 
};
