
export interface Product {
  id: number; // Auto-incrementing ID (internal use only)
  serialID: string; // Serial number displayed to users
  url1: string; // Vinted
  emplacement: string;
}

// URL generation functions
export const generateLabelEmmausUrl = (serialID: string): string => {
  return `https://labelemmaus.fr/product?=${serialID}`;
};

export const generateLaChiffoUrl = (serialID: string): string => {
  return `https://lachiffo.fr/product?=${serialID}`;
};
