import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ filters, onFilterChange, onClearFilters, isOpen, onClose }) => {
  const entryFeeRanges = [
    { label: 'Free', value: 'free' },
    { label: '$1 - $10', value: '1-10' },
    { label: '$11 - $50', value: '11-50' },
    { label: '$51 - $100', value: '51-100' },
    { label: '$100+', value: '100+' }
  ];

  const prizePoolRanges = [
    { label: 'Under $1K', value: '0-1000' },
    { label: '$1K - $5K', value: '1000-5000' },
    { label: '$5K - $10K', value: '5000-10000' },
    { label: '$10K - $50K', value: '10000-50000' },
    { label: '$50K+', value: '50000+' }
  ];

  const formats = [
    { label: 'Solo', value: 'solo' },
    { label: 'Duo', value: 'duo' },
    { label: 'Squad', value: 'squad' }
  ];

  const regions = [
    { label: 'North America', value: 'na' },
    { label: 'Europe', value: 'eu' },
    { label: 'Asia Pacific', value: 'apac' },
    { label: 'South America', value: 'sa' },
    { label: 'Middle East', value: 'me' }
  ];

  const tournamentTypes = [
    { label: 'Battle Royale', value: 'battle-royale' },
    { label: 'Team Deathmatch', value: 'tdm' },
    { label: 'Arena', value: 'arena' },
    { label: 'Custom', value: 'custom' }
  ];

  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters?.[filterType] || [];
    const newValues = currentValues?.includes(value)
      ? currentValues?.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterType, newValues);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.reduce((count, filterArray) => {
      return count + (Array.isArray(filterArray) ? filterArray?.length : 0);
    }, 0);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Filter Panel */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 lg:w-64 xl:w-72
        bg-card border-r lg:border border-border z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto lg:rounded-xl lg:gaming-shadow
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:border-none">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h2 className="font-bold text-foreground">Filters</h2>
            {getActiveFiltersCount() > 0 && (
              <div className="w-5 h-5 bg-primary text-background rounded-full flex items-center justify-center text-xs font-bold">
                {getActiveFiltersCount()}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Search tournaments..."
              value={filters?.search || ''}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Entry Fee */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="DollarSign" size={16} />
              <span>Entry Fee</span>
            </h3>
            <div className="space-y-2">
              {entryFeeRanges?.map((range) => (
                <label key={range?.value} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={(filters?.entryFee || [])?.includes(range?.value)}
                    onChange={() => handleCheckboxChange('entryFee', range?.value)}
                    className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-gaming">
                    {range?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Prize Pool */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Trophy" size={16} />
              <span>Prize Pool</span>
            </h3>
            <div className="space-y-2">
              {prizePoolRanges?.map((range) => (
                <label key={range?.value} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={(filters?.prizePool || [])?.includes(range?.value)}
                    onChange={() => handleCheckboxChange('prizePool', range?.value)}
                    className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-gaming">
                    {range?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Format */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>Format</span>
            </h3>
            <div className="space-y-2">
              {formats?.map((format) => (
                <label key={format?.value} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={(filters?.format || [])?.includes(format?.value)}
                    onChange={() => handleCheckboxChange('format', format?.value)}
                    className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-gaming">
                    {format?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Region */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="MapPin" size={16} />
              <span>Region</span>
            </h3>
            <div className="space-y-2">
              {regions?.map((region) => (
                <label key={region?.value} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={(filters?.region || [])?.includes(region?.value)}
                    onChange={() => handleCheckboxChange('region', region?.value)}
                    className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-gaming">
                    {region?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Tournament Type */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Gamepad2" size={16} />
              <span>Type</span>
            </h3>
            <div className="space-y-2">
              {tournamentTypes?.map((type) => (
                <label key={type?.value} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={(filters?.type || [])?.includes(type?.value)}
                    onChange={() => handleCheckboxChange('type', type?.value)}
                    className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-gaming">
                    {type?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="RotateCcw"
              iconPosition="left"
              fullWidth
              className="mt-6"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterPanel;