# Configuration de la base de données MySQL

Ce document explique comment configurer la base de données MySQL pour l'application Pro Product Board.

## Prérequis

- MySQL Server installé sur votre machine ou un serveur accessible
- Accès à un client MySQL (ligne de commande ou GUI comme MySQL Workbench)

## Étapes d'installation

1. **Créer la base de données et les tables**

   Exécutez le script SQL fourni dans le fichier `init.sql` :

   ```bash
   mysql -u root -p < db/init.sql
   ```

   Ou ouvrez le fichier `init.sql` dans votre client MySQL et exécutez-le.

2. **Configurer les variables d'environnement**

   Modifiez le fichier `.env` à la racine du projet avec vos informations de connexion :

   ```
   DB_HOST=localhost
   DB_USER=votre_utilisateur
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=chiffo_products
   DB_PORT=3306
   ```

## Structure de la base de données

La base de données contient une table principale `products` avec les colonnes suivantes :

- `id` : Identifiant unique auto-incrémenté (clé primaire)
- `created_at` : Date et heure de création du produit
- `serialID` : Numéro de série du produit
- `url1` : URL Vinted
- `url2` : URL La Chiffo
- `emplacement` : Emplacement en stock

## Utilisation

Une fois la base de données configurée, lancez l'application avec :

```bash
npm run dev
```

Cela démarrera à la fois le serveur frontend (Vite) et le serveur API qui se connecte à la base de données MySQL.