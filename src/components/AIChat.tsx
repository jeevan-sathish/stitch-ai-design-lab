
import { useState } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Sparkles } from 'lucide-react';

interface AIChatProps {
  darkMode: boolean;
}

interface Message {
  type: 'user' | 'ai';
  content: string;
}

export const AIChat = ({ darkMode }: AIChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: 'Hi! I\'m your divine fashion design assistant. Ask me about sizing, fabric recommendations, or design tips!'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [showNoteCorrection, setShowNoteCorrection] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = { type: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDfre4670HNfsJcpQe039hdZ43roymvbag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful fashion design assistant. Answer this question about fashion design, fabrics, or garment manufacturing: ${message}`
            }]
          }]
        })
      });

      const data = await response.json();
      const aiResponse: Message = {
        type: 'ai',
        content: data.candidates[0].content.parts[0].text
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI request failed:', error);
      const errorResponse: Message = {
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again later.'
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const correctNoteText = async () => {
    if (!noteText.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDfre4670HNfsJcpQe039hdZ43roymvbag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Please correct and improve this manufacturer note for fashion/garment production. Make it professional and clear: "${noteText}"`
            }]
          }]
        })
      });

      const data = await response.json();
      const correctedText = data.candidates[0].content.parts[0].text;
      setNoteText(correctedText);
      setShowNoteCorrection(false);
    } catch (error) {
      console.error('Note correction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 space-y-4">
        {/* Note Correction Panel */}
        {showNoteCorrection && (
          <div className={`w-80 p-4 rounded-2xl shadow-2xl backdrop-blur-sm ${
            darkMode 
              ? 'bg-gray-800/90 border border-gray-700' 
              : 'bg-white/90 border border-gray-200'
          }`}>
            <h4 className="font-semibold mb-3 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
              Correct Note Text
            </h4>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter note text to correct..."
              className={`w-full h-20 p-3 rounded-lg border resize-none mb-3 text-sm ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 placeholder-gray-500'
              }`}
            />
            <div className="flex space-x-2">
              <button
                onClick={correctNoteText}
                disabled={isLoading || !noteText.trim()}
                className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors text-sm disabled:opacity-50"
              >
                {isLoading ? 'Correcting...' : 'Apply AI Correction'}
              </button>
              <button
                onClick={() => setShowNoteCorrection(false)}
                className={`px-3 py-2 rounded-lg border text-sm ${
                  darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Main Chat Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <MessageCircle className="h-6 w-6" />
        </button>

        {/* Note Correction Button */}
        <button
          onClick={() => setShowNoteCorrection(true)}
          className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            darkMode 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          <Sparkles className="h-6 w-6" />
        </button>
      </div>
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
          <span className="font-semibold">Divine AI Assistant</span>
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
            {isLoading && (
              <div className="flex justify-start">
                <div className={`max-w-xs p-3 rounded-lg text-sm ${
                  darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'
                }`}>
                  Thinking...
                </div>
              </div>
            )}
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
                disabled={isLoading}
                className={`flex-1 p-2 text-sm rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 placeholder-gray-500'
                }`}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !message.trim()}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
