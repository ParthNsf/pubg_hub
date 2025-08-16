import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StreamingSection = ({ streamData }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  if (!streamData || !streamData?.isStreamer) {
    return null;
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleDonate = () => {
    // Mock donation functionality
    alert('Donation feature would open here');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 gaming-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="Video" size={24} className="text-primary" />
          Live Streaming
        </h2>
        
        {streamData?.isLive && (
          <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-full">
            <div className="w-2 h-2 bg-destructive rounded-full pulse-slow"></div>
            <span className="text-xs font-medium text-destructive">LIVE</span>
          </div>
        )}
      </div>
      {/* Stream Player */}
      <div className="relative bg-black rounded-lg overflow-hidden mb-6 aspect-video">
        {streamData?.isLive ? (
          <iframe
            width="100%"
            height="100%"
            src={streamData?.embedUrl}
            title={`${streamData?.streamerName} Live Stream`}
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/20">
            <div className="text-center">
              <Icon name="VideoOff" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Stream Offline</h3>
              <p className="text-muted-foreground">
                {streamData?.streamerName} is not currently streaming
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Last streamed: {streamData?.lastStream}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Stream Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {streamData?.currentTitle || 'PUBG Ranked Gameplay'}
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              {streamData?.description || 'Professional PUBG player streaming ranked matches and tournaments'}
            </p>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Icon name="Users" size={16} className="text-primary" />
                <span className="text-foreground font-medium">
                  {streamData?.followers?.toLocaleString() || '0'} followers
                </span>
              </div>
              
              {streamData?.isLive && (
                <div className="flex items-center gap-1">
                  <Icon name="Eye" size={16} className="text-success" />
                  <span className="text-foreground font-medium">
                    {streamData?.currentViewers?.toLocaleString() || '0'} viewers
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  {streamData?.totalHours || '0'}h streamed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant={isFollowing ? "outline" : "default"}
            onClick={handleFollow}
            iconName={isFollowing ? "UserCheck" : "UserPlus"}
            iconPosition="left"
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleDonate}
            iconName="Heart"
            iconPosition="left"
          >
            Donate
          </Button>
          
          {streamData?.socialLinks?.youtube && (
            <Button
              variant="ghost"
              onClick={() => window.open(streamData?.socialLinks?.youtube, '_blank')}
              iconName="Youtube"
              iconPosition="left"
            >
              YouTube
            </Button>
          )}
          
          {streamData?.socialLinks?.twitch && (
            <Button
              variant="ghost"
              onClick={() => window.open(streamData?.socialLinks?.twitch, '_blank')}
              iconName="Twitch"
              iconPosition="left"
            >
              Twitch
            </Button>
          )}
        </div>

        {/* Stream Schedule */}
        {streamData?.schedule && (
          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              Stream Schedule
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {streamData?.schedule?.map((slot, index) => (
                <div 
                  key={index}
                  className="bg-muted/30 border border-border/50 rounded-lg p-3"
                >
                  <div className="font-medium text-foreground text-sm">{slot?.day}</div>
                  <div className="text-xs text-muted-foreground">{slot?.time}</div>
                  <div className="text-xs text-primary mt-1">{slot?.content}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Highlights */}
        {streamData?.highlights && streamData?.highlights?.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Star" size={16} className="text-warning" />
              Recent Highlights
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {streamData?.highlights?.slice(0, 4)?.map((highlight, index) => (
                <div 
                  key={index}
                  className="bg-muted/30 border border-border/50 rounded-lg p-3 hover:bg-muted/50 transition-gaming cursor-pointer"
                >
                  <div className="font-medium text-foreground text-sm mb-1">
                    {highlight?.title}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {highlight?.date} • {highlight?.duration}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Icon name="Eye" size={12} className="text-primary" />
                      <span className="text-muted-foreground">
                        {highlight?.views?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="ThumbsUp" size={12} className="text-success" />
                      <span className="text-muted-foreground">
                        {highlight?.likes?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamingSection;