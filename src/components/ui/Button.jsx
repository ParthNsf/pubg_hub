import React from 'react';
import Icon from '../AppIcon';
import { cn } from '../../utils/cn';

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  iconName, 
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-gaming focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 theme-transition';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    success: 'bg-success text-success-foreground hover:bg-success/90 shadow-sm',
    warning: 'bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm',
  };

  const sizes = {
    default: 'h-10 px-4 py-2 rounded-md',
    sm: 'h-9 rounded-md px-3 text-sm',
    lg: 'h-11 rounded-md px-8 text-base',
    icon: 'h-10 w-10 rounded-md',
  };

  const buttonClasses = cn(
    baseClasses,
    variants?.[variant],
    sizes?.[size],
    fullWidth && 'w-full',
    className
  );

  const renderIcon = (position) => {
    if (!iconName || iconPosition !== position) return null;
    return (
      <Icon 
        name={iconName} 
        size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
        className={cn(
          'transition-gaming',
          position === 'left' && children && 'mr-2',
          position === 'right' && children && 'ml-2'
        )}
      />
    );
  };

  const content = (
    <>
      {loading && (
        <Icon 
          name="Loader2" 
          size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
          className={cn('animate-spin', children && 'mr-2')}
        />
      )}
      {!loading && renderIcon('left')}
      {children}
      {!loading && renderIcon('right')}
    </>
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;