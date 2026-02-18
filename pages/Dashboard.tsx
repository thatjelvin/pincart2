import React, { useState } from 'react';
import DiscoverPanel from '../components/DiscoverPanel';
import MatchPanel from '../components/MatchPanel';
import GenerateExportPanel from '../components/GenerateExportPanel';
import { Product, Supplier } from '../types';

const Dashboard: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // Workflow handlers
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSupplier(null); // Reset downstream pipeline
  };

  const handleSupplierSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[600px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Column 1: Discover */}
        <div className="h-full min-h-[400px]">
          <DiscoverPanel 
            onSelectProduct={handleProductSelect} 
            selectedProductId={selectedProduct?.id} 
          />
        </div>

        {/* Column 2: Match */}
        <div className="h-full min-h-[400px]">
          <MatchPanel 
            selectedProduct={selectedProduct} 
            onSelectSupplier={handleSupplierSelect}
            selectedSupplierId={selectedSupplier?.id}
          />
        </div>

        {/* Column 3: Generate */}
        <div className="h-full min-h-[400px]">
          <GenerateExportPanel 
            product={selectedProduct} 
            supplier={selectedSupplier} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;