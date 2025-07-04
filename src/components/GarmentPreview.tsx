
import { useState } from 'react';

interface GarmentPreviewProps {
  garmentType: string;
  designData: any;
  darkMode: boolean;
}

export const GarmentPreview = ({ garmentType, designData, darkMode }: GarmentPreviewProps) => {
  const [viewSide, setViewSide] = useState('front');

  const getGarmentImage = () => {
    const baseColor = darkMode ? '#374151' : '#F3F4F6';
    const garmentEmoji = {
      'shirt': '👕',
      'pant': '👖', 
      'dress': '👗',
      'jacket': '🧥',
      'custom': '👘'
    }[garmentType] || '👕';

    return (
      <div 
        className={`w-full h-80 rounded-lg flex items-center justify-center text-6xl transition-all duration-300 ${
          viewSide === 'back' ? 'transform scale-x-[-1]' : ''
        }`}
        style={{ backgroundColor: baseColor }}
      >
        {garmentEmoji}
      </div>
    );
  };

  const toggleView = () => {
    setViewSide(prevSide => prevSide === 'front' ? 'back' : 'front');
  };

  return (
    <div className={`p-6 rounded-2xl backdrop-blur-sm ${
      darkMode 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white/50 border border-gray-200 shadow-lg'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Preview</h3>
        <div className="flex space-x-2">
          <button
            onClick={toggleView}
            className={`px-3 py-1 rounded-lg text-sm border transition-colors ${
              darkMode
                ? 'border-gray-600 hover:bg-gray-700 text-white'
                : 'border-gray-300 hover:bg-gray-100 text-gray-700'
            }`}
          >
            {viewSide === 'front' ? 'Show Back' : 'Show Front'}
          </button>
        </div>
      </div>

      <div className="relative">
        {getGarmentImage()}
        
        {/* Overlay design elements */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {viewSide.charAt(0).toUpperCase() + viewSide.slice(1)} View
            </div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Design elements will appear here
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {garmentType.charAt(0).toUpperCase() + garmentType.slice(1)} Preview - {viewSide} side
        </p>
      </div>
    </div>
  );
};
