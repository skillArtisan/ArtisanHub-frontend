import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    return stored || 'system';
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (themeToApply: Theme) => {
      let shouldBeDark = false;

      if (themeToApply === 'dark') {
        shouldBeDark = true;
      } else if (themeToApply === 'system') {
        shouldBeDark = mediaQuery.matches;
      }

      setIsDark(shouldBeDark);
      
      if (shouldBeDark) {
        root.classList.add('dark-mode');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark-mode');
        root.style.colorScheme = 'light';
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'system';
      return 'light';
    });
  };

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return { theme, isDark, toggleTheme, setThemeMode };
};
