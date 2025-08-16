import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StreamersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const streamers = [
    {
      id: 1,
      username: "ProGamer_Alex",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      viewerCount: 15420,
      isLive: true,
      game: "PUBG Mobile",
      title: "Road to Conqueror - Solo vs Squad Challenge",
      platform: "twitch"
    },
    {
      id: 2,
      username: "QueenSniper_Sarah",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      viewerCount: 8750,
      isLive: true,
      game: "PUBG Mobile",
      title: "Tournament Practice - Sanhok Rotations",
      platform: "youtube"
    },
    {
      id: 3,
      username: "TacticalMaster_Mike",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      viewerCount: 12300,
      isLive: true,
      game: "PUBG Mobile",
      title: "IGL Tips & Team Strategy Discussion",
      platform: "twitch"
    },
    {
      id: 4,
      username: "RushKing_David",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      viewerCount: 6890,
      isLive: false,
      game: "PUBG Mobile",
      title: "Aggressive Gameplay Highlights",
      platform: "youtube"
    },
    {
      id: 5,
      username: "SniperQueen_Lisa",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      viewerCount: 9540,
      isLive: true,
      game: "PUBG Mobile",
      title: "Long Range Combat Masterclass",
      platform: "twitch"
    },
    {
      id: 6,
      username: "ClutchMaster_John",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
      viewerCount: 11200,
      isLive: true,
      game: "PUBG Mobile",
      title: "1v4 Clutch Compilation & Tips",
      platform: "youtube"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, streamers?.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, streamers?.length - 3)) % Math.max(1, streamers?.length - 3));
  };

  const handleWatchStream = (streamerId) => {
    window.location.href = '/streamers-directory';
  };

  const formatViewerCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Featured Streamers
          </h2>
          <p className="text-muted-foreground">
            Watch live gameplay from top PUBG players
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="hover:bg-muted"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="hover:bg-muted"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {streamers?.map((streamer) => (
            <div
              key={streamer?.id}
              className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
            >
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-gaming group gaming-shadow">
                {/* Streamer Avatar */}
                <div className="relative p-6 pb-4">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={streamer?.avatar}
                      alt={streamer?.username}
                      className="w-full h-full rounded-full object-cover border-2 border-border group-hover:border-primary/50 transition-gaming"
                    />
                    {streamer?.isLive && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-error rounded-full flex items-center justify-center border-2 border-background">
                        <div className="w-2 h-2 bg-white rounded-full pulse-slow"></div>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {streamer?.username}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {streamer?.title}
                    </p>
                  </div>
                </div>

                {/* Stream Info */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Eye" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {formatViewerCount(streamer?.viewerCount)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {streamer?.isLive ? (
                        <span className="px-2 py-1 bg-error/10 text-error text-xs font-medium rounded-full">
                          LIVE
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                          OFFLINE
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-muted-foreground">Platform</span>
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={streamer?.platform === 'twitch' ? 'Tv' : 'Play'} 
                        size={14} 
                        className="text-primary" 
                      />
                      <span className="text-foreground font-medium capitalize">
                        {streamer?.platform}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant={streamer?.isLive ? "default" : "outline"}
                    fullWidth
                    onClick={() => handleWatchStream(streamer?.id)}
                    iconName="Play"
                    iconPosition="left"
                    className={streamer?.isLive 
                      ? "bg-gradient-to-r from-error to-error/80 hover:from-error/90 hover:to-error/70" :"border-muted-foreground text-muted-foreground hover:bg-muted"
                    }
                  >
                    {streamer?.isLive ? 'Watch Live' : 'View Profile'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* View All Button */}
      <div className="text-center mt-8">
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.location.href = '/streamers-directory'}
          iconName="ArrowRight"
          iconPosition="right"
          className="border-primary text-primary hover:bg-primary/10"
        >
          View All Streamers
        </Button>
      </div>
    </div>
  );
};

export default StreamersCarousel;