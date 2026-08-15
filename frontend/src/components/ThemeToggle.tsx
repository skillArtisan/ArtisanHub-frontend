import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Theme } from '../hooks/useDarkMode';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={20} />;
      case 'dark':
        return <Moon size={20} />;
      case 'system':
        return <Monitor size={20} />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'system':
        return 'System theme';
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch theme (current: ${getLabel()})`}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  );
};
