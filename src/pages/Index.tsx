
import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import AddPage from "@/components/AddPage";
import DeletePage from "@/components/DeletePage";
import EditPage from "@/components/EditPage";
import { Product } from "@/types/Product";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [products, setProducts] = useState<Product[]>([
    {
      id: "P001",
      url1: "https://vinted.fr/product1",
      url2: "https://lachiffo.fr/product1",
      url3: "https://labelemmaus.fr/product1",
      emplacement: "A1-B2"
    },
    {
      id: "P002",
      url1: "https://vinted.fr/product2",
      url2: "",
      url3: "https://labelemmaus.fr/product2",
      emplacement: "C3-D4"
    }
  ]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const renderContent = () => {
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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex-1 p-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Gestion des Produits
            </h1>
            <p className="text-muted-foreground">
              Gérez votre inventaire et vos liens de vente en ligne
            </p>
          </header>
          
          {renderContent()}
        </div>
      </div>
      
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
