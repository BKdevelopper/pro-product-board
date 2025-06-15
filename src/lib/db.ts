import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Type pour les résultats de requête
export type QueryResult = any[] | mysql.ResultSetHeader;

// Configuration de la connexion à la base de données
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'chiffo_products',
  port: parseInt(process.env.DB_PORT || '3306'),
};

// Fonction pour créer une connexion à la base de données
export async function createConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connexion à la base de données établie');
    return connection;
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    throw error;
  }
}

// Fonction pour exécuter une requête SQL
export async function executeQuery(query: string, params: any[] = []): Promise<QueryResult> {
  let connection;
  try {
    connection = await createConnection();
    const [results] = await connection.execute(query, params);
    return results as QueryResult;
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la requête:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}