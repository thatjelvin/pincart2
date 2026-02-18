import React, { useState } from 'react';
import { Search, Pin, Loader2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { mockSearchProducts } from '../services/api';

interface DiscoverPanelProps {
  onSelectProduct: (product: Product) => void;
  selectedProductId?: string;
}

const DiscoverPanel: React.FC<DiscoverPanelProps> = ({ onSelectProduct, selectedProductId }) => {
  const [keyword, setKeyword] = useState('');
  const [region, setRegion] = useState('US');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    try {
      const data = await mockSearchProducts(keyword);
      setResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <Pin className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="font-semibold text-gray-800">1. Discover</h2>
        </div>
        <form onSubmit={handleSearch} className="space-y-3">
          <input
            type="text"
            placeholder="Search trends (e.g. 'home decor')..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="flex gap-2">
            <select 
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-500 outline-none"
            >
              <option value="US">🇺🇸 US</option>
              <option value="UK">🇬🇧 UK</option>
              <option value="Global">🌍 Global</option>
            </select>
            <button
              type="submit"
              disabled={loading || !keyword}
              className="flex-1 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gray-50/50">
        {!hasSearched && !loading && (
          <div className="text-center py-10 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Enter a keyword to find viral products on Pinterest.</p>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        )}

        {hasSearched && !loading && results.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No results found. Try a different keyword.
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {results.map((product) => (
            <div 
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className={`group relative rounded-lg overflow-hidden border cursor-pointer transition-all hover:shadow-md ${
                selectedProductId === product.id 
                  ? 'ring-2 ring-brand-500 border-transparent' 
                  : 'border-gray-200 hover:border-brand-300'
              }`}
            >
              <div className="aspect-[3/4] relative">
                <img 
                  src={product.image_url} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-white text-xs font-medium line-clamp-2">{product.title}</p>
                </div>
              </div>
              <div className="p-2 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Pin className="w-3 h-3" /> {product.engagement_score}
                  </span>
                  {selectedProductId === product.id && (
                    <span className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverPanel;