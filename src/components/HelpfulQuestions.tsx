
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface HelpfulQuestionsProps {
  darkMode: boolean;
}

export const HelpfulQuestions = ({ darkMode }: HelpfulQuestionsProps) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const questions = [
    {
      question: "How do I design a team t-shirt?",
      answer: "Start by selecting 'Shirt' from the garment types, then use the text tool to add your team name. Consider using contrasting colors and keep the design simple for better printing results."
    },
    {
      question: "Can I upload transparent logos?",
      answer: "Yes! Upload PNG files with transparent backgrounds using the Image tool. The transparent areas will blend seamlessly with your garment color."
    },
    {
      question: "What is the best image resolution?",
      answer: "For best print quality, use images with at least 300 DPI resolution. Recommended sizes: 2000x2000 pixels for large designs, 1000x1000 for smaller logos."
    },
    {
      question: "How can I print this on organic cotton?",
      answer: "Add a note in the 'Notes to Manufacturer' section specifying organic cotton. Different fabrics may affect color vibrancy and printing techniques."
    },
    {
      question: "What formats can I export my design in?",
      answer: "Currently you can export as PNG or SVG. SVG is recommended for vector graphics and scalability, while PNG works best for complex designs with photos."
    },
    {
      question: "How do I get a quote from the factory?",
      answer: "After placing your order, our system will connect you with verified manufacturers who can provide quotes based on your design, quantity, and fabric preferences."
    }
  ];

  return (
    <div className={`p-8 rounded-2xl backdrop-blur-sm ${
      darkMode 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white/50 border border-gray-200 shadow-lg'
    }`}>
      <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
        <HelpCircle className="mr-3 h-6 w-6" />
        Frequently Asked Questions
      </h3>
      
      <div className="space-y-4 max-w-4xl mx-auto">
        {questions.map((item, index) => (
          <div key={index} className={`border rounded-lg overflow-hidden ${
            darkMode ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-opacity-50 transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}
            >
              <span className="font-medium">{item.question}</span>
              {expandedIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedIndex === index && (
              <div className={`px-6 py-4 border-t ${
                darkMode 
                  ? 'border-gray-600 bg-gray-700/30' 
                  : 'border-gray-200 bg-gray-50/50'
              }`}>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
