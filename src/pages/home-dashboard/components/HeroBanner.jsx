import React, { useState, useEffect } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to next major tournament (15 days from now)
    const targetDate = new Date();
    targetDate?.setDate(targetDate?.getDate() + 15);
    targetDate?.setHours(18, 0, 0, 0); // 6 PM

    const timer = setInterval(() => {
      const now = new Date()?.getTime();
      const distance = targetDate?.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleJoinTournament = () => {
    window.location.href = '/tournament-listing';
  };

  const handleViewMatches = () => {
    window.location.href = '/tournament-listing';
  };

  return (
    <div className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-2xl mb-8">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop"
          alt="PUBG Tournament Arena"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl">
            {/* Tournament Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full pulse-slow"></div>
              <span className="text-sm font-mono text-primary font-medium">MAJOR TOURNAMENT</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              PUBG World
              <span className="block text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                Championship
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join the ultimate battle royale experience. Compete with the best players worldwide for a massive prize pool of $500,000.
            </p>

            {/* Countdown Timer */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-sm font-medium text-muted-foreground">STARTS IN:</span>
              <div className="flex items-center space-x-2">
                {Object.entries(timeLeft)?.map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-card border border-border rounded-lg px-3 py-2 min-w-[60px]">
                      <div className="text-xl lg:text-2xl font-bold text-primary font-mono">
                        {value?.toString()?.padStart(2, '0')}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase font-medium">
                        {unit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={handleJoinTournament}
                iconName="Trophy"
                iconPosition="left"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 gaming-shadow"
              >
                Join Tournament
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleViewMatches}
                iconName="Play"
                iconPosition="left"
                className="border-secondary text-secondary hover:bg-secondary/10 gaming-shadow-purple"
              >
                View Matches
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 mt-8 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2,847</div>
                <div className="text-sm text-muted-foreground">Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">$500K</div>
                <div className="text-sm text-muted-foreground">Prize Pool</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">156</div>
                <div className="text-sm text-muted-foreground">Teams</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;