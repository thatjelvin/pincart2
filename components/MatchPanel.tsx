import React, { useState, useEffect } from 'react';
import { PackageSearch, Loader2, DollarSign, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { Product, Supplier } from '../types';
import { mockMatchSuppliers } from '../services/api';

interface MatchPanelProps {
  selectedProduct: Product | null;
  onSelectSupplier: (supplier: Supplier) => void;
  selectedSupplierId?: string;
}

const MatchPanel: React.FC<MatchPanelProps> = ({ selectedProduct, onSelectSupplier, selectedSupplierId }) => {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [lastSearchedProductId, setLastSearchedProductId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProduct && selectedProduct.id !== lastSearchedProductId) {
      const fetchSuppliers = async () => {
        setLoading(true);
        setSuppliers([]); // Clear previous results
        setError(null);
        try {
          const data = await mockMatchSuppliers(selectedProduct.title);
          setSuppliers(data);
          setLastSearchedProductId(selectedProduct.id);
        } catch (error) {
          console.error("Match failed", error);
          setError("Supplier matching failed. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchSuppliers();
    }
  }, [selectedProduct, lastSearchedProductId]);

  if (!selectedProduct) {
    return (
      <div className="h-full bg-gray-50 border border-dashed border-gray-300 rounded-xl flex items-center justify-center p-6 text-center text-gray-400">
        <div>
          <PackageSearch className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm">Select a product from the Discover panel to find suppliers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-orange-100 rounded-lg">
            <PackageSearch className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="font-semibold text-gray-800">2. Match Supplier</h2>
        </div>
        <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
            <img src={selectedProduct.image_url} alt="" className="w-10 h-10 rounded object-cover" />
            <div className="min-w-0">
                <p className="text-xs text-gray-500 uppercase font-semibold">Selected</p>
                <p className="text-sm font-medium text-gray-800 truncate">{selectedProduct.title}</p>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gray-50/50">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-3">
            <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
            <p className="text-sm text-gray-500">Scanning AliExpress & CJ...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-48">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {suppliers.length} Suppliers Found
            </p>
            {suppliers.map((supplier) => (
              <div 
                key={supplier.id}
                onClick={() => onSelectSupplier(supplier)}
                className={`relative p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md bg-white ${
                  selectedSupplierId === supplier.id
                    ? 'ring-2 ring-brand-500 border-transparent bg-brand-50/30'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    supplier.source === 'AliExpress' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {supplier.source}
                  </span>
                  {selectedSupplierId === supplier.id && (
                    <CheckCircle className="w-5 h-5 text-brand-600 fill-brand-100" />
                  )}
                </div>

                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-3">
                  {supplier.product_title}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Cost</p>
                    <p className="font-semibold text-gray-900">${supplier.unit_cost.toFixed(2)}</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-xs text-green-600">Margin</p>
                    <p className="font-bold text-green-700">{supplier.estimated_margin_pct}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-400">Ship: {supplier.shipping_regions.join(', ')}</span>
                    <a href={supplier.product_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-xs text-brand-600 hover:underline flex items-center gap-1">
                        View <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchPanel;