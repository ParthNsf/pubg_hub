import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const JoinModal = ({ tournament, isOpen, onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !tournament) return null;

  const handleJoin = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onConfirm(tournament);
  };

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl max-w-md w-full gaming-shadow-purple animate-scale-in">
        {/* Header */}
        <div className="relative h-32 overflow-hidden rounded-t-xl">
          <Image
            src={tournament?.bannerImage}
            alt={tournament?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-gaming"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Join Tournament</h2>
            <p className="text-muted-foreground">
              Are you sure you want to join this tournament?
            </p>
          </div>

          {/* Tournament Details */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6 space-y-3">
            <h3 className="font-bold text-foreground text-lg">{tournament?.name}</h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground font-mono">PRIZE POOL</p>
                <p className="font-bold text-primary">{formatPrizePool(tournament?.prizePool)}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-mono">ENTRY FEE</p>
                <p className="font-bold text-foreground">
                  {tournament?.entryFee === 0 ? 'FREE' : `$${tournament?.entryFee}`}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  <span>Start Date</span>
                </div>
                <span className="text-foreground font-medium">{formatDate(tournament?.startDate)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Users" size={14} />
                  <span>Format</span>
                </div>
                <span className="text-foreground font-medium capitalize">{tournament?.format}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="MapPin" size={14} />
                  <span>Region</span>
                </div>
                <span className="text-foreground font-medium">{tournament?.region}</span>
              </div>
            </div>
          </div>

          {/* Warning */}
          {tournament?.entryFee > 0 && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-6">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div className="text-sm">
                  <p className="text-warning font-semibold">Payment Required</p>
                  <p className="text-muted-foreground">
                    You will be charged ${tournament?.entryFee} to join this tournament.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              fullWidth
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleJoin}
              loading={isLoading}
              iconName="UserPlus"
              iconPosition="left"
              fullWidth
            >
              {isLoading ? 'Joining...' : 'Join Tournament'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinModal;