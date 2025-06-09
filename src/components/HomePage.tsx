
import { useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import { Product } from "@/types/Product";
import { Input } from "@/components/ui/input";

interface HomePageProps {
  products: Product[];
}

const HomePage = ({ products }: HomePageProps) => {
  const [searchId, setSearchId] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredProducts = products.filter(product => 
    product.id.toLowerCase().includes(searchId.toLowerCase()) &&
    product.emplacement.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const openUrl = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const formatUrlDisplay = (url: string, platform: string) => {
    if (!url) {
      return <span className="text-muted-foreground">Non disponible</span>;
    }
    return (
      <button
        onClick={() => openUrl(url)}
        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
      >
        <span className="truncate max-w-[120px]">{platform}</span>
        <ExternalLink size={14} />
      </button>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Rechercher par numéro de série..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
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
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="product-table">
            <thead>
              <tr>
                <th>Numéro de série</th>
                <th>Vinted</th>
                <th>La Chiffo</th>
                <th>LabelEmmaus</th>
                <th>Emplacement</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted-foreground py-8">
                    Aucun produit trouvé
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="font-medium">{product.id}</td>
                    <td>{formatUrlDisplay(product.url1, "Vinted")}</td>
                    <td>{formatUrlDisplay(product.url2, "La Chiffo")}</td>
                    <td>{formatUrlDisplay(product.url3, "LabelEmmaus")}</td>
                    <td>
                      <span className="bg-secondary px-2 py-1 rounded text-sm">
                        {product.emplacement}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Total: {filteredProducts.length} produit(s)
      </div>
    </div>
  );
};

export default HomePage;
