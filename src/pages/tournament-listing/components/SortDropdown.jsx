import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ sortBy, onSortChange, resultsCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Star' },
    { value: 'prize-desc', label: 'Prize Pool (High to Low)', icon: 'TrendingUp' },
    { value: 'prize-asc', label: 'Prize Pool (Low to High)', icon: 'TrendingDown' },
    { value: 'date-asc', label: 'Date (Earliest First)', icon: 'Calendar' },
    { value: 'date-desc', label: 'Date (Latest First)', icon: 'CalendarDays' },
    { value: 'entry-asc', label: 'Entry Fee (Low to High)', icon: 'DollarSign' },
    { value: 'entry-desc', label: 'Entry Fee (High to Low)', icon: 'DollarSign' }
  ];

  const currentSort = sortOptions?.find(option => option?.value === sortBy) || sortOptions?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        <span className="font-mono">{resultsCount}</span> tournaments found
      </div>
      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          iconName="ChevronDown"
          iconPosition="right"
          className="min-w-[200px] justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name={currentSort?.icon} size={16} />
            <span>Sort by: {currentSort?.label?.split(' (')?.[0]}</span>
          </div>
        </Button>

        {isOpen && (
          <div className="absolute right-0 top-12 w-64 bg-popover border border-border rounded-lg shadow-gaming z-50 animate-scale-in">
            <div className="p-2">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSortSelect(option?.value)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left
                    transition-gaming hover:bg-muted
                    ${sortBy === option?.value ? 'bg-primary/10 text-primary' : 'text-foreground'}
                  `}
                >
                  <Icon 
                    name={option?.icon} 
                    size={16} 
                    className={sortBy === option?.value ? 'text-primary' : 'text-muted-foreground'} 
                  />
                  <span className="text-sm">{option?.label}</span>
                  {sortBy === option?.value && (
                    <Icon name="Check" size={14} className="ml-auto text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;