import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { executeQuery, QueryResult } from '../lib/db';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Route pour récupérer tous les produits
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await executeQuery('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

// Route pour récupérer un produit par son ID
app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = await executeQuery('SELECT * FROM products WHERE id = ?', [id]);
    
    if (Array.isArray(products) && products.length === 0) {
      res.status(404).json({ error: 'Produit non trouvé' });
      return;
    }
    
    // Assertion de type pour indiquer à TypeScript que products est un tableau
    const productsArray = products as any[];
    res.json(productsArray[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
  }
});

// Route pour créer un nouveau produit
app.post('/api/products', async (req: Request, res: Response) => {
  try {
    const { serialID, url1, url2, emplacement } = req.body;
    
    if (!emplacement) {
      res.status(400).json({ error: 'L\'emplacement est obligatoire' });
      return;
    }
    
    const result = await executeQuery(
      'INSERT INTO products (serialID, url1, url2, emplacement) VALUES (?, ?, ?, ?)',
      [serialID, url1, url2, emplacement]
    );
    
    // Assertion de type pour accéder à insertId
    const resultHeader = result as mysql.ResultSetHeader;
    const insertedId = resultHeader.insertId;
    const newProduct = await executeQuery('SELECT * FROM products WHERE id = ?', [insertedId]);
    
    // Assertion de type pour indiquer à TypeScript que newProduct est un tableau
    const newProductArray = newProduct as any[];
    res.status(201).json(newProductArray[0]);
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).json({ error: 'Erreur lors de la création du produit' });
  }
});

// Route pour mettre à jour un produit
app.put('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { serialID, url1, url2, emplacement } = req.body;
    
    if (!emplacement) {
      res.status(400).json({ error: 'L\'emplacement est obligatoire' });
      return;
    }
    
    await executeQuery(
      'UPDATE products SET serialID = ?, url1 = ?, url2 = ?, emplacement = ? WHERE id = ?',
      [serialID, url1, url2, emplacement, id]
    );
    
    const updatedProduct = await executeQuery('SELECT * FROM products WHERE id = ?', [id]);
    
    if (Array.isArray(updatedProduct) && updatedProduct.length === 0) {
      res.status(404).json({ error: 'Produit non trouvé' });
      return;
    }
    
    // Assertion de type pour indiquer à TypeScript que updatedProduct est un tableau
    const updatedProductArray = updatedProduct as any[];
    res.json(updatedProductArray[0]);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
  }
});

// Route pour supprimer un produit
app.delete('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await executeQuery('SELECT * FROM products WHERE id = ?', [id]);
    
    if (Array.isArray(product) && product.length === 0) {
      res.status(404).json({ error: 'Produit non trouvé' });
      return;
    }
    
    await executeQuery('DELETE FROM products WHERE id = ?', [id]);
    
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur API démarré sur le port ${PORT}`);
});

export default app;
