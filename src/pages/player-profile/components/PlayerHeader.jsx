import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlayerHeader = ({ player }) => {
  const getRankColor = (rank) => {
    const colors = {
      'Bronze': 'text-amber-600',
      'Silver': 'text-slate-400',
      'Gold': 'text-yellow-500',
      'Platinum': 'text-cyan-400',
      'Diamond': 'text-purple-500',
      'Crown': 'text-red-500',
      'Ace': 'text-primary'
    };
    return colors?.[rank] || 'text-muted-foreground';
  };

  const getRankIcon = (rank) => {
    const icons = {
      'Bronze': 'Award',
      'Silver': 'Medal',
      'Gold': 'Crown',
      'Platinum': 'Star',
      'Diamond': 'Gem',
      'Crown': 'Crown',
      'Ace': 'Trophy'
    };
    return icons?.[rank] || 'Award';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 gaming-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-primary gaming-shadow">
              <Image
                src={player?.avatar}
                alt={`${player?.nickname} avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            {player?.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
                <div className="w-2 h-2 bg-background rounded-full"></div>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
              {player?.nickname}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Icon name="MapPin" size={16} />
              <span className="text-sm">{player?.region}</span>
              <span className="text-xs opacity-60">•</span>
              <span className="text-sm">{player?.gameVersion}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon 
                name={getRankIcon(player?.rank)} 
                size={18} 
                className={getRankColor(player?.rank)} 
              />
              <span className={`font-semibold ${getRankColor(player?.rank)}`}>
                {player?.rank}
              </span>
              <span className="text-xs text-muted-foreground">
                ({player?.rankPoints} RP)
              </span>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="flex flex-wrap gap-2 lg:ml-auto">
          {player?.achievements?.map((achievement, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full"
            >
              <Icon name={achievement?.icon} size={14} className="text-secondary" />
              <span className="text-xs font-medium text-secondary">
                {achievement?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-xl font-bold text-primary">{player?.level}</div>
          <div className="text-xs text-muted-foreground">Level</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-accent">{player?.totalMatches}</div>
          <div className="text-xs text-muted-foreground">Matches</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-warning">{player?.totalKills}</div>
          <div className="text-xs text-muted-foreground">Total Kills</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-success">{player?.winRate}%</div>
          <div className="text-xs text-muted-foreground">Win Rate</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;