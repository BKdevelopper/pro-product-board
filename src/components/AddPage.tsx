
import { useState } from "react";
import { Plus } from "lucide-react";
import { Product } from "@/types/Product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AddPageProps {
  onAddProduct: (product: Product) => void;
}

const AddPage = ({ onAddProduct }: AddPageProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: "",
    url1: "",
    url2: "",
    url3: "",
    emplacement: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id || !formData.emplacement) {
      toast({
        title: "Erreur",
        description: "L'ID et l'emplacement sont obligatoires",
        variant: "destructive"
      });
      return;
    }

    onAddProduct(formData);
    setFormData({ id: "", url1: "", url2: "", url3: "", emplacement: "" });
    
    toast({
      title: "Succès",
      description: "Produit ajouté avec succès!",
    });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Plus className="text-primary" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Ajouter un produit</h2>
            <p className="text-muted-foreground text-sm">
              Remplissez les informations du nouveau produit
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">Numéro de série *</Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => handleChange("id", e.target.value)}
              placeholder="Ex: P001, SKU123..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url1">URL Vinted</Label>
            <Input
              id="url1"
              type="url"
              value={formData.url1}
              onChange={(e) => handleChange("url1", e.target.value)}
              placeholder="https://vinted.fr/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url2">URL La Chiffo</Label>
            <Input
              id="url2"
              type="url"
              value={formData.url2}
              onChange={(e) => handleChange("url2", e.target.value)}
              placeholder="https://lachiffo.fr/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url3">URL LabelEmmaus</Label>
            <Input
              id="url3"
              type="url"
              value={formData.url3}
              onChange={(e) => handleChange("url3", e.target.value)}
              placeholder="https://labelemmaus.fr/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emplacement">Emplacement en stock *</Label>
            <Input
              id="emplacement"
              value={formData.emplacement}
              onChange={(e) => handleChange("emplacement", e.target.value)}
              placeholder="Ex: A1-B2, Rayon 3..."
              required
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus size={16} className="mr-2" />
            Ajouter le produit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
