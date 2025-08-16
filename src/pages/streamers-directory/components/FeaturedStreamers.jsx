import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedStreamers = ({ featuredStreamers, onWatchClick, onFollowClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || featuredStreamers?.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredStreamers?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredStreamers?.length]);

  const formatViewerCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredStreamers?.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredStreamers?.length) % featuredStreamers?.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  if (featuredStreamers?.length === 0) return null;

  const currentStreamer = featuredStreamers?.[currentSlide];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">Featured Streamers</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="hover:bg-muted"
          >
            <Icon name={isAutoPlaying ? "Pause" : "Play"} size={18} />
          </Button>
        </div>
      </div>
      <div className="relative bg-card border border-border rounded-lg overflow-hidden gaming-shadow">
        {/* Main Featured Card */}
        <div className="relative aspect-[21/9] bg-muted overflow-hidden">
          <Image
            src={currentStreamer?.bannerUrl}
            alt={`${currentStreamer?.displayName} featured banner`}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="p-6 lg:p-8 max-w-2xl">
              {/* Live Badge */}
              {currentStreamer?.isLive && (
                <div className="inline-flex items-center space-x-2 bg-error px-3 py-1 rounded-full mb-4">
                  <div className="w-2 h-2 bg-white rounded-full pulse-slow"></div>
                  <span className="text-sm font-mono text-white font-semibold">LIVE NOW</span>
                  <span className="text-sm font-mono text-white">
                    {formatViewerCount(currentStreamer?.viewerCount)} viewers
                  </span>
                </div>
              )}

              {/* Streamer Info */}
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={currentStreamer?.avatarUrl}
                  alt={`${currentStreamer?.displayName} avatar`}
                  className="w-16 h-16 rounded-full object-cover border-3 border-primary"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {currentStreamer?.displayName}
                  </h3>
                  <p className="text-primary font-medium">
                    {formatViewerCount(currentStreamer?.followers)} followers
                  </p>
                </div>
              </div>

              {/* Stream Title */}
              <h4 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                {currentStreamer?.streamTitle}
              </h4>

              {/* Description */}
              <p className="text-gray-200 mb-4 line-clamp-3 max-w-lg">
                {currentStreamer?.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
                  {currentStreamer?.gameCategory}
                </span>
                {currentStreamer?.tags?.slice(0, 3)?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => onWatchClick(currentStreamer)}
                  iconName="Play"
                  iconPosition="left"
                  className="bg-primary hover:bg-primary/90"
                >
                  Watch Stream
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onFollowClick(currentStreamer)}
                  iconName={currentStreamer?.isFollowed ? "UserCheck" : "UserPlus"}
                  iconPosition="left"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {currentStreamer?.isFollowed ? 'Following' : 'Follow'}
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {featuredStreamers?.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white border-white/20"
              >
                <Icon name="ChevronLeft" size={24} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white border-white/20"
              >
                <Icon name="ChevronRight" size={24} />
              </Button>
            </>
          )}
        </div>

        {/* Slide Indicators */}
        {featuredStreamers?.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {featuredStreamers?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-gaming ${
                  index === currentSlide
                    ? 'bg-primary' :'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedStreamers;