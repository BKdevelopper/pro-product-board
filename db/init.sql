-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS chiffo_products;

-- Utilisation de la base de données
USE chiffo_products;

-- Création de la table products
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Champs spécifiques à l'application existante
  serialID VARCHAR(50),
  url1 VARCHAR(255),
  url2 VARCHAR(255),
  emplacement VARCHAR(100)
);

-- Insertion de quelques données de test
INSERT INTO products (serialID, url1, url2, emplacement)
VALUES 
  ('P001', 'https://vinted.fr/product1', 'https://lachiffo.fr/product1', 'A1-B2'),
  ('P002', '', '', 'C3-D4');