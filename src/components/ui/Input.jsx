import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ 
  className, 
  type = 'text',
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  disabled = false,
  fullWidth = false,
  ...props 
}, ref) => {
  const inputClasses = cn(
    'flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-gaming theme-transition',
    error && 'border-destructive focus-visible:ring-destructive',
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    fullWidth && 'w-full',
    className
  );

  const InputElement = (
    <div className="relative">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        className={inputClasses}
        ref={ref}
        disabled={disabled}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          {rightIcon}
        </div>
      )}
    </div>
  );

  if (label || error || helperText) {
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
            {label}
          </label>
        )}
        {InputElement}
        {(error || helperText) && (
          <p className={cn(
            'text-sm',
            error ? 'text-destructive' : 'text-muted-foreground'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }

  return InputElement;
});

Input.displayName = 'Input';

export default Input;