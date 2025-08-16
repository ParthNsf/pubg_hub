import React from 'react';
import Icon from '../AppIcon';
import { cn } from '../../utils/cn';

const Checkbox = ({
  checked = false,
  onCheckedChange,
  disabled = false,
  label,
  description,
  error,
  className = '',
  size = 'default',
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const iconSizes = {
    sm: 12,
    default: 16,
    lg: 18
  };

  const checkboxClasses = cn(
    'peer shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-gaming theme-transition cursor-pointer',
    sizeClasses?.[size],
    error && 'border-destructive',
    checked && 'bg-primary border-primary',
    !checked && 'border-input bg-input hover:border-primary/50',
    className
  );

  const handleClick = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  const handleKeyDown = (event) => {
    if (event?.key === 'Enter' || event?.key === ' ') {
      event?.preventDefault();
      handleClick();
    }
  };

  const CheckboxElement = (
    <div className="flex items-center space-x-2">
      <div
        className={checkboxClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="checkbox"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        data-state={checked ? 'checked' : 'unchecked'}
        {...props}
      >
        {checked && (
          <div className="flex items-center justify-center w-full h-full">
            <Icon 
              name="Check" 
              size={iconSizes?.[size]} 
              className="text-current"
            />
          </div>
        )}
      </div>
      
      {label && (
        <div className="grid gap-1.5 leading-none">
          <label
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-foreground',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={!disabled ? handleClick : undefined}
          >
            {label}
          </label>
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (error) {
    return (
      <div className="space-y-2">
        {CheckboxElement}
        <p className="text-sm text-destructive">
          {error}
        </p>
      </div>
    );
  }

  return CheckboxElement;
};

export default Checkbox;