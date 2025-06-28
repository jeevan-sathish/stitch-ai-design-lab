
import { useState } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';

interface AIChatProps {
  darkMode: boolean;
}

export const AIChat = ({ darkMode }: AIChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hi! I\'m your fashion design assistant. Ask me about sizing, fabric recommendations, or design tips!'
    }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { type: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Mock AI response - replace with actual Gemini API call
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: `That's a great question about "${message}". For fashion design, I'd recommend considering the fabric weight and drape. Would you like specific suggestions for your ${message.toLowerCase().includes('shirt') ? 'shirt' : 'garment'} design?`
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          darkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 h-96 rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-800/90 border border-gray-700' 
        : 'bg-white/90 border border-gray-200'
    } ${isMinimized ? 'h-12' : 'h-96'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          <span className="font-semibold">AI Assistant</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto h-64 space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg text-sm ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : darkMode
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-gray-100 text-gray-900'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about fashion design..."
                className={`flex-1 p-2 text-sm rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 placeholder-gray-500'
                }`}
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
