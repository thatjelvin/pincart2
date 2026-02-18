import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Zap, Globe, Package, Check } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-gray-900">PinCart AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Log in</Link>
          <Link to="/signup" className="bg-brand-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-brand-700 transition-colors">
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Find Trending Products.<br />
          <span className="text-brand-600">Launch Your Store Today.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Automate your entire dropshipping workflow. Discover Pinterest trends, match suppliers, generate AI content, and export to Shopify in minutes.
        </p>
        <Link to="/dashboard" className="inline-flex items-center gap-2 bg-brand-600 text-white text-lg px-8 py-4 rounded-full font-bold hover:bg-brand-700 transition-transform hover:-translate-y-1 shadow-lg shadow-brand-200">
          Start Dropshipping Free <ArrowRight className="w-5 h-5" />
        </Link>
        
        {/* Visual Proof */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 mx-auto max-w-5xl">
            <div className="bg-gray-100 p-2 border-b flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="bg-white p-4 h-96 flex items-center justify-center bg-gray-50">
               <div className="text-center">
                   <p className="text-gray-400 font-medium mb-2">Interactive Dashboard Preview</p>
                   <div className="grid grid-cols-3 gap-4 w-[800px] mx-auto opacity-50 blur-[1px]">
                        <div className="h-64 bg-gray-200 rounded-lg"></div>
                        <div className="h-64 bg-gray-200 rounded-lg"></div>
                        <div className="h-64 bg-gray-200 rounded-lg"></div>
                   </div>
               </div>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">1. Discover</h3>
                    <p className="text-gray-500">Scrape real-time viral trends from Pinterest.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">2. Match</h3>
                    <p className="text-gray-500">Instantly find low-cost suppliers on AliExpress.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">3. Generate</h3>
                    <p className="text-gray-500">GPT-4 writes your high-converting sales copy.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Package className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">4. Export</h3>
                    <p className="text-gray-500">Download CSV ready for Shopify import.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="text-3xl font-bold mb-6">$0<span className="text-base text-gray-500 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8">
                    <li className="flex gap-2 items-center text-sm"><Check className="w-4 h-4 text-brand-600" /> 3 Daily Searches</li>
                    <li className="flex gap-2 items-center text-sm"><Check className="w-4 h-4 text-brand-600" /> 5 AI Generations</li>
                    <li className="flex gap-2 items-center text-sm"><Check className="w-4 h-4 text-brand-600" /> Standard Support</li>
                </ul>
                <Link to="/signup" className="block w-full text-center py-2.5 rounded-lg border border-brand-600 text-brand-600 font-semibold hover:bg-brand-50">Get Started</Link>
            </div>
            
            {/* Starter */}
            <div className="border border-brand-200 bg-brand-50/50 rounded-2xl p-8 relative shadow-lg">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">MOST POPULAR</div>
                <h3 className="text-xl font-bold mb-2 text-brand-900">Starter</h3>
                <div className="text-3xl font-bold mb-6 text-brand-900">$29<span className="text-base text-gray-500 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8">
                    <li className="flex gap-2 items-center text-sm"><Check className="w-4 h-4 text-brand-600" /> 50 Daily Searches</li>
                    <li className="flex gap-2 items-center text-sm"><Check className="w-4 h-4 text-brand-600" /> 100 AI Generations</li>
                    <li className="flex gap-2 items-center text-sm"><Check className="w-4 h-4 text-brand-600" /> Priority Support</li>
                    <li className="flex gap-2 items-center text-sm"><Check className="w-4 h-4 text-brand-600" /> Ad Copy Generator</li>
                </ul>
                <Link to="/signup" className="block w-full text-center py-2.5 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-md shadow-brand-200">Upgrade Now</Link>
            </div>

            {/* Pro */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">Pro Agency</h3>
                <div className="text-3xl font-bold mb-6">$79<span className="text-base text-gray-500 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8">
                    <li className="flex gap-2 items-center text-sm"><Check className="w-4 h-4 text-brand-600" /> Unlimited Searches</li>
                    <li className="flex gap-2 items-center text-sm"><Check className="w-4 h-4 text-brand-600" /> Unlimited Generations</li>
                    <li className="flex gap-2 items-center text-sm"><Check className="w-4 h-4 text-brand-600" /> Bulk Export</li>
                    <li className="flex gap-2 items-center text-sm"><Check className="w-4 h-4 text-brand-600" /> API Access</li>
                </ul>
                <Link to="/signup" className="block w-full text-center py-2.5 rounded-lg border border-brand-600 text-brand-600 font-semibold hover:bg-brand-50">Contact Sales</Link>
            </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <p>© 2024 PinCart AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;