
import { ShoppingCart, Download } from 'lucide-react';

interface OrderSummaryProps {
  garmentType: string;
  sizeData: any;
  notes: string;
  onPlaceOrder: () => void;
  darkMode: boolean;
}

export const OrderSummary = ({ 
  garmentType, 
  sizeData, 
  notes, 
  onPlaceOrder, 
  darkMode 
}: OrderSummaryProps) => {
  return (
    <div className={`p-6 rounded-2xl backdrop-blur-sm ${
      darkMode 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white/50 border border-gray-200 shadow-lg'
    }`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Order Summary
      </h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Garment:</span>
          <span className="font-medium capitalize">{garmentType}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Size:</span>
          <span className="font-medium">
            {sizeData?.type === 'standard' 
              ? sizeData.size || 'Not selected'
              : 'Custom measurements'
            }
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Design:</span>
          <span className="font-medium">Custom design</span>
        </div>
        
        {notes && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400 text-sm">Special Notes:</span>
            <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
              {notes.substring(0, 100)}{notes.length > 100 ? '...' : ''}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <button
          onClick={onPlaceOrder}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Place Order</span>
        </button>
        
        <button className={`w-full py-2 px-4 rounded-lg border transition-colors flex items-center justify-center space-x-2 ${
          darkMode
            ? 'border-gray-600 hover:bg-gray-700'
            : 'border-gray-300 hover:bg-gray-50'
        }`}>
          <Download className="h-4 w-4" />
          <span>Export Design</span>
        </button>
      </div>
    </div>
  );
};
