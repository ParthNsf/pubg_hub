import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TournamentCard = ({ tournament, onJoin }) => {
  const formatPrizePool = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000)?.toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000)?.toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'text-error bg-error/10';
      case 'upcoming':
        return 'text-primary bg-primary/10';
      case 'registration':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden gaming-shadow hover:gaming-shadow-purple transition-gaming-slow">
      {/* Tournament Banner */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tournament?.bannerImage}
          alt={tournament?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-gaming-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-mono font-semibold ${getStatusColor(tournament?.status)}`}>
          {tournament?.status === 'live' && <Icon name="Circle" size={8} className="inline mr-1 fill-current" />}
          {tournament?.status?.toUpperCase()}
        </div>

        {/* Verified Badge */}
        {tournament?.isVerified && (
          <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Check" size={14} color="var(--color-background)" />
          </div>
        )}

        {/* Prize Pool */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-lg">
            <p className="text-xs text-muted-foreground font-mono">PRIZE POOL</p>
            <p className="text-lg font-bold text-primary">{formatPrizePool(tournament?.prizePool)}</p>
          </div>
        </div>
      </div>
      {/* Tournament Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-gaming">
              {tournament?.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{tournament?.organizer}</p>
          </div>
        </div>

        {/* Tournament Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span>{formatDate(tournament?.startDate)}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Users" size={14} />
              <span>{tournament?.participants}/{tournament?.maxParticipants}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span>{tournament?.region}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Gamepad2" size={14} />
              <span>{tournament?.format}</span>
            </div>
          </div>
        </div>

        {/* Entry Fee & Join Button */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-mono">ENTRY FEE</p>
            <p className="font-bold text-foreground">
              {tournament?.entryFee === 0 ? 'FREE' : `$${tournament?.entryFee}`}
            </p>
          </div>
          
          <Button
            variant={tournament?.status === 'registration' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onJoin(tournament)}
            disabled={tournament?.status === 'completed' || tournament?.participants >= tournament?.maxParticipants}
            iconName={tournament?.status === 'live' ? 'Eye' : 'UserPlus'}
            iconPosition="left"
            className="min-w-[100px]"
          >
            {tournament?.status === 'live' ? 'Watch' : 
             tournament?.status === 'registration' ? 'Join' : 
             tournament?.participants >= tournament?.maxParticipants ? 'Full' : 'View'}
          </Button>
        </div>

        {/* Additional Info on Hover */}
        <div className="mt-3 pt-3 border-t border-border opacity-0 group-hover:opacity-100 transition-gaming">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Trophy" size={12} />
                <span>{tournament?.type}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{tournament?.duration}</span>
              </div>
            </div>
            {tournament?.isSponsored && (
              <div className="flex items-center space-x-1 text-warning">
                <Icon name="Star" size={12} />
                <span>Sponsored</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;