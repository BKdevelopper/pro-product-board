
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import AddPage from "@/components/AddPage";
import DeletePage from "@/components/DeletePage";
import EditPage from "@/components/EditPage";
import { Product } from "@/types/Product";
import { fetchProducts, deleteProduct as apiDeleteProduct } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  // Charger les produits depuis l'API au chargement de la page
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits depuis la base de données",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [toast]);

  const addProduct = (productData: Product) => {
    // Le produit est déjà ajouté à la base de données via l'API dans le composant AddPage
    // Nous mettons simplement à jour l'état local
    setProducts(prev => [...prev, productData]);
  };

  const deleteProduct = async (id: number) => {
    try {
      await apiDeleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Succès",
        description: "Produit supprimé avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit",
        variant: "destructive"
      });
    }
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      );
    }
    
    switch (activeTab) {
      case "home":
        return <HomePage products={products} />;
      case "add":
        return <AddPage onAddProduct={addProduct} />;
      case "delete":
        return <DeletePage products={products} onDeleteProduct={deleteProduct} />;
      case "edit":
        return <EditPage products={products} onUpdateProduct={updateProduct} />;
      default:
        return <HomePage products={products} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 text-foreground flex flex-col">
      <div className="flex-1 p-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/lovable-uploads/782bfed3-781d-4947-8bfa-7c1e46e08822.png" 
                alt="La Chiffo Logo" 
                className="h-12"
              />
            </div>
            <div className="gradient-card rounded-2xl p-8 mb-6 shadow-xl">
              <h1 className="text-4xl font-bold mb-2 text-center">
                Gestion des Produits
              </h1>
              <p className="text-purple-100 text-lg text-center">
                Gérez votre inventaire et vos liens de vente en ligne de manière professionnelle
              </p>
            </div>
          </header>
          
          {renderContent()}
        </div>
      </div>
      
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
