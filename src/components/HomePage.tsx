
import { useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import { Product, generateLabelEmmausUrl, generateLaChiffoUrl } from "@/types/Product";
import { Input } from "@/components/ui/input";

interface HomePageProps {
  products: Product[];
}

const HomePage = ({ products }: HomePageProps) => {
  const [searchSerialID, setSearchSerialID] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredProducts = products.filter(product => 
    product.serialID.toLowerCase().includes(searchSerialID.toLowerCase()) &&
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
        className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors font-medium"
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
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
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
                    <td className="font-semibold text-purple-900">{product.serialID}</td>
                    <td>{formatUrlDisplay(product.url1, "Vinted")}</td>
                    <td>{formatUrlDisplay(generateLaChiffoUrl(product.serialID), "La Chiffo")}</td>
                    <td>{formatUrlDisplay(generateLabelEmmausUrl(product.serialID), "LabelEmmaus")}</td>
                    <td>
                      <span className="gradient-light px-3 py-1 rounded-full text-sm font-medium text-purple-700">
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

      <div className="text-sm text-purple-600 font-medium">
        Total: {filteredProducts.length} produit(s)
      </div>
    </div>
  );
};

export default HomePage;
