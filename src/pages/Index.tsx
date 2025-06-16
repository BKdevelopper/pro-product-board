
import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import AddPage from "@/components/AddPage";
import DeletePage from "@/components/DeletePage";
import EditPage from "@/components/EditPage";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { products, loading, addProduct, deleteProduct, updateProduct } = useProducts();

  const renderContent = () => {
    if (loading && activeTab === "home") {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-purple-600">Chargement des produits...</div>
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
