
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Charger les produits depuis la base de données
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits",
          variant: "destructive"
        });
        return;
      }

      // Transformer les données de la base vers le format de l'application
      const transformedProducts: Product[] = data.map(item => ({
        id: item.id,
        serialID: item.serial_id || '',
        url1: item.url1 || '',
        url2: item.url2 || '',
        emplacement: item.emplacement
      }));

      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error in fetchProducts:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un produit
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          serial_id: productData.serialID,
          url1: productData.url1,
          url2: productData.url2,
          emplacement: productData.emplacement
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding product:', error);
        toast({
          title: "Erreur",
          description: "Impossible d'ajouter le produit",
          variant: "destructive"
        });
        return false;
      }

      // Ajouter le nouveau produit à la liste locale
      const newProduct: Product = {
        id: data.id,
        serialID: data.serial_id || '',
        url1: data.url1 || '',
        url2: data.url2 || '',
        emplacement: data.emplacement
      };

      setProducts(prev => [newProduct, ...prev]);
      return true;
    } catch (error) {
      console.error('Error in addProduct:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
      return false;
    }
  };

  // Supprimer un produit
  const deleteProduct = async (id: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "Erreur", 
          description: "Impossible de supprimer le produit",
          variant: "destructive"
        });
        return false;
      }

      // Retirer le produit de la liste locale
      setProducts(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite", 
        variant: "destructive"
      });
      return false;
    }
  };

  // Mettre à jour un produit
  const updateProduct = async (updatedProduct: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          serial_id: updatedProduct.serialID,
          url1: updatedProduct.url1,
          url2: updatedProduct.url2,
          emplacement: updatedProduct.emplacement,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedProduct.id);

      if (error) {
        console.error('Error updating product:', error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le produit",
          variant: "destructive"
        });
        return false;
      }

      // Mettre à jour le produit dans la liste locale
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      return true;
    } catch (error) {
      console.error('Error in updateProduct:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
      return false;
    }
  };

  // Charger les produits au montage du composant
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    addProduct,
    deleteProduct,
    updateProduct,
    refreshProducts: fetchProducts
  };
};
