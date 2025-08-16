import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeaponCard = ({ weapon, onCompare, isComparing }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatColor = (value, max) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getStatWidth = (value, max) => {
    return `${(value / max) * 100}%`;
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden gaming-shadow transition-gaming-slow hover:gaming-shadow-green group">
      <div className="relative">
        <div className="h-40 bg-muted/30 flex items-center justify-center overflow-hidden">
          <Image
            src={weapon?.image}
            alt={weapon?.name}
            className="w-full h-full object-contain p-4 transition-gaming-slow group-hover:scale-110"
          />
        </div>
        <div className="absolute top-3 left-3">
          <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-xs font-mono text-primary">{weapon?.category}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <div className={`w-3 h-3 rounded-full ${weapon?.rarity === 'Legendary' ? 'bg-warning' : weapon?.rarity === 'Epic' ? 'bg-secondary' : weapon?.rarity === 'Rare' ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{weapon?.name}</h3>
            <p className="text-xs text-muted-foreground">{weapon?.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-muted shrink-0"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={18} />
          </Button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground flex items-center">
              <Icon name="Zap" size={14} className="text-destructive mr-1" />
              Damage
            </span>
            <span className={`text-sm font-bold ${getStatColor(weapon?.damage, 100)}`}>
              {weapon?.damage}
            </span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-1.5">
            <div
              className="bg-destructive h-1.5 rounded-full transition-all duration-300"
              style={{ width: getStatWidth(weapon?.damage, 100) }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground flex items-center">
              <Icon name="Target" size={14} className="text-primary mr-1" />
              Range
            </span>
            <span className={`text-sm font-bold ${getStatColor(weapon?.range, 100)}`}>
              {weapon?.range}
            </span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: getStatWidth(weapon?.range, 100) }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground flex items-center">
              <Icon name="Gauge" size={14} className="text-warning mr-1" />
              Fire Rate
            </span>
            <span className={`text-sm font-bold ${getStatColor(weapon?.fireRate, 100)}`}>
              {weapon?.fireRate}
            </span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-1.5">
            <div
              className="bg-warning h-1.5 rounded-full transition-all duration-300"
              style={{ width: getStatWidth(weapon?.fireRate, 100) }}
            ></div>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-slide-down border-t border-border pt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Package" size={14} className="text-accent" />
                  <span className="text-xs font-medium text-muted-foreground">Ammo</span>
                </div>
                <span className="text-sm font-bold text-foreground">{weapon?.ammoType}</span>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Weight" size={14} className="text-secondary" />
                  <span className="text-xs font-medium text-muted-foreground">Recoil</span>
                </div>
                <span className="text-sm font-bold text-foreground">{weapon?.recoil}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                <Icon name="Settings" size={14} className="text-primary mr-2" />
                Attachments
              </h4>
              <div className="flex flex-wrap gap-1">
                {weapon?.attachments?.map((attachment, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20"
                  >
                    {attachment}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-2 mt-4">
          <Button
            variant={isComparing ? "default" : "outline"}
            size="sm"
            onClick={() => onCompare(weapon)}
            iconName="BarChart3"
            iconPosition="left"
            className="flex-1"
          >
            {isComparing ? "Remove" : "Compare"}
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

export default WeaponCard;