import React, { useState } from 'react';
import { Sparkles, Download, Copy, RefreshCw, FileText } from 'lucide-react';
import { Product, Supplier, GeneratedContent, GenerationTone } from '../types';
import { mockGenerateContent, mockExportCsv } from '../services/api';

interface GenerateExportPanelProps {
  product: Product | null;
  supplier: Supplier | null;
}

const GenerateExportPanel: React.FC<GenerateExportPanelProps> = ({ product, supplier }) => {
  const [tone, setTone] = useState<GenerationTone>(GenerationTone.STANDARD);
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'faq' | 'ads'>('details');

  const handleGenerate = async () => {
    if (!product || !supplier) return;
    setIsGenerating(true);
    try {
      const data = await mockGenerateContent(product.title, supplier, tone);
      setContent(data);
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    if (content && product) {
      mockExportCsv(content, product.title);
    }
  };

  if (!product || !supplier) {
    return (
      <div className="h-full bg-gray-50 border border-dashed border-gray-300 rounded-xl flex items-center justify-center p-6 text-center text-gray-400">
        <div>
          <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm">Select a supplier to generate AI content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="font-semibold text-gray-800">3. Generate & Export</h2>
        </div>
        
        <div className="flex gap-2 mb-2">
          <select 
            value={tone}
            onChange={(e) => setTone(e.target.value as GenerationTone)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value={GenerationTone.STANDARD}>Standard Tone</option>
            <option value={GenerationTone.LUXURY}>Luxury Tone</option>
            <option value={GenerationTone.CASUAL}>Casual Tone</option>
            <option value={GenerationTone.URGENT}>Urgent/Viral Tone</option>
          </select>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {content ? 'Regenerate' : 'Generate'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50 relative">
        {isGenerating && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <LoaderComponent />
            <p className="mt-4 text-sm font-medium text-brand-600">Writing conversion copy...</p>
          </div>
        )}

        {content ? (
          <div className="p-4 space-y-4">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-2">
              <button onClick={() => setActiveTab('details')} className={`px-4 py-2 text-xs font-medium ${activeTab === 'details' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500'}`}>Product</button>
              <button onClick={() => setActiveTab('faq')} className={`px-4 py-2 text-xs font-medium ${activeTab === 'faq' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500'}`}>FAQ</button>
              <button onClick={() => setActiveTab('ads')} className={`px-4 py-2 text-xs font-medium ${activeTab === 'ads' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500'}`}>Ad Copy</button>
            </div>

            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="group relative bg-white p-3 rounded-lg border border-gray-200">
                  <label className="text-[10px] uppercase text-gray-400 font-semibold mb-1 block">Title</label>
                  <p className="text-sm font-medium text-gray-900">{content.optimized_title}</p>
                  <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded" title="Copy">
                    <Copy className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <label className="text-[10px] uppercase text-gray-400 font-semibold mb-1 block">Description</label>
                  <div className="text-sm text-gray-600 prose prose-sm" dangerouslySetInnerHTML={{ __html: content.description }} />
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <label className="text-[10px] uppercase text-gray-400 font-semibold mb-1 block">Features</label>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {content.bullet_points.map((bp, i) => <li key={i}>{bp}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-3">
                 {content.faq.map((item, i) => (
                   <div key={i} className="bg-white p-3 rounded-lg border border-gray-200">
                     <p className="text-sm font-medium text-gray-900 mb-1">Q: {item.question}</p>
                     <p className="text-sm text-gray-600">A: {item.answer}</p>
                   </div>
                 ))}
              </div>
            )}

             {activeTab === 'ads' && (
              <div className="bg-white p-4 rounded-lg border border-gray-200 relative">
                 <label className="text-[10px] uppercase text-gray-400 font-semibold mb-2 block">Social Ad Copy</label>
                 <p className="text-sm text-gray-800 whitespace-pre-wrap">{content.ad_copy}</p>
              </div>
            )}

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
            <FileText className="w-12 h-12 opacity-20 mb-3" />
            <p className="text-sm text-center">Configure settings and click Generate to create your product page.</p>
          </div>
        )}
      </div>

      {content && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <button 
            onClick={handleExport}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Download className="w-5 h-5" />
            Download Shopify CSV
          </button>
        </div>
      )}
    </div>
  );
};

const LoaderComponent = () => (
    <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
);

export default GenerateExportPanel;