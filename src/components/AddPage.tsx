
import { useState } from "react";
import { Plus } from "lucide-react";
import { Product } from "@/types/Product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AddPageProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

const AddPage = ({ onAddProduct }: AddPageProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    serialID: "",
    url1: "",
    emplacement: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.serialID || !formData.emplacement) {
      toast({
        title: "Erreur",
        description: "Le numéro de série et l'emplacement sont obligatoires",
        variant: "destructive"
      });
      return;
    }

    onAddProduct(formData);
    setFormData({ serialID: "", url1: "", emplacement: "" });
    
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
            <Label htmlFor="serialID" className="text-purple-900 font-semibold">Numéro de série *</Label>
            <Input
              id="serialID"
              value={formData.serialID}
              onChange={(e) => handleChange("serialID", e.target.value)}
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

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-700">
              <strong>Note :</strong> Les URLs pour La Chiffo et LabelEmmaus seront générées automatiquement basées sur le numéro de série.
            </p>
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
