
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
  onDeleteProduct: (id: number) => Promise<boolean>;
}

const DeletePage = ({ products, onDeleteProduct }: DeletePageProps) => {
  const { toast } = useToast();
  const [searchSerialID, setSearchSerialID] = useState("");
  const [searchEmplacement, setSearchEmplacement] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredProducts = products.filter(product => 
    product.serialID.toLowerCase().includes(searchSerialID.toLowerCase()) &&
    product.emplacement.toLowerCase().includes(searchEmplacement.toLowerCase()) &&
    (product.url1.toLowerCase().includes(searchUrl.toLowerCase()) ||
     product.url2.toLowerCase().includes(searchUrl.toLowerCase()))
  );

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete && !isDeleting) {
      setIsDeleting(true);
      const success = await onDeleteProduct(productToDelete.id);
      
      if (success) {
        toast({
          title: "Produit supprimé",
          description: `Le produit ${productToDelete.serialID} a été supprimé avec succès.`,
        });
      }
      
      setIsDeleting(false);
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={16} />
          <Input
            placeholder="Rechercher par numéro de série..."
            value={searchSerialID}
            onChange={(e) => setSearchSerialID(e.target.value)}
            className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={16} />
          <Input
            placeholder="Rechercher par emplacement..."
            value={searchEmplacement}
            onChange={(e) => setSearchEmplacement(e.target.value)}
            className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={16} />
          <Input
            placeholder="Rechercher par URL..."
            value={searchUrl}
            onChange={(e) => setSearchUrl(e.target.value)}
            className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>
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
                  URLs: {product.url1 ? (product.url2 ? '3/3 (Vinted + La Chiffo + auto)' : '2/3 (Vinted + auto)') : (product.url2 ? '2/3 (La Chiffo + auto)' : '1/3 (auto)')}
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
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeletePage;
