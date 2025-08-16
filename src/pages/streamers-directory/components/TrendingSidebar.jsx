import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingSidebar = ({ 
  trendingStreamers, 
  recentlyFollowed, 
  recommendations, 
  onWatchClick, 
  onFollowClick 
}) => {
  const formatViewerCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  const StreamerListItem = ({ streamer, showFollowButton = true }) => (
    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-gaming group">
      <div className="relative flex-shrink-0">
        <Image
          src={streamer?.avatarUrl}
          alt={`${streamer?.displayName} avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
        {streamer?.isLive && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-error border-2 border-card rounded-full"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-gaming">
          {streamer?.displayName}
        </h4>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          {streamer?.isLive ? (
            <>
              <Icon name="Eye" size={12} />
              <span>{formatViewerCount(streamer?.viewerCount)}</span>
            </>
          ) : (
            <span>Offline</span>
          )}
        </div>
      </div>
      
      <div className="flex space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onWatchClick(streamer)}
          className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-gaming"
        >
          <Icon name="Play" size={14} />
        </Button>
        {showFollowButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onFollowClick(streamer)}
            className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-gaming"
          >
            <Icon name={streamer?.isFollowed ? "UserCheck" : "UserPlus"} size={14} />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Trending Streamers */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Trending Now</h3>
        </div>
        
        <div className="space-y-1">
          {trendingStreamers?.map((streamer, index) => (
            <div key={streamer?.id} className="flex items-center space-x-2">
              <span className="text-sm font-mono text-muted-foreground w-6">
                #{index + 1}
              </span>
              <div className="flex-1">
                <StreamerListItem streamer={streamer} />
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-3 text-primary hover:text-primary"
        >
          View All Trending
          <Icon name="ArrowRight" size={14} className="ml-2" />
        </Button>
      </div>
      {/* Recently Followed */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Clock" size={20} className="text-secondary" />
          <h3 className="font-semibold text-foreground">Recently Followed</h3>
        </div>
        
        <div className="space-y-1">
          {recentlyFollowed?.map((streamer) => (
            <StreamerListItem 
              key={streamer?.id} 
              streamer={streamer} 
              showFollowButton={false} 
            />
          ))}
        </div>
        
        {recentlyFollowed?.length === 0 && (
          <div className="text-center py-4">
            <Icon name="Users" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Follow streamers to see them here
            </p>
          </div>
        )}
      </div>
      {/* Recommendations */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Sparkles" size={20} className="text-accent" />
          <h3 className="font-semibold text-foreground">Recommended</h3>
        </div>
        
        <div className="space-y-1">
          {recommendations?.map((streamer) => (
            <StreamerListItem key={streamer?.id} streamer={streamer} />
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-3 text-accent hover:text-accent"
        >
          More Recommendations
          <Icon name="ArrowRight" size={14} className="ml-2" />
        </Button>
      </div>
      {/* Quick Stats */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-warning" />
          <h3 className="font-semibold text-foreground">Platform Stats</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Live Streamers</span>
            <span className="font-mono text-foreground">1,247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Viewers</span>
            <span className="font-mono text-foreground">89.2K</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Peak Today</span>
            <span className="font-mono text-foreground">156.8K</span>
          </div>
        </div>
      </div>
      {/* Become a Streamer CTA */}
      <div className="bg-gradient-to-br from-secondary/20 to-primary/20 border border-secondary/30 rounded-lg p-4">
        <div className="text-center">
          <Icon name="Video" size={32} className="text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2">Start Streaming</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Share your PUBG skills with the community
          </p>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            className="w-full"
          >
            Become a Streamer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;