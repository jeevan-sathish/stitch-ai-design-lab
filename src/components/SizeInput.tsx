
import { useState } from 'react';
import { Ruler } from 'lucide-react';

interface SizeInputProps {
  sizeData: any;
  setSizeData: (data: any) => void;
  darkMode: boolean;
}

export const SizeInput = ({ sizeData, setSizeData, darkMode }: SizeInputProps) => {
  const [sizeType, setSizeType] = useState('standard');
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    height: '',
    shoulder: ''
  });

  const standardSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleStandardSizeSelect = (size: string) => {
    setSizeData({ type: 'standard', size });
  };

  const handleMeasurementChange = (field: string, value: string) => {
    const newMeasurements = { ...measurements, [field]: value };
    setMeasurements(newMeasurements);
    setSizeData({ type: 'custom', measurements: newMeasurements });
  };

  return (
    <div className={`p-6 rounded-2xl backdrop-blur-sm ${
      darkMode 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white/50 border border-gray-200 shadow-lg'
    }`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Ruler className="mr-2 h-5 w-5" />
        Size Selection
      </h3>

      {/* Size Type Toggle */}
      <div className="flex mb-4">
        <button
          onClick={() => setSizeType('standard')}
          className={`flex-1 py-2 px-4 rounded-l-lg border transition-colors ${
            sizeType === 'standard'
              ? darkMode
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-blue-600 text-white border-blue-600'
              : darkMode
                ? 'border-gray-600 hover:bg-gray-700'
                : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          Standard
        </button>
        <button
          onClick={() => setSizeType('custom')}
          className={`flex-1 py-2 px-4 rounded-r-lg border-l-0 border transition-colors ${
            sizeType === 'custom'
              ? darkMode
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-blue-600 text-white border-blue-600'
              : darkMode
                ? 'border-gray-600 hover:bg-gray-700'
                : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          Custom
        </button>
      </div>

      {sizeType === 'standard' ? (
        <div className="grid grid-cols-3 gap-2">
          {standardSizes.map((size) => (
            <button
              key={size}
              onClick={() => handleStandardSizeSelect(size)}
              className={`py-3 px-4 rounded-lg border transition-all duration-200 ${
                sizeData?.size === size
                  ? darkMode
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                    : 'border-blue-500 bg-blue-50 text-blue-600'
                  : darkMode
                    ? 'border-gray-600 hover:border-gray-500'
                    : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Chest (cm)</label>
              <input
                type="number"
                value={measurements.chest}
                onChange={(e) => handleMeasurementChange('chest', e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                placeholder="90"
                min="60"
                max="150"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Waist (cm)</label>
              <input
                type="number"
                value={measurements.waist}
                onChange={(e) => handleMeasurementChange('waist', e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                placeholder="80"
                min="60"
                max="140"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Height (cm)</label>
              <input
                type="number"
                value={measurements.height}
                onChange={(e) => handleMeasurementChange('height', e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                placeholder="175"
                min="140"
                max="220"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Shoulder (cm)</label>
              <input
                type="number"
                value={measurements.shoulder}
                onChange={(e) => handleMeasurementChange('shoulder', e.target.value)}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                placeholder="45"
                min="35"
                max="60"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
