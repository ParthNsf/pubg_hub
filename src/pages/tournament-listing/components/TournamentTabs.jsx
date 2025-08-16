import React from 'react';
import Icon from '../../../components/AppIcon';

const TournamentTabs = ({ activeTab, onTabChange, tournamentCounts }) => {
  const tabs = [
    {
      id: 'all',
      label: 'All Tournaments',
      icon: 'Trophy',
      count: tournamentCounts?.all || 0
    },
    {
      id: 'daily',
      label: 'Daily',
      icon: 'Calendar',
      count: tournamentCounts?.daily || 0
    },
    {
      id: 'short-term',
      label: 'Short-term',
      icon: 'Clock',
      count: tournamentCounts?.shortTerm || 0
    },
    {
      id: 'long-term',
      label: 'Long-term',
      icon: 'CalendarDays',
      count: tournamentCounts?.longTerm || 0
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-1 gaming-shadow">
      <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm
              whitespace-nowrap transition-gaming min-w-fit
              ${activeTab === tab?.id
                ? 'bg-primary text-background gaming-shadow'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon 
              name={tab?.icon} 
              size={16} 
              className={activeTab === tab?.id ? 'text-background' : 'text-current'} 
            />
            <span>{tab?.label}</span>
            <div className={`
              px-2 py-0.5 rounded-full text-xs font-bold
              ${activeTab === tab?.id
                ? 'bg-background/20 text-background' :'bg-muted text-muted-foreground'
              }
            `}>
              {tab?.count}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TournamentTabs;