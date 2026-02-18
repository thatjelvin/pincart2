import React from 'react';
import { CreditCard, CheckCircle, Zap } from 'lucide-react';

const Billing: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>

      {/* Current Plan */}
      <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Current Plan</p>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Free Tier <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-semibold">Active</span>
            </h2>
          </div>
          <button className="text-brand-600 font-medium text-sm hover:underline">Cancel Subscription</button>
        </div>

        {/* Usage Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Searches Used</span>
              <span className="text-sm font-bold text-gray-900">2 / 3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-brand-600 h-2 rounded-full" style={{ width: '66%' }}></div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Generations Used</span>
              <span className="text-sm font-bold text-gray-900">1 / 5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
        </div>

        <button className="w-full bg-brand-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2">
          <Zap className="w-4 h-4" /> Upgrade Plan
        </button>
      </div>

      {/* Payment Method */}
      <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h3>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-md">
              <CreditCard className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-xs text-gray-500">Expires 12/24</p>
            </div>
          </div>
          <span className="text-sm text-gray-500">Default</span>
        </div>
        <button className="mt-4 text-brand-600 font-medium text-sm hover:underline">
          + Add Payment Method
        </button>
      </div>

       {/* Invoice History */}
       <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Invoice History</h3>
        <table className="min-w-full">
            <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Invoice</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                <tr className="text-sm text-gray-700">
                    <td className="py-3">Oct 01, 2023</td>
                    <td className="py-3">$0.00</td>
                    <td className="py-3"><span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3"/> Paid</span></td>
                    <td className="py-3 text-right"><button className="text-gray-400 hover:text-gray-600">Download</button></td>
                </tr>
            </tbody>
        </table>
       </div>
    </div>
  );
};

export default Billing;