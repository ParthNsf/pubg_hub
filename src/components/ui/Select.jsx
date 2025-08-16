// components/ui/Select.jsx - Shadcn style Select
import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import { cn } from '../../utils/cn';

const Select = ({
  value,
  onValueChange,
  placeholder = 'Select an option',
  options = [],
  disabled = false,
  className = '',
  label,
  error,
  fullWidth = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);

  const selectedOption = options?.find(option => option?.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef?.current && !containerRef?.current?.contains(event?.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  const handleKeyDown = (event) => {
    if (disabled) return;

    switch (event?.key) {
      case 'Enter': case' ':
        event?.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          onValueChange(options?.[highlightedIndex]?.value);
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        event?.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev < options?.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        event?.preventDefault();
        if (isOpen) {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : options?.length - 1
          );
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleOptionClick = (optionValue) => {
    onValueChange(optionValue);
    setIsOpen(false);
  };

  const triggerClasses = cn(
    'flex h-10 w-full items-center justify-between rounded-md border border-input bg-input px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-gaming theme-transition',
    error && 'border-destructive focus:ring-destructive',
    fullWidth && 'w-full',
    className
  );

  const SelectElement = (
    <div className={cn('relative', fullWidth && 'w-full')} ref={containerRef}>
      <button
        type="button"
        className={triggerClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
        {...props}
      >
        <span className={cn(
          'truncate',
          !selectedOption && 'text-muted-foreground'
        )}>
          {selectedOption?.label || placeholder}
        </span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={cn(
            'transition-transform theme-transition',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full mt-1 w-full rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-scale-in theme-transition">
          <div className="max-h-60 overflow-auto p-1" role="listbox">
            {options?.map((option, index) => (
              <div
                key={option?.value}
                className={cn(
                  'relative flex w-full cursor-pointer items-center rounded-sm py-2 px-3 text-sm outline-none transition-gaming theme-transition',
                  highlightedIndex === index && 'bg-accent text-accent-foreground',
                  value === option?.value && 'bg-primary text-primary-foreground',
                  'hover:bg-accent hover:text-accent-foreground'
                )}
                onClick={() => handleOptionClick(option?.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={value === option?.value}
              >
                <span className="truncate">{option?.label}</span>
                {value === option?.value && (
                  <Icon 
                    name="Check" 
                    size={16} 
                    className="ml-auto"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (label || error) {
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
            {label}
          </label>
        )}
        {SelectElement}
        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }

  return SelectElement;
};

export default Select;