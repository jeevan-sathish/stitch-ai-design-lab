
import { useState, useRef, useEffect } from 'react';
import { Brush, Type, Image, Palette, Undo, Redo, RotateCcw, Sparkles } from 'lucide-react';
import { FabricText, FabricImage } from 'fabric';

interface DesignToolsPanelProps {
  canvasRef: any;
  darkMode: boolean;
}

export const DesignToolsPanel = ({ canvasRef, darkMode }: DesignToolsPanelProps) => {
  const [activeTool, setActiveTool] = useState('select');
  const [color, setColor] = useState('#3B82F6');
  const [textColor, setTextColor] = useState('#000000');
  const [textInput, setTextInput] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [showAIRefine, setShowAIRefine] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tools = [
    { id: 'select', name: 'Select', icon: 'cursor-arrow' },
    { id: 'brush', name: 'Brush', icon: Brush },
    { id: 'text', name: 'Text', icon: Type },
    { id: 'image', name: 'Image', icon: Image },
    { id: 'color', name: 'Color', icon: Palette }
  ];

  // Update brush color when color changes
  useEffect(() => {
    if (canvasRef && canvasRef.freeDrawingBrush) {
      canvasRef.freeDrawingBrush.color = color;
    }
  }, [color, canvasRef]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvasRef) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.createElement('img');
        imgElement.onload = () => {
          FabricImage.fromURL(e.target?.result as string).then((img) => {
            img.set({
              left: 100,
              top: 100,
              scaleX: 0.5,
              scaleY: 0.5,
            });
            canvasRef.add(img);
            canvasRef.renderAll();
          });
        };
        imgElement.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const refineTextWithAI = async () => {
    if (!textInput.trim()) return;
    
    setIsLoadingAI(true);
    setShowAIRefine(true);
    
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDfre4670HNfsJcpQe039hdZ43roymvbag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Refine this text for a fashion design: "${textInput}". Provide 3 creative alternatives that would look good on clothing. Make them catchy and stylish. Return only the 3 alternatives, each on a new line.`
            }]
          }]
        })
      });

      const data = await response.json();
      const suggestions = data.candidates[0].content.parts[0].text.split('\n').filter((s: string) => s.trim());
      setAiSuggestions(suggestions.slice(0, 3));
    } catch (error) {
      console.error('AI refinement failed:', error);
      setAiSuggestions([
        `${textInput} - Premium Edition`,
        `Exclusive ${textInput} Collection`,
        `${textInput} - Crafted with Care`
      ]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const addTextToCanvas = (text: string) => {
    if (canvasRef && text.trim()) {
      const textObj = new FabricText(text, {
        left: 150,
        top: 150,
        fontFamily: 'Inter, sans-serif',
        fontSize: 24,
        fill: textColor, // Use textColor instead of color
        editable: true,
      });
      canvasRef.add(textObj);
      canvasRef.setActiveObject(textObj);
      canvasRef.renderAll();
    }
    setShowTextInput(false);
    setShowAIRefine(false);
    setTextInput('');
    setAiSuggestions([]);
  };

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
    
    if (!canvasRef) return;

    // Reset drawing mode first
    canvasRef.isDrawingMode = false;

    if (toolId === 'brush') {
      canvasRef.isDrawingMode = true;
      // Ensure brush exists and set properties
      if (canvasRef.freeDrawingBrush) {
        canvasRef.freeDrawingBrush.color = color;
        canvasRef.freeDrawingBrush.width = 3;
      }
    }

    if (toolId === 'text') {
      setShowTextInput(true);
    }
    
    if (toolId === 'image') {
      fileInputRef.current?.click();
    }
  };

  const handleUndo = () => {
    if (canvasRef) {
      const objects = canvasRef.getObjects();
      if (objects.length > 1) { // Keep at least the garment outline
        const lastObj = objects[objects.length - 1];
        canvasRef.remove(lastObj);
        canvasRef.renderAll();
      }
    }
  };

  const handleRedo = () => {
    // Simple redo functionality - in a real app you'd maintain a history stack
    console.log('Redo functionality would be implemented here');
  };

  const handleClear = () => {
    if (canvasRef) {
      const objects = canvasRef.getObjects();
      // Remove all objects except the first one (garment outline)
      objects.slice(1).forEach((obj: any) => canvasRef.remove(obj));
      canvasRef.renderAll();
    }
  };

  const clearAIChat = () => {
    setShowAIRefine(false);
    setAiSuggestions([]);
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
                onClick={() => handleToolClick(tool.id)}
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

        {/* Color Pickers */}
        <div className="space-y-3">
          {/* Brush Color */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium">Brush Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
            />
          </div>
          
          {/* Text Color */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium">Text Color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
            />
          </div>
        </div>

        {/* Text Input */}
        {showTextInput && (
          <div className="space-y-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Add Text</span>
              {showAIRefine && (
                <button
                  onClick={clearAIChat}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Clear AI
                </button>
              )}
            </div>
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
                  disabled={isLoadingAI}
                  className="flex items-center space-x-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isLoadingAI ? 'AI...' : 'AI Refine'}</span>
                </button>
              )}
            </div>

            {/* AI Suggestions */}
            {showAIRefine && (
              <div className="space-y-2">
                <p className="text-sm font-medium">AI Suggestions:</p>
                {isLoadingAI ? (
                  <div className="text-sm text-gray-500">Generating suggestions...</div>
                ) : aiSuggestions.length === 0 ? (
                  <div className="text-sm text-red-500">No suggestions available</div>
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
          <button 
            onClick={handleUndo}
            className={`p-2 rounded-lg border transition-colors ${
              darkMode 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <Undo className="h-4 w-4 mx-auto" />
          </button>
          <button 
            onClick={handleRedo}
            className={`p-2 rounded-lg border transition-colors ${
              darkMode 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <Redo className="h-4 w-4 mx-auto" />
          </button>
          <button 
            onClick={handleClear}
            className={`p-2 rounded-lg border transition-colors ${
              darkMode 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
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
