import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MiniLeaderboard = () => {
  const topPlayers = [
    {
      id: 1,
      rank: 1,
      username: "ShadowHunter_Pro",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      kills: 2847,
      placement: "Winner",
      totalPoints: 15420,
      tier: "Conqueror",
      kd: 4.2
    },
    {
      id: 2,
      rank: 2,
      username: "QueenSniper_Elite",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      kills: 2634,
      placement: "Top 3",
      totalPoints: 14890,
      tier: "Ace",
      kd: 3.8
    },
    {
      id: 3,
      rank: 3,
      username: "RushKing_Master",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      kills: 2521,
      placement: "Top 5",
      totalPoints: 14320,
      tier: "Ace",
      kd: 3.5
    },
    {
      id: 4,
      rank: 4,
      username: "TacticalGod_99",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      kills: 2398,
      placement: "Top 10",
      totalPoints: 13750,
      tier: "Crown",
      kd: 3.2
    },
    {
      id: 5,
      rank: 5,
      username: "ClutchQueen_X",
      avatar: "https://randomuser.me/api/portraits/women/56.jpg",
      kills: 2287,
      placement: "Top 10",
      totalPoints: 13240,
      tier: "Crown",
      kd: 3.0
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return { icon: 'Crown', color: 'text-warning' };
      case 2: return { icon: 'Medal', color: 'text-muted-foreground' };
      case 3: return { icon: 'Award', color: 'text-amber-600' };
      default: return { icon: 'Hash', color: 'text-muted-foreground' };
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Conqueror': return 'text-error bg-error/10';
      case 'Ace': return 'text-warning bg-warning/10';
      case 'Crown': return 'text-secondary bg-secondary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleViewProfile = (playerId) => {
    window.location.href = '/player-profile';
  };

  const handleViewFullLeaderboard = () => {
    window.location.href = '/tournament-listing';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 gaming-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">
            Top Players
          </h3>
          <p className="text-sm text-muted-foreground">
            Current season rankings
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewFullLeaderboard}
          iconName="ExternalLink"
          iconPosition="right"
          className="text-primary hover:bg-primary/10"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {topPlayers?.map((player) => {
          const rankData = getRankIcon(player?.rank);
          return (
            <div
              key={player?.id}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-gaming cursor-pointer group"
              onClick={() => handleViewProfile(player?.id)}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-8 h-8">
                <Icon 
                  name={rankData?.icon} 
                  size={20} 
                  className={rankData?.color}
                />
              </div>
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={player?.avatar}
                  alt={player?.username}
                  className="w-10 h-10 rounded-full object-cover border border-border group-hover:border-primary/50 transition-gaming"
                />
                <div className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(player?.tier)}`}>
                  {player?.tier?.charAt(0)}
                </div>
              </div>
              {/* Player Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-gaming">
                    {player?.username}
                  </h4>
                  <span className="text-sm font-bold text-primary">
                    {player?.totalPoints?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{player?.kills} kills</span>
                  <span>K/D: {player?.kd}</span>
                </div>
              </div>
              {/* Arrow */}
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary transition-gaming" 
              />
            </div>
          );
        })}
      </div>
      {/* Stats Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">2.8M</div>
            <div className="text-xs text-muted-foreground">Total Players</div>
          </div>
          <div>
            <div className="text-lg font-bold text-secondary">156K</div>
            <div className="text-xs text-muted-foreground">Active Today</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">24/7</div>
            <div className="text-xs text-muted-foreground">Live Matches</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniLeaderboard;