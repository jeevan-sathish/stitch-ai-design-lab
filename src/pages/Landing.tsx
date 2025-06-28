
import { useState } from 'react';
import { Palette, Sparkles, Zap, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);

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
              Divine Design Studio
            </h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Divine Fashion Design
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Create stunning garments with AI-powered design tools. From concept to creation, 
          bring your fashion vision to life with divine inspiration.
        </p>
        <Link 
          to="/designer"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <span>Start Designing</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`p-8 rounded-2xl backdrop-blur-sm ${
            darkMode 
              ? 'bg-gray-800/50 border border-gray-700' 
              : 'bg-white/50 border border-gray-200 shadow-lg'
          }`}>
            <Sparkles className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">AI-Powered Design</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Let AI assist you in creating perfect designs with intelligent suggestions and text refinement.
            </p>
          </div>
          
          <div className={`p-8 rounded-2xl backdrop-blur-sm ${
            darkMode 
              ? 'bg-gray-800/50 border border-gray-700' 
              : 'bg-white/50 border border-gray-200 shadow-lg'
          }`}>
            <Zap className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create and iterate on designs quickly with our intuitive canvas and design tools.
            </p>
          </div>
          
          <div className={`p-8 rounded-2xl backdrop-blur-sm ${
            darkMode 
              ? 'bg-gray-800/50 border border-gray-700' 
              : 'bg-white/50 border border-gray-200 shadow-lg'
          }`}>
            <Users className="h-12 w-12 text-pink-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">For Everyone</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Perfect for fashion designers, manufacturers, and anyone with a creative vision.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t mt-16 py-8 ${
        darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'
      }`}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Builders on fire , love from 💖{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Chandan Jeevan
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
