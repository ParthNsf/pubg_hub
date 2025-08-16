import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsCards = ({ statistics }) => {
  const statCards = [
    {
      title: 'Matches Played',
      value: statistics?.matchesPlayed,
      icon: 'GameController2',
      color: 'primary',
      change: '+12 this week'
    },
    {
      title: 'K/D Ratio',
      value: statistics?.kdRatio,
      icon: 'Target',
      color: 'warning',
      change: '+0.3 this month'
    },
    {
      title: 'Win Percentage',
      value: `${statistics?.winPercentage}%`,
      icon: 'Trophy',
      color: 'success',
      change: '+5% this month'
    },
    {
      title: 'Average Damage',
      value: statistics?.averageDamage,
      icon: 'Zap',
      color: 'destructive',
      change: '+150 this week'
    },
    {
      title: 'Survival Time',
      value: statistics?.survivalTime,
      icon: 'Clock',
      color: 'secondary',
      change: '+2m this week'
    },
    {
      title: 'Headshot Rate',
      value: `${statistics?.headshotRate}%`,
      icon: 'Crosshair',
      color: 'accent',
      change: '+3% this month'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'text-primary border-primary/20 bg-primary/5',
      warning: 'text-warning border-warning/20 bg-warning/5',
      success: 'text-success border-success/20 bg-success/5',
      destructive: 'text-destructive border-destructive/20 bg-destructive/5',
      secondary: 'text-secondary border-secondary/20 bg-secondary/5',
      accent: 'text-accent border-accent/20 bg-accent/5'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl p-6 gaming-shadow hover:gaming-shadow-purple transition-gaming group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${getColorClasses(stat?.color)}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-gaming">
                {stat?.value}
              </div>
              <div className="text-xs text-success font-medium">
                {stat?.change}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-1">{stat?.title}</h3>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r from-${stat?.color} to-${stat?.color}/60`}
                style={{ width: `${Math.min(parseFloat(stat?.value) || 75, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;