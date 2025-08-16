import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeaponComparison = ({ weapons, onRemoveWeapon, onClearAll }) => {
  if (weapons?.length === 0) return null;

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
    <div className="fixed bottom-6 left-6 right-6 bg-card border border-border rounded-xl gaming-shadow-purple p-6 z-40 max-h-80 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex items-center">
          <Icon name="BarChart3" size={20} className="text-primary mr-2" />
          Weapon Comparison ({weapons?.length})
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          iconName="X"
          iconPosition="left"
        >
          Clear All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weapons?.map((weapon) => (
          <div key={weapon?.id} className="bg-muted/30 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveWeapon(weapon?.id)}
              className="absolute top-2 right-2 h-6 w-6 hover:bg-background"
            >
              <Icon name="X" size={14} />
            </Button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-background/50 rounded-lg flex items-center justify-center">
                <Image
                  src={weapon?.image}
                  alt={weapon?.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{weapon?.name}</h4>
                <p className="text-xs text-muted-foreground">{weapon?.category}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Damage</span>
                  <span className={`text-xs font-bold ${getStatColor(weapon?.damage, 100)}`}>
                    {weapon?.damage}
                  </span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-1">
                  <div
                    className="bg-destructive h-1 rounded-full transition-all duration-300"
                    style={{ width: getStatWidth(weapon?.damage, 100) }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Range</span>
                  <span className={`text-xs font-bold ${getStatColor(weapon?.range, 100)}`}>
                    {weapon?.range}
                  </span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-1">
                  <div
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: getStatWidth(weapon?.range, 100) }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Fire Rate</span>
                  <span className={`text-xs font-bold ${getStatColor(weapon?.fireRate, 100)}`}>
                    {weapon?.fireRate}
                  </span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-1">
                  <div
                    className="bg-warning h-1 rounded-full transition-all duration-300"
                    style={{ width: getStatWidth(weapon?.fireRate, 100) }}
                  ></div>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Ammo:</span>
                  <span className="text-foreground font-medium">{weapon?.ammoType}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-muted-foreground">Recoil:</span>
                  <span className="text-foreground font-medium">{weapon?.recoil}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeaponComparison;