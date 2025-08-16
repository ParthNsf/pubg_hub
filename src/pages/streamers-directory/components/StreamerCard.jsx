import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StreamerCard = ({ streamer, onWatchClick, onFollowClick }) => {
  const formatViewerCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden gaming-shadow transition-gaming hover:gaming-shadow-purple group">
      {/* Stream Preview */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <Image
          src={streamer?.thumbnailUrl}
          alt={`${streamer?.displayName} stream preview`}
          className="w-full h-full object-cover group-hover:scale-105 transition-gaming-slow"
        />
        
        {/* Live Indicator */}
        {streamer?.isLive && (
          <div className="absolute top-3 left-3 flex items-center space-x-1 bg-error px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full pulse-slow"></div>
            <span className="text-xs font-mono text-white font-semibold">LIVE</span>
          </div>
        )}

        {/* Viewer Count */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={12} color="white" />
            <span className="text-xs font-mono text-white">
              {formatViewerCount(streamer?.viewerCount)}
            </span>
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-gaming flex items-center justify-center">
          <Button
            variant="default"
            size="icon"
            onClick={() => onWatchClick(streamer)}
            className="w-12 h-12 rounded-full bg-primary/90 hover:bg-primary"
          >
            <Icon name="Play" size={20} />
          </Button>
        </div>
      </div>
      {/* Streamer Info */}
      <div className="p-4">
        <div className="flex items-start space-x-3 mb-3">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <Image
              src={streamer?.avatarUrl}
              alt={`${streamer?.displayName} avatar`}
              className="w-12 h-12 rounded-full object-cover border-2 border-border"
            />
            {streamer?.isLive && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-error border-2 border-card rounded-full"></div>
            )}
          </div>

          {/* Name and Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-gaming">
              {streamer?.displayName}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {streamer?.streamTitle}
            </p>
          </div>
        </div>

        {/* Game Category and Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
            {streamer?.gameCategory}
          </span>
          {streamer?.tags?.slice(0, 2)?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{formatViewerCount(streamer?.followers)} followers</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Globe" size={14} />
            <span>{streamer?.language}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onWatchClick(streamer)}
            iconName="Play"
            iconPosition="left"
            className="flex-1"
          >
            Watch
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFollowClick(streamer)}
            iconName={streamer?.isFollowed ? "UserCheck" : "UserPlus"}
            iconPosition="left"
            className="flex-1"
          >
            {streamer?.isFollowed ? 'Following' : 'Follow'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StreamerCard;