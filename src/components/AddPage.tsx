
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
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="gradient-card p-3 rounded-xl">
            <Plus className="text-white" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-900">Ajouter un produit</h2>
            <p className="text-purple-600">
              Remplissez les informations du nouveau produit
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="id" className="text-purple-900 font-semibold">Numéro de série *</Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => handleChange("id", e.target.value)}
              placeholder="Ex: P001, SKU123..."
              required
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url1" className="text-purple-900 font-semibold">URL Vinted</Label>
            <Input
              id="url1"
              type="url"
              value={formData.url1}
              onChange={(e) => handleChange("url1", e.target.value)}
              placeholder="https://vinted.fr/..."
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url2" className="text-purple-900 font-semibold">URL La Chiffo</Label>
            <Input
              id="url2"
              type="url"
              value={formData.url2}
              onChange={(e) => handleChange("url2", e.target.value)}
              placeholder="https://lachiffo.fr/..."
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url3" className="text-purple-900 font-semibold">URL LabelEmmaus</Label>
            <Input
              id="url3"
              type="url"
              value={formData.url3}
              onChange={(e) => handleChange("url3", e.target.value)}
              placeholder="https://labelemmaus.fr/..."
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emplacement" className="text-purple-900 font-semibold">Emplacement en stock *</Label>
            <Input
              id="emplacement"
              value={formData.emplacement}
              onChange={(e) => handleChange("emplacement", e.target.value)}
              placeholder="Ex: A1-B2, Rayon 3..."
              required
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg">
            <Plus size={18} className="mr-2" />
            Ajouter le produit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
