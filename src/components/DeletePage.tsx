
import { useState } from "react";
import { Search, Trash2, AlertTriangle } from "lucide-react";
import { Product } from "@/types/Product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeletePageProps {
  products: Product[];
  onDeleteProduct: (id: number) => void;
}

const DeletePage = ({ products, onDeleteProduct }: DeletePageProps) => {
  const { toast } = useToast();
  const [searchSerialID, setSearchSerialID] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => 
    product.serialID.toLowerCase().includes(searchSerialID.toLowerCase())
  );

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      onDeleteProduct(productToDelete.id);
      toast({
        title: "Produit supprimé",
        description: `Le produit ${productToDelete.serialID} a été supprimé avec succès.`,
      });
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-destructive/20 p-2 rounded-lg">
          <Trash2 className="text-destructive" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Supprimer des produits</h2>
          <p className="text-muted-foreground text-sm">
            Recherchez et supprimez des produits de l'inventaire
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Rechercher par numéro de série..."
          value={searchSerialID}
          onChange={(e) => setSearchSerialID(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Trash2 size={48} className="mx-auto mb-4 opacity-50" />
            <p>Aucun produit trouvé</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-lg border border-border p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-lg">{product.serialID}</span>
                  <span className="bg-secondary px-2 py-1 rounded text-sm">
                    {product.emplacement}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  URLs: {[product.url1, product.url2, product.url3].filter(Boolean).length}/3
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteClick(product)}
                className="hover:scale-105 transition-transform"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="text-destructive" size={20} />
              Confirmer la suppression
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le produit "{productToDelete?.serialID}" ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeletePage;
