import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToActionCards = () => {
  const handleBecomeStreamer = () => {
    window.location.href = '/streamers-directory';
  };

  const handleHostTournament = () => {
    window.location.href = '/tournament-listing';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
      {/* Become a Streamer Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-secondary/80 to-primary p-8 gaming-shadow-purple group">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Icon name="Video" size={24} color="white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Become a Streamer
              </h3>
              <p className="text-white/80 text-sm">
                Share your gameplay with the world
              </p>
            </div>
          </div>

          <p className="text-white/90 mb-6 leading-relaxed">
            Join our streaming community and showcase your PUBG skills to thousands of viewers. 
            Get access to exclusive streamer tools, monetization options, and promotional support.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3 text-white/90">
              <Icon name="Check" size={16} className="text-white" />
              <span className="text-sm">Stream integration with Twitch & YouTube</span>
            </div>
            <div className="flex items-center space-x-3 text-white/90">
              <Icon name="Check" size={16} className="text-white" />
              <span className="text-sm">Donation and subscription management</span>
            </div>
            <div className="flex items-center space-x-3 text-white/90">
              <Icon name="Check" size={16} className="text-white" />
              <span className="text-sm">Featured streamer opportunities</span>
            </div>
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={handleBecomeStreamer}
            iconName="ArrowRight"
            iconPosition="right"
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-gaming"
          >
            Start Streaming
          </Button>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>
      </div>

      {/* Host Tournament Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-accent p-8 gaming-shadow group">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Icon name="Trophy" size={24} color="white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Host a Tournament
              </h3>
              <p className="text-white/80 text-sm">
                Organize competitive events
              </p>
            </div>
          </div>

          <p className="text-white/90 mb-6 leading-relaxed">
            Create and manage your own PUBG tournaments with our comprehensive tournament 
            management system. Set prize pools, manage registrations, and track results.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3 text-white/90">
              <Icon name="Check" size={16} className="text-white" />
              <span className="text-sm">Complete tournament management tools</span>
            </div>
            <div className="flex items-center space-x-3 text-white/90">
              <Icon name="Check" size={16} className="text-white" />
              <span className="text-sm">Automated bracket generation</span>
            </div>
            <div className="flex items-center space-x-3 text-white/90">
              <Icon name="Check" size={16} className="text-white" />
              <span className="text-sm">Prize pool and payment processing</span>
            </div>
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={handleHostTournament}
            iconName="ArrowRight"
            iconPosition="right"
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-gaming"
          >
            Create Tournament
          </Button>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 left-6 w-28 h-28 border border-white/20 rounded-xl rotate-12"></div>
          <div className="absolute bottom-6 right-6 w-20 h-20 border border-white/20 rounded-xl -rotate-12"></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 border border-white/20 rounded-xl rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionCards;