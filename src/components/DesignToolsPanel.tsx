
import { useState, useRef } from 'react';
import { Brush, Type, Image, Palette, Undo, Redo, RotateCcw, Sparkles } from 'lucide-react';

interface DesignToolsPanelProps {
  canvasRef: any;
  darkMode: boolean;
}

export const DesignToolsPanel = ({ canvasRef, darkMode }: DesignToolsPanelProps) => {
  const [activeTool, setActiveTool] = useState('select');
  const [color, setColor] = useState('#3B82F6');
  const [textInput, setTextInput] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [showAIRefine, setShowAIRefine] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tools = [
    { id: 'select', name: 'Select', icon: 'cursor-arrow' },
    { id: 'brush', name: 'Brush', icon: Brush },
    { id: 'text', name: 'Text', icon: Type },
    { id: 'image', name: 'Image', icon: Image },
    { id: 'color', name: 'Color', icon: Palette }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (canvasRef?.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 50, 50, 100, 100);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const refineTextWithAI = async () => {
    setShowAIRefine(true);
    
    // Mock AI response for now - replace with actual Gemini API call
    setTimeout(() => {
      const mockSuggestions = [
        `${textInput} - Premium Edition`,
        `Exclusive ${textInput} Collection`,
        `${textInput} - Crafted with Care`
      ];
      setAiSuggestions(mockSuggestions);
    }, 1000);
  };

  const addTextToCanvas = (text: string) => {
    if (canvasRef?.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.font = '24px Inter, sans-serif';
      ctx.fillStyle = color;
      ctx.fillText(text, 100, 100);
    }
    setShowTextInput(false);
    setShowAIRefine(false);
    setTextInput('');
  };

  return (
    <div className={`p-6 rounded-2xl backdrop-blur-sm ${
      darkMode 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white/50 border border-gray-200 shadow-lg'
    }`}>
      <h3 className="text-lg font-semibold mb-4">Design Tools</h3>
      
      <div className="space-y-4">
        {/* Tool Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {tools.map((tool) => {
            const Icon = tool.icon === 'cursor-arrow' ? 'div' : tool.icon;
            const isActive = activeTool === tool.id;
            
            return (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id);
                  if (tool.id === 'text') setShowTextInput(true);
                  if (tool.id === 'image') fileInputRef.current?.click();
                }}
                className={`p-3 rounded-xl border transition-all duration-200 flex flex-col items-center space-y-1 ${
                  isActive
                    ? darkMode
                      ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                      : 'border-blue-500 bg-blue-50 text-blue-600'
                    : darkMode
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {Icon === 'div' ? (
                  <div className="h-5 w-5 border-l-2 border-t-2 rotate-45 border-current" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
                <span className="text-xs">{tool.name}</span>
              </button>
            );
          })}
        </div>

        {/* Color Picker */}
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium">Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
          />
        </div>

        {/* Text Input */}
        {showTextInput && (
          <div className="space-y-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text for design..."
              className={`w-full p-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              }`}
            />
            <div className="flex space-x-2">
              <button
                onClick={() => addTextToCanvas(textInput)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Text
              </button>
              {textInput && (
                <button
                  onClick={refineTextWithAI}
                  className="flex items-center space-x-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>AI Refine</span>
                </button>
              )}
            </div>

            {/* AI Suggestions */}
            {showAIRefine && (
              <div className="space-y-2">
                <p className="text-sm font-medium">AI Suggestions:</p>
                {aiSuggestions.length === 0 ? (
                  <div className="text-sm text-gray-500">Generating suggestions...</div>
                ) : (
                  aiSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => addTextToCanvas(suggestion)}
                      className={`w-full text-left p-2 rounded border ${
                        darkMode
                          ? 'border-gray-600 hover:bg-gray-600'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button className={`p-2 rounded-lg border transition-colors ${
            darkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-300 hover:bg-gray-100'
          }`}>
            <Undo className="h-4 w-4 mx-auto" />
          </button>
          <button className={`p-2 rounded-lg border transition-colors ${
            darkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-300 hover:bg-gray-100'
          }`}>
            <Redo className="h-4 w-4 mx-auto" />
          </button>
          <button className={`p-2 rounded-lg border transition-colors ${
            darkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-300 hover:bg-gray-100'
          }`}>
            <RotateCcw className="h-4 w-4 mx-auto" />
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};
