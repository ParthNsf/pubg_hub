import React from 'react';
import Button from './Button';
import Icon from '../AppIcon';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ variant = "ghost", size = "icon", className = "" }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={`hover:bg-muted transition-gaming ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Icon 
        name={isDark ? "Sun" : "Moon"} 
        size={18}
        className="transition-all duration-200"
      />
    </Button>
  );
};

export default ThemeToggle;