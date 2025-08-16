import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TournamentCard from './components/TournamentCard';
import FilterPanel from './components/FilterPanel';
import TournamentTabs from './components/TournamentTabs';
import SortDropdown from './components/SortDropdown';
import JoinModal from './components/JoinModal';
import SkeletonCard from './components/SkeletonCard';

const TournamentListing = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tournaments, setTournaments] = useState([]);

  // Mock tournament data
  const mockTournaments = [
    {
      id: 1,
      name: "PUBG World Championship 2024",
      organizer: "PUBG Corporation",
      bannerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
      prizePool: 2000000,
      entryFee: 0,
      startDate: "2024-08-15T18:00:00Z",
      participants: 1247,
      maxParticipants: 2000,
      region: "Global",
      format: "squad",
      status: "registration",
      type: "battle-royale",
      duration: "3 days",
      isVerified: true,
      isSponsored: true,
      category: "long-term"
    },
    {
      id: 2,
      name: "Daily Grind Tournament",
      organizer: "ESL Gaming",
      bannerImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
      prizePool: 5000,
      entryFee: 10,
      startDate: "2024-08-11T20:00:00Z",
      participants: 89,
      maxParticipants: 100,
      region: "North America",
      format: "solo",
      status: "registration",
      type: "battle-royale",
      duration: "2 hours",
      isVerified: true,
      isSponsored: false,
      category: "daily"
    },
    {
      id: 3,
      name: "Squad Showdown",
      organizer: "GameBattles",
      bannerImage: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop",
      prizePool: 25000,
      entryFee: 25,
      startDate: "2024-08-13T16:00:00Z",
      participants: 156,
      maxParticipants: 200,
      region: "Europe",
      format: "squad",
      status: "upcoming",
      type: "battle-royale",
      duration: "4 hours",
      isVerified: true,
      isSponsored: true,
      category: "short-term"
    },
    {
      id: 4,
      name: "Arena Masters",
      organizer: "Pro Gaming League",
      bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      prizePool: 10000,
      entryFee: 15,
      startDate: "2024-08-12T14:00:00Z",
      participants: 67,
      maxParticipants: 80,
      region: "Asia Pacific",
      format: "duo",
      status: "live",
      type: "arena",
      duration: "3 hours",
      isVerified: false,
      isSponsored: false,
      category: "short-term"
    },
    {
      id: 5,
      name: "Midnight Mayhem",
      organizer: "Night Gaming",
      bannerImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=400&fit=crop",
      prizePool: 3000,
      entryFee: 0,
      startDate: "2024-08-11T23:00:00Z",
      participants: 234,
      maxParticipants: 300,
      region: "Global",
      format: "solo",
      status: "registration",
      type: "battle-royale",
      duration: "90 minutes",
      isVerified: true,
      isSponsored: false,
      category: "daily"
    },
    {
      id: 6,
      name: "Team Deathmatch Pro",
      organizer: "Competitive Gaming",
      bannerImage: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=400&fit=crop",
      prizePool: 8000,
      entryFee: 20,
      startDate: "2024-08-14T19:00:00Z",
      participants: 45,
      maxParticipants: 64,
      region: "South America",
      format: "squad",
      status: "upcoming",
      type: "tdm",
      duration: "2 hours",
      isVerified: true,
      isSponsored: true,
      category: "short-term"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const loadTournaments = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTournaments(mockTournaments);
      setIsLoading(false);
    };

    loadTournaments();
  }, []);

  const filterTournaments = (tournaments) => {
    let filtered = [...tournaments];

    // Filter by tab
    if (activeTab !== 'all') {
      const tabMap = {
        'daily': 'daily',
        'short-term': 'short-term',
        'long-term': 'long-term'
      };
      filtered = filtered?.filter(t => t?.category === tabMap?.[activeTab]);
    }

    // Apply filters
    if (filters?.search) {
      filtered = filtered?.filter(t => 
        t?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        t?.organizer?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.entryFee?.length) {
      filtered = filtered?.filter(t => {
        return filters?.entryFee?.some(range => {
          if (range === 'free') return t?.entryFee === 0;
          const [min, max] = range?.split('-')?.map(Number);
          if (range?.includes('+')) return t?.entryFee >= min;
          return t?.entryFee >= min && t?.entryFee <= max;
        });
      });
    }

    if (filters?.prizePool?.length) {
      filtered = filtered?.filter(t => {
        return filters?.prizePool?.some(range => {
          const [min, max] = range?.split('-')?.map(Number);
          if (range?.includes('+')) return t?.prizePool >= min;
          return t?.prizePool >= min && t?.prizePool <= max;
        });
      });
    }

    if (filters?.format?.length) {
      filtered = filtered?.filter(t => filters?.format?.includes(t?.format));
    }

    if (filters?.region?.length) {
      const regionMap = {
        'na': 'North America',
        'eu': 'Europe',
        'apac': 'Asia Pacific',
        'sa': 'South America',
        'me': 'Middle East'
      };
      filtered = filtered?.filter(t => 
        filters?.region?.some(r => regionMap?.[r] === t?.region || t?.region === 'Global')
      );
    }

    if (filters?.type?.length) {
      filtered = filtered?.filter(t => filters?.type?.includes(t?.type));
    }

    // Sort tournaments
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'prize-desc':
          return b?.prizePool - a?.prizePool;
        case 'prize-asc':
          return a?.prizePool - b?.prizePool;
        case 'date-asc':
          return new Date(a.startDate) - new Date(b.startDate);
        case 'date-desc':
          return new Date(b.startDate) - new Date(a.startDate);
        case 'entry-asc':
          return a?.entryFee - b?.entryFee;
        case 'entry-desc':
          return b?.entryFee - a?.entryFee;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredTournaments = filterTournaments(tournaments);

  const getTournamentCounts = () => {
    return {
      all: tournaments?.length,
      daily: tournaments?.filter(t => t?.category === 'daily')?.length,
      shortTerm: tournaments?.filter(t => t?.category === 'short-term')?.length,
      longTerm: tournaments?.filter(t => t?.category === 'long-term')?.length
    };
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleJoinTournament = (tournament) => {
    setSelectedTournament(tournament);
    setIsJoinModalOpen(true);
  };

  const handleConfirmJoin = (tournament) => {
    // Simulate joining tournament
    console.log('Joined tournament:', tournament?.name);
    setIsJoinModalOpen(false);
    setSelectedTournament(null);
    
    // Update tournament participants
    setTournaments(prev => 
      prev?.map(t => 
        t?.id === tournament?.id 
          ? { ...t, participants: t?.participants + 1 }
          : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="flex">
          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 lg:ml-4 xl:ml-6">
            <div className="p-4 lg:p-6">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      Tournament Listings
                    </h1>
                    <p className="text-muted-foreground">
                      Discover and join competitive PUBG tournaments
                    </p>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(true)}
                    iconName="Filter"
                    iconPosition="left"
                    className="lg:hidden"
                  >
                    Filters
                  </Button>
                </div>

                {/* Tournament Tabs */}
                <TournamentTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  tournamentCounts={getTournamentCounts()}
                />
              </div>

              {/* Sort and Results */}
              <div className="mb-6">
                <SortDropdown
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  resultsCount={filteredTournaments?.length}
                />
              </div>

              {/* Tournament Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 })?.map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : filteredTournaments?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTournaments?.map((tournament) => (
                    <TournamentCard
                      key={tournament?.id}
                      tournament={tournament}
                      onJoin={handleJoinTournament}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No tournaments found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Join Modal */}
      <JoinModal
        tournament={selectedTournament}
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onConfirm={handleConfirmJoin}
      />
    </div>
  );
};

export default TournamentListing;