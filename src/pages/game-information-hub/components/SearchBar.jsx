import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, placeholder = "Search maps, weapons, vehicles..." }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <Input
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="pl-12 pr-20 h-12 bg-muted/50 border-border focus:border-primary"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={18} className="text-muted-foreground" />
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="h-8 w-8 hover:bg-background"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="h-8"
          >
            <Icon name="Search" size={16} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;