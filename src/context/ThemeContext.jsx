import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

const getTimeBasedTheme = () => {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18;
};

const getStoredTheme = () => {
  const stored = localStorage.getItem('theme');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

const storeTheme = (theme, isManual) => {
  localStorage.setItem('theme', JSON.stringify({ theme, isManual }));
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const stored = getStoredTheme();
    if (stored?.isManual) {
      return stored.theme;
    }
    return getTimeBasedTheme() ? 'light' : 'dark';
  });

  const [themeMode, setThemeMode] = useState(() => {
    const stored = getStoredTheme();
    return stored?.isManual ? 'manual' : 'auto';
  });

  useEffect(() => {
    let isDark;
    if (themeMode === 'auto') {
      isDark = !getTimeBasedTheme();
    } else {
      isDark = mode === 'dark';
    }

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode, themeMode]);

  useEffect(() => {
    if (themeMode !== 'auto') {
      storeTheme(mode, true);
    } else {
      storeTheme(null, false);
    }
  }, [mode, themeMode]);

  useEffect(() => {
    if (themeMode !== 'auto') return;

    const checkTime = () => {
      const shouldBeDark = !getTimeBasedTheme();
      const currentIsDark = mode === 'dark';
      if (shouldBeDark !== currentIsDark) {
        setMode(shouldBeDark ? 'dark' : 'light');
      }
    };

    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [themeMode, mode]);

  const toggleTheme = useCallback(() => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark');
    setThemeMode('manual');
  }, []);

  const setAutoTheme = useCallback(() => {
    setThemeMode('auto');
    setMode(getTimeBasedTheme() ? 'light' : 'dark');
  }, []);

  const isDark = mode === 'dark';

  return (
    <ThemeContext.Provider value={{ isDark, mode, themeMode, toggleTheme, setAutoTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
