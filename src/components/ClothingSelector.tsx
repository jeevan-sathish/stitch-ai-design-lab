import { Shirt, ShirtIcon, Package, Coat } from 'lucide-react';

interface ClothingSelectorProps {
  selected: string;
  onSelect: (type: string) => void;
  darkMode: boolean;
}

const garmentTypes = [
  { id: 'shirt', name: 'Shirt', icon: Shirt },
  { id: 'pant', name: 'Pant', icon: Package },
  { id: 'dress', name: 'Dress', icon: ShirtIcon },
  { id: 'jacket', name: 'Jacket', icon: Coat },
  { id: 'custom', name: 'Custom', icon: Package }
];

export const ClothingSelector = ({ selected, onSelect, darkMode }: ClothingSelectorProps) => {
  return (
    <div className={`p-6 rounded-2xl backdrop-blur-sm ${
      darkMode 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white/50 border border-gray-200 shadow-lg'
    }`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Package className="mr-2 h-5 w-5" />
        Select Garment Type
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
        {garmentTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selected === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                isSelected
                  ? darkMode
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                    : 'border-blue-500 bg-blue-50 text-blue-600'
                  : darkMode
                    ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <Icon className={`h-6 w-6 ${isSelected ? '' : 'opacity-70'}`} />
              <span className="text-sm font-medium">{type.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
