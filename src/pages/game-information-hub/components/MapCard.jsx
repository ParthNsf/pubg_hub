import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapCard = ({ map, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden gaming-shadow transition-gaming-slow hover:gaming-shadow-purple group">
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <Image
            src={map?.image}
            alt={map?.name}
            className="w-full h-full object-cover transition-gaming-slow group-hover:scale-105"
          />
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-mono text-primary">{map?.size}</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-secondary/20 backdrop-blur-sm px-3 py-1 rounded-full border border-secondary/30">
            <span className="text-xs font-medium text-secondary">{map?.terrain}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">{map?.name}</h3>
            <p className="text-sm text-muted-foreground">{map?.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleExpand}
            className="hover:bg-muted shrink-0"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Players</span>
            </div>
            <span className="text-sm font-bold text-foreground">{map?.maxPlayers}</span>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Clock" size={16} className="text-accent" />
              <span className="text-xs font-medium text-muted-foreground">Duration</span>
            </div>
            <span className="text-sm font-bold text-foreground">{map?.avgDuration}</span>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-slide-down">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                <Icon name="Target" size={16} className="text-warning mr-2" />
                Hot Zones
              </h4>
              <div className="flex flex-wrap gap-2">
                {map?.hotZones?.map((zone, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-md border border-warning/20"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                <Icon name="Lightbulb" size={16} className="text-accent mr-2" />
                Strategic Tips
              </h4>
              <ul className="space-y-1">
                {map?.tips?.map((tip, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-start">
                    <Icon name="ArrowRight" size={12} className="text-accent mr-2 mt-0.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(map)}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted"
          >
            <Icon name="Bookmark" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapCard;