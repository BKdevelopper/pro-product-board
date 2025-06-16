
-- Créer la table pour les produits
CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  serial_id TEXT,
  url1 TEXT,
  url2 TEXT,
  emplacement TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ajouter Row Level Security (RLS) - pour l'instant on permet tout
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre toutes les opérations (lecture, écriture, modification, suppression)
CREATE POLICY "Allow all operations on products" 
  ON public.products 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);
