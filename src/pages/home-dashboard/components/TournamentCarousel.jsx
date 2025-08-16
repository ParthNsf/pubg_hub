import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TournamentCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tournaments = [
    {
      id: 1,
      name: "PUBG Mobile World Championship",
      startDate: "2025-08-25",
      entryFee: "$25",
      prizePool: "$500,000",
      playerCount: 2847,
      teamCount: 156,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
      status: "open",
      category: "long-term"
    },
    {
      id: 2,
      name: "Daily Clash Arena",
      startDate: "2025-08-12",
      entryFee: "$5",
      prizePool: "$2,500",
      playerCount: 384,
      teamCount: 96,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
      status: "filling",
      category: "daily"
    },
    {
      id: 3,
      name: "Weekend Warriors Cup",
      startDate: "2025-08-16",
      entryFee: "$15",
      prizePool: "$25,000",
      playerCount: 1024,
      teamCount: 256,
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=250&fit=crop",
      status: "open",
      category: "short-term"
    },
    {
      id: 4,
      name: "Rookie Championship",
      startDate: "2025-08-20",
      entryFee: "$10",
      prizePool: "$10,000",
      playerCount: 512,
      teamCount: 128,
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=250&fit=crop",
      status: "open",
      category: "short-term"
    },
    {
      id: 5,
      name: "Pro League Qualifier",
      startDate: "2025-08-30",
      entryFee: "$50",
      prizePool: "$100,000",
      playerCount: 768,
      teamCount: 192,
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop",
      status: "open",
      category: "long-term"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, tournaments?.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, tournaments?.length - 2)) % Math.max(1, tournaments?.length - 2));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-success bg-success/10';
      case 'filling': return 'text-warning bg-warning/10';
      case 'closed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleJoinTournament = (tournamentId) => {
    window.location.href = '/tournament-listing';
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Featured Tournaments
          </h2>
          <p className="text-muted-foreground">
            Join competitive matches and climb the leaderboards
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
          {tournaments?.map((tournament) => (
            <div
              key={tournament?.id}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
            >
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-gaming group gaming-shadow">
                {/* Tournament Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tournament?.image}
                    alt={tournament?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-gaming-slow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament?.status)}`}>
                      {tournament?.status?.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                      {tournament?.category?.replace('-', ' ')?.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Tournament Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">
                    {tournament?.name}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <Icon name="Calendar" size={16} className="mr-2" />
                        Start Date
                      </span>
                      <span className="text-foreground font-medium">
                        {new Date(tournament.startDate)?.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <Icon name="DollarSign" size={16} className="mr-2" />
                        Entry Fee
                      </span>
                      <span className="text-primary font-bold">{tournament?.entryFee}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <Icon name="Trophy" size={16} className="mr-2" />
                        Prize Pool
                      </span>
                      <span className="text-secondary font-bold">{tournament?.prizePool}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <Icon name="Users" size={16} className="mr-2" />
                        Participants
                      </span>
                      <span className="text-foreground font-medium">
                        {tournament?.playerCount?.toLocaleString()} players
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="default"
                    fullWidth
                    onClick={() => handleJoinTournament(tournament?.id)}
                    iconName="Zap"
                    iconPosition="left"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    Join Tournament
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
          onClick={() => window.location.href = '/tournament-listing'}
          iconName="ArrowRight"
          iconPosition="right"
          className="border-primary text-primary hover:bg-primary/10"
        >
          View All Tournaments
        </Button>
      </div>
    </div>
  );
};

export default TournamentCarousel;