import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VehicleCard = ({ vehicle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSpeedColor = (speed) => {
    if (speed >= 120) return 'text-success';
    if (speed >= 80) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getDurabilityColor = (durability) => {
    if (durability >= 80) return 'text-success';
    if (durability >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden gaming-shadow transition-gaming-slow hover:gaming-shadow-purple group">
      <div className="relative">
        <div className="h-44 bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center overflow-hidden">
          <Image
            src={vehicle?.image}
            alt={vehicle?.name}
            className="w-full h-full object-contain p-4 transition-gaming-slow group-hover:scale-105"
          />
        </div>
        <div className="absolute top-3 left-3">
          <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-xs font-mono text-primary">{vehicle?.type}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-xs font-mono text-accent">{vehicle?.fuel}</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{vehicle?.name}</h3>
            <p className="text-xs text-muted-foreground">{vehicle?.description}</p>
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

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Gauge" size={16} className={getSpeedColor(vehicle?.maxSpeed)} />
            </div>
            <span className={`text-sm font-bold ${getSpeedColor(vehicle?.maxSpeed)}`}>
              {vehicle?.maxSpeed}
            </span>
            <p className="text-xs text-muted-foreground">km/h</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Users" size={16} className="text-primary" />
            </div>
            <span className="text-sm font-bold text-foreground">{vehicle?.capacity}</span>
            <p className="text-xs text-muted-foreground">seats</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Shield" size={16} className={getDurabilityColor(vehicle?.durability)} />
            </div>
            <span className={`text-sm font-bold ${getDurabilityColor(vehicle?.durability)}`}>
              {vehicle?.durability}%
            </span>
            <p className="text-xs text-muted-foreground">armor</p>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-slide-down border-t border-border pt-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                <Icon name="Zap" size={14} className="text-warning mr-2" />
                Performance Stats
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Acceleration</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted/50 rounded-full h-1">
                      <div
                        className="bg-warning h-1 rounded-full"
                        style={{ width: `${vehicle?.acceleration}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-foreground w-8">{vehicle?.acceleration}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Handling</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted/50 rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full"
                        style={{ width: `${vehicle?.handling}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-foreground w-8">{vehicle?.handling}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Off-road</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted/50 rounded-full h-1">
                      <div
                        className="bg-accent h-1 rounded-full"
                        style={{ width: `${vehicle?.offRoad}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-foreground w-8">{vehicle?.offRoad}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                <Icon name="Target" size={14} className="text-accent mr-2" />
                Tactical Usage
              </h4>
              <ul className="space-y-1">
                {vehicle?.tacticalTips?.map((tip, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-start">
                    <Icon name="ArrowRight" size={12} className="text-accent mr-2 mt-0.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                <Icon name="MapPin" size={14} className="text-secondary mr-2" />
                Best Terrain
              </h4>
              <div className="flex flex-wrap gap-1">
                {vehicle?.bestTerrain?.map((terrain, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded border border-secondary/20"
                  >
                    {terrain}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            iconName="BookOpen"
            iconPosition="left"
            className="flex-1"
          >
            Guide
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

export default VehicleCard;