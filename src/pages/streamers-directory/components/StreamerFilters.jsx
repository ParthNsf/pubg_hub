import React from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StreamerFilters = ({ 
  filters, 
  onFilterChange, 
  onSortChange, 
  onSearchChange, 
  searchQuery,
  onClearFilters 
}) => {
  const languageOptions = [
    { value: 'all', label: 'All Languages' },
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' }
  ];

  const viewerRanges = [
    { value: 'all', label: 'All Viewers' },
    { value: '0-100', label: '0-100 viewers' },
    { value: '100-1000', label: '100-1K viewers' },
    { value: '1000-10000', label: '1K-10K viewers' },
    { value: '10000+', label: '10K+ viewers' }
  ];

  const gameModes = [
    { value: 'all', label: 'All Modes' },
    { value: 'solo', label: 'Solo' },
    { value: 'duo', label: 'Duo' },
    { value: 'squad', label: 'Squad' },
    { value: 'custom', label: 'Custom Games' }
  ];

  const skillLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'pro', label: 'Professional' }
  ];

  const sortOptions = [
    { value: 'viewers', label: 'Most Viewers' },
    { value: 'recent', label: 'Recently Started' },
    { value: 'followers', label: 'Most Followers' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters)?.some(value => value !== 'all') || searchQuery?.length > 0;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search streamers by name or content..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Language
          </label>
          <select
            value={filters?.language}
            onChange={(e) => handleFilterChange('language', e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {languageOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Viewer Count Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Viewers
          </label>
          <select
            value={filters?.viewerRange}
            onChange={(e) => handleFilterChange('viewerRange', e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {viewerRanges?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Game Mode Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Game Mode
          </label>
          <select
            value={filters?.gameMode}
            onChange={(e) => handleFilterChange('gameMode', e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {gameModes?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Skill Level Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Skill Level
          </label>
          <select
            value={filters?.skillLevel}
            onChange={(e) => handleFilterChange('skillLevel', e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {skillLevels?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Sort and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Sort Options */}
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-foreground">
            Sort by:
          </label>
          <select
            value={filters?.sortBy}
            onChange={(e) => onSortChange(e?.target?.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters() && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Live Status Toggle */}
      <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="liveOnly"
            checked={filters?.liveOnly}
            onChange={(e) => handleFilterChange('liveOnly', e?.target?.checked)}
            className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring focus:ring-2"
          />
          <label htmlFor="liveOnly" className="text-sm font-medium text-foreground">
            Show live streams only
          </label>
        </div>

        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-error rounded-full pulse-slow"></div>
          <span>Live indicators update in real-time</span>
        </div>
      </div>
    </div>
  );
};

export default StreamerFilters;