
import { useState, useEffect } from 'react';
import { ClothingSelector } from '@/components/ClothingSelector';
import { DesignToolsPanel } from '@/components/DesignToolsPanel';
import { DesignCanvas } from '@/components/DesignCanvas';
import { SizeInput } from '@/components/SizeInput';
import { GarmentPreview } from '@/components/GarmentPreview';
import { ManufacturerNotes } from '@/components/ManufacturerNotes';
import { AIChat } from '@/components/AIChat';
import { HelpfulQuestions } from '@/components/HelpfulQuestions';
import { ThemeToggle } from '@/components/ThemeToggle';
import { OrderSummary } from '@/components/OrderSummary';
import { Moon, Sun, Palette } from 'lucide-react';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedGarment, setSelectedGarment] = useState('shirt');
  const [designData, setDesignData] = useState({});
  const [sizeData, setSizeData] = useState({});
  const [notes, setNotes] = useState('');
  const [canvasRef, setCanvasRef] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handlePlaceOrder = () => {
    const orderData = {
      garmentType: selectedGarment,
      design: designData,
      size: sizeData,
      notes: notes,
      timestamp: new Date().toISOString()
    };
    
    console.log('Order Data:', orderData);
    alert('Order placed successfully! Check console for details.');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-lg ${
        darkMode ? 'bg-gray-800/80' : 'bg-white/80'
      } border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FashionForge
            </h1>
          </div>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tools and Controls */}
          <div className="lg:col-span-1 space-y-6">
            <ClothingSelector 
              selected={selectedGarment} 
              onSelect={setSelectedGarment}
              darkMode={darkMode}
            />
            <DesignToolsPanel 
              canvasRef={canvasRef}
              darkMode={darkMode}
            />
            <SizeInput 
              sizeData={sizeData}
              setSizeData={setSizeData}
              darkMode={darkMode}
            />
            <ManufacturerNotes 
              notes={notes}
              setNotes={setNotes}
              darkMode={darkMode}
            />
          </div>

          {/* Center Column - Design Canvas */}
          <div className="lg:col-span-1">
            <DesignCanvas 
              garmentType={selectedGarment}
              setCanvasRef={setCanvasRef}
              designData={designData}
              setDesignData={setDesignData}
              darkMode={darkMode}
            />
          </div>

          {/* Right Column - Preview and Order */}
          <div className="lg:col-span-1 space-y-6">
            <GarmentPreview 
              garmentType={selectedGarment}
              designData={designData}
              darkMode={darkMode}
            />
            <OrderSummary 
              garmentType={selectedGarment}
              sizeData={sizeData}
              notes={notes}
              onPlaceOrder={handlePlaceOrder}
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-16">
          <HelpfulQuestions darkMode={darkMode} />
        </div>
      </div>

      {/* Floating AI Chat */}
      <AIChat darkMode={darkMode} />
    </div>
  );
};

export default Index;
