
import { useEffect, useRef, useState } from 'react';
import { Canvas, FabricText, FabricImage, Circle, Rect } from 'fabric';

interface DesignCanvasProps {
  garmentType: string;
  setCanvasRef: (ref: any) => void;
  designData: any;
  setDesignData: (data: any) => void;
  darkMode: boolean;
}

export const DesignCanvas = ({ 
  garmentType, 
  setCanvasRef, 
  designData, 
  setDesignData, 
  darkMode 
}: DesignCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);
  const [garmentOutline, setGarmentOutline] = useState<Rect | null>(null);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const canvas = new Canvas(canvasRef.current, {
        width: 400,
        height: 500,
        backgroundColor: darkMode ? '#1F2937' : '#F9FAFB',
      });

      // Wait for canvas to be fully initialized before setting up the brush
      setTimeout(() => {
        if (canvas.freeDrawingBrush) {
          canvas.freeDrawingBrush.color = '#3B82F6';
          canvas.freeDrawingBrush.width = 3;
        }
      }, 100);

      setFabricCanvas(canvas);
      setCanvasRef(canvas);

      // Draw garment outline
      drawGarmentOutline(canvas, garmentType, darkMode);

      return () => {
        canvas.dispose();
      };
    }
  }, [canvasRef.current, darkMode]);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.backgroundColor = darkMode ? '#1F2937' : '#F9FAFB';
      fabricCanvas.renderAll();
      drawGarmentOutline(fabricCanvas, garmentType, darkMode);
    }
  }, [garmentType, darkMode, fabricCanvas]);

  const drawGarmentOutline = (canvas: Canvas, type: string, dark: boolean) => {
    // Remove existing outline if it exists
    if (garmentOutline) {
      canvas.remove(garmentOutline);
    }

    const outlineColor = dark ? '#6B7280' : '#9CA3AF';
    
    let outline;
    switch (type) {
      case 'shirt':
        outline = new Rect({
          left: 80,
          top: 80,
          width: 240,
          height: 320,
          fill: 'transparent',
          stroke: outlineColor,
          strokeWidth: 2,
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false,
        });
        break;
      case 'dress':
        outline = new Rect({
          left: 100,
          top: 80,
          width: 200,
          height: 350,
          fill: 'transparent',
          stroke: outlineColor,
          strokeWidth: 2,
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false,
        });
        break;
      default:
        outline = new Rect({
          left: 80,
          top: 80,
          width: 240,
          height: 320,
          fill: 'transparent',
          stroke: outlineColor,
          strokeWidth: 2,
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false,
        });
    }
    
    canvas.add(outline);
    setGarmentOutline(outline);
    canvas.renderAll();
  };

  return (
    <div className={`p-6 rounded-2xl backdrop-blur-sm ${
      darkMode 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white/50 border border-gray-200 shadow-lg'
    }`}>
      <h3 className="text-lg font-semibold mb-4">Design Canvas</h3>
      
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className={`border-2 rounded-lg cursor-crosshair ${
            darkMode ? 'border-gray-600' : 'border-gray-300'
          }`}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        Draw, add text, or upload images to design your {garmentType}
      </div>
    </div>
  );
};
