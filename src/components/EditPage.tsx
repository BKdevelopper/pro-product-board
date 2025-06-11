
import { useState } from "react";
import { Search, Edit3, Save, X } from "lucide-react";
import { Product } from "@/types/Product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EditPageProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
}

const EditPage = ({ products, onUpdateProduct }: EditPageProps) => {
  const { toast } = useToast();
  const [searchSerialID, setSearchSerialID] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => 
    product.serialID.toLowerCase().includes(searchSerialID.toLowerCase()) &&
    product.emplacement.toLowerCase().includes(searchLocation.toLowerCase()) &&
    (product.url1.toLowerCase().includes(searchUrl.toLowerCase()) ||
     product.url2.toLowerCase().includes(searchUrl.toLowerCase()))
  );

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setEditFormData({ ...product });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setEditFormData(null);
  };

  const saveChanges = () => {
    if (editFormData) {
      onUpdateProduct(editFormData);
      toast({
        title: "Produit mis à jour",
        description: `Le produit ${editFormData.serialID} a été modifié avec succès.`,
      });
      setEditingProduct(null);
      setEditFormData(null);
    }
  };

  const handleEditChange = (field: keyof Product, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Edit3 className="text-primary" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Modifier des produits</h2>
          <p className="text-muted-foreground text-sm">
            Recherchez et modifiez les informations des produits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Rechercher par numéro de série..."
            value={searchSerialID}
            onChange={(e) => setSearchSerialID(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Rechercher par emplacement..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Rechercher par URL..."
            value={searchUrl}
            onChange={(e) => setSearchUrl(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Edit3 size={48} className="mx-auto mb-4 opacity-50" />
            <p>Aucun produit trouvé</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-lg border border-border p-4"
            >
              {editingProduct?.id === product.id && editFormData ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Modification de {product.serialID}</h3>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={saveChanges}>
                        <Save size={16} className="mr-1" />
                        Sauvegarder
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEditing}>
                        <X size={16} className="mr-1" />
                        Annuler
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Numéro de série</Label>
                      <Input
                        value={editFormData.serialID}
                        onChange={(e) => handleEditChange("serialID", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Emplacement</Label>
                      <Input
                        value={editFormData.emplacement}
                        onChange={(e) => handleEditChange("emplacement", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL Vinted</Label>
                      <Input
                        type="url"
                        value={editFormData.url1}
                        onChange={(e) => handleEditChange("url1", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL La Chiffo</Label>
                      <Input
                        type="url"
                        value={editFormData.url2}
                        onChange={(e) => handleEditChange("url2", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-700">
                      <strong>Note :</strong> L'URL pour LabelEmmaus est générée automatiquement basée sur le numéro de série.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-lg">{product.serialID}</span>
                      <span className="bg-secondary px-2 py-1 rounded text-sm">
                        {product.emplacement}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      URLs: {product.url1 ? (product.url2 ? '3/3 (Vinted + La Chiffo + auto)' : '2/3 (Vinted + auto)') : (product.url2 ? '2/3 (La Chiffo + auto)' : '1/3 (auto)')}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEditing(product)}
                    className="hover:scale-105 transition-transform"
                  >
                    <Edit3 size={16} className="mr-1" />
                    Modifier
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EditPage;
