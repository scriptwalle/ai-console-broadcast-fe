import React from 'react';
import { Sun, Moon, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const ThemeToggle = () => {
  const { isDark, themeMode, toggleTheme, setAutoTheme } = useTheme();

  const handleClick = () => {
    if (themeMode === 'auto') {
      toggleTheme();
    } else {
      setAutoTheme();
    }
  };

  const getTooltip = () => {
    if (themeMode === 'auto') return 'Auto (Based on Time)';
    return isDark ? 'Switch to Light mode' : 'Switch to Dark mode';
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      aria-label={getTooltip()}
      title={getTooltip()}
    >
      {themeMode === 'auto' ? (
        <Clock className="w-5 h-5 text-slate-600 dark:text-slate-300" />
      ) : isDark ? (
        <Sun className="w-5 h-5 text-slate-300" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
