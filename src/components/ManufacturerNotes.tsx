
import { FileText } from 'lucide-react';

interface ManufacturerNotesProps {
  notes: string;
  setNotes: (notes: string) => void;
  darkMode: boolean;
}

export const ManufacturerNotes = ({ notes, setNotes, darkMode }: ManufacturerNotesProps) => {
  return (
    <div className={`p-6 rounded-2xl backdrop-blur-sm ${
      darkMode 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white/50 border border-gray-200 shadow-lg'
    }`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <FileText className="mr-2 h-5 w-5" />
        Notes to Manufacturer
      </h3>
      
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add special instructions for the manufacturer...&#10;&#10;Examples:&#10;• Use eco-friendly fabric&#10;• Gold stitching at collar&#10;• Premium cotton blend&#10;• Double-stitched seams"
        className={`w-full h-32 p-4 rounded-lg border resize-none ${
          darkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
            : 'bg-white border-gray-300 placeholder-gray-500'
        }`}
      />
      
      <div className="mt-2 text-xs text-gray-500">
        {notes.length}/500 characters
      </div>
    </div>
  );
};
