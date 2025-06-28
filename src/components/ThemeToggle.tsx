
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const ThemeToggle = ({ darkMode, setDarkMode }: ThemeToggleProps) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-full transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      }`}
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <Sun className="h-5 w-5 transition-transform hover:rotate-12" />
      ) : (
        <Moon className="h-5 w-5 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
};
