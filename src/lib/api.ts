import { Product } from '@/types/Product';

const API_URL = 'http://localhost:3001/api';

// Fonction pour récupérer tous les produits
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des produits');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}

// Fonction pour récupérer un produit par son ID
export async function fetchProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du produit');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}

// Fonction pour créer un nouveau produit
export async function createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la création du produit');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}

// Fonction pour mettre à jour un produit
export async function updateProduct(id: number, product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du produit');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}

// Fonction pour supprimer un produit
export async function deleteProduct(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du produit');
    }
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}