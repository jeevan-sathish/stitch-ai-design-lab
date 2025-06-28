
import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasRef(canvasRef);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = 400;
      canvas.height = 500;
      
      // Clear and set background
      ctx.fillStyle = darkMode ? '#1F2937' : '#F9FAFB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw garment outline based on type
      drawGarmentOutline(ctx, garmentType, darkMode);
    }
  }, [garmentType, darkMode]);

  const drawGarmentOutline = (ctx: CanvasRenderingContext2D, type: string, dark: boolean) => {
    ctx.strokeStyle = dark ? '#6B7280' : '#9CA3AF';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    switch (type) {
      case 'shirt':
        // Draw shirt outline
        ctx.beginPath();
        ctx.moveTo(100, 80);
        ctx.lineTo(300, 80);
        ctx.lineTo(320, 100);
        ctx.lineTo(320, 200);
        ctx.lineTo(300, 220);
        ctx.lineTo(300, 400);
        ctx.lineTo(100, 400);
        ctx.lineTo(100, 220);
        ctx.lineTo(80, 200);
        ctx.lineTo(80, 100);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'pant':
        // Draw pant outline
        ctx.beginPath();
        ctx.moveTo(150, 50);
        ctx.lineTo(250, 50);
        ctx.lineTo(260, 250);
        ctx.lineTo(230, 450);
        ctx.lineTo(200, 450);
        ctx.lineTo(200, 250);
        ctx.lineTo(200, 250);
        ctx.lineTo(170, 450);
        ctx.lineTo(140, 450);
        ctx.lineTo(140, 250);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'dress':
        // Draw dress outline
        ctx.beginPath();
        ctx.moveTo(120, 80);
        ctx.lineTo(280, 80);
        ctx.lineTo(300, 100);
        ctx.lineTo(320, 400);
        ctx.lineTo(80, 400);
        ctx.lineTo(100, 100);
        ctx.closePath();
        ctx.stroke();
        break;
      default:
        // Default rectangle
        ctx.strokeRect(80, 80, 240, 320);
    }
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
        Click and drag to draw on your {garmentType}
      </div>
    </div>
  );
};
