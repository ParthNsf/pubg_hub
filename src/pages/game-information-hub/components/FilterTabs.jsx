import React from 'react';
import Button from '../../../components/ui/Button';


const FilterTabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="flex flex-wrap gap-2 p-1 bg-muted/30 rounded-xl">
      {tabs?.map((tab) => (
        <Button
          key={tab?.id}
          variant={activeTab === tab?.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange(tab?.id)}
          iconName={tab?.icon}
          iconPosition="left"
          className={`flex-1 min-w-0 transition-gaming ${
            activeTab === tab?.id 
              ? "gaming-shadow" 
              : "hover:bg-muted"
          }`}
        >
          <span className="truncate">{tab?.label}</span>
          {tab?.count && (
            <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
              activeTab === tab?.id 
                ? "bg-background/20 text-primary-foreground" 
                : "bg-primary/10 text-primary"
            }`}>
              {tab?.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default FilterTabs;