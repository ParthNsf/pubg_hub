import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import StreamerCard from './components/StreamerCard';
import StreamerFilters from './components/StreamerFilters';
import FeaturedStreamers from './components/FeaturedStreamers';
import TrendingSidebar from './components/TrendingSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StreamersDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    language: 'all',
    viewerRange: 'all',
    gameMode: 'all',
    skillLevel: 'all',
    sortBy: 'viewers',
    liveOnly: false
  });
  const [filteredStreamers, setFilteredStreamers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for streamers
  const mockStreamers = [
    {
      id: 1,
      displayName: "ProGamer_Alex",
      streamTitle: "Road to Conqueror - Solo vs Squad Gameplay",
      description: "Professional PUBG player with 5+ years experience. Teaching advanced strategies and tactics for competitive play.",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
      thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
      isLive: true,
      viewerCount: 15420,
      followers: 89500,
      gameCategory: "PUBG Mobile",
      language: "english",
      tags: ["Pro Player", "Educational", "Solo"],
      skillLevel: "pro",
      gameMode: "solo",
      isFollowed: false,
      streamStartTime: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      displayName: "QueenSniper",
      streamTitle: "Sniper Montage & Tips - Long Range Eliminations",
      description: "Sniper specialist focusing on long-range combat techniques and positioning strategies.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      thumbnailUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop",
      isLive: true,
      viewerCount: 8750,
      followers: 45200,
      gameCategory: "PUBG PC",
      language: "english",
      tags: ["Sniper", "Tips", "Montage"],
      skillLevel: "advanced",
      gameMode: "squad",
      isFollowed: true,
      streamStartTime: new Date(Date.now() - 7200000)
    },
    {
      id: 3,
      displayName: "TeamTactician",
      streamTitle: "Squad Coordination & Communication Masterclass",
      description: "Former esports coach teaching team coordination, communication, and strategic gameplay.",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      thumbnailUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&h=450&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=1200&h=600&fit=crop",
      isLive: false,
      viewerCount: 0,
      followers: 67800,
      gameCategory: "PUBG PC",
      language: "english",
      tags: ["Coaching", "Strategy", "Team Play"],
      skillLevel: "pro",
      gameMode: "squad",
      isFollowed: false,
      streamStartTime: null
    },
    {
      id: 4,
      displayName: "RushKing_YT",
      streamTitle: "Aggressive Gameplay - Hot Drop Challenges",
      description: "High-energy gameplay focused on aggressive strategies and hot drop survival techniques.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      thumbnailUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=600&fit=crop",
      isLive: true,
      viewerCount: 12300,
      followers: 156000,
      gameCategory: "PUBG Mobile",
      language: "english",
      tags: ["Aggressive", "Hot Drop", "High Kill"],
      skillLevel: "advanced",
      gameMode: "solo",
      isFollowed: false,
      streamStartTime: new Date(Date.now() - 1800000)
    },
    {
      id: 5,
      displayName: "CasualGamer_Sam",
      streamTitle: "Chill PUBG Session - Learning Together",
      description: "Beginner-friendly content with tips for new players and casual gameplay sessions.",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      thumbnailUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=450&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=600&fit=crop",
      isLive: true,
      viewerCount: 3200,
      followers: 18500,
      gameCategory: "PUBG Mobile",
      language: "english",
      tags: ["Beginner Friendly", "Chill", "Learning"],
      skillLevel: "beginner",
      gameMode: "duo",
      isFollowed: true,
      streamStartTime: new Date(Date.now() - 5400000)
    },
    {
      id: 6,
      displayName: "EsportsAnalyst",
      streamTitle: "Tournament Analysis & Pro Player Reviews",
      description: "Professional esports analyst breaking down tournament matches and pro player strategies.",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      thumbnailUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=450&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=600&fit=crop",
      isLive: false,
      viewerCount: 0,
      followers: 92400,
      gameCategory: "PUBG PC",
      language: "english",
      tags: ["Analysis", "Tournament", "Educational"],
      skillLevel: "pro",
      gameMode: "custom",
      isFollowed: false,
      streamStartTime: null
    },
    {
      id: 7,
      displayName: "MobileGaming_Pro",
      streamTitle: "PUBG Mobile Championship Preparation",
      description: "Mobile gaming specialist preparing for upcoming championships with advanced techniques.",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      thumbnailUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=450&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=1200&h=600&fit=crop",
      isLive: true,
      viewerCount: 6800,
      followers: 34700,
      gameCategory: "PUBG Mobile",
      language: "english",
      tags: ["Mobile", "Championship", "Competitive"],
      skillLevel: "pro",
      gameMode: "squad",
      isFollowed: false,
      streamStartTime: new Date(Date.now() - 2700000)
    },
    {
      id: 8,
      displayName: "StreamerGirl_Luna",
      streamTitle: "Girls Gaming Night - Squad Up!",
      description: "Creating a welcoming space for female gamers with fun squad gameplay and community building.",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
      isLive: true,
      viewerCount: 9500,
      followers: 78200,
      gameCategory: "PUBG PC",
      language: "english",
      tags: ["Community", "Squad", "Inclusive"],
      skillLevel: "intermediate",
      gameMode: "squad",
      isFollowed: true,
      streamStartTime: new Date(Date.now() - 4500000)
    }
  ];

  // Featured streamers (top performers)
  const featuredStreamers = mockStreamers?.filter(s => s?.followers > 50000)?.slice(0, 3);

  // Trending streamers (currently live with high viewer count)
  const trendingStreamers = mockStreamers?.filter(s => s?.isLive)?.sort((a, b) => b?.viewerCount - a?.viewerCount)?.slice(0, 5);

  // Recently followed (mock data)
  const recentlyFollowed = mockStreamers?.filter(s => s?.isFollowed)?.slice(0, 3);

  // Recommendations (mock algorithm)
  const recommendations = mockStreamers?.filter(s => !s?.isFollowed && s?.skillLevel === 'intermediate')?.slice(0, 4);

  // Filter and sort streamers
  useEffect(() => {
    let filtered = [...mockStreamers];

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(streamer =>
        streamer?.displayName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        streamer?.streamTitle?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        streamer?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply filters
    if (filters?.language !== 'all') {
      filtered = filtered?.filter(s => s?.language === filters?.language);
    }

    if (filters?.gameMode !== 'all') {
      filtered = filtered?.filter(s => s?.gameMode === filters?.gameMode);
    }

    if (filters?.skillLevel !== 'all') {
      filtered = filtered?.filter(s => s?.skillLevel === filters?.skillLevel);
    }

    if (filters?.liveOnly) {
      filtered = filtered?.filter(s => s?.isLive);
    }

    if (filters?.viewerRange !== 'all') {
      const [min, max] = filters?.viewerRange?.split('-')?.map(v => 
        v?.includes('+') ? Infinity : parseInt(v)
      );
      filtered = filtered?.filter(s => {
        if (max === undefined) return s?.viewerCount >= min;
        return s?.viewerCount >= min && s?.viewerCount <= max;
      });
    }

    // Apply sorting
    switch (filters?.sortBy) {
      case 'viewers':
        filtered?.sort((a, b) => b?.viewerCount - a?.viewerCount);
        break;
      case 'recent':
        filtered?.sort((a, b) => {
          if (!a?.streamStartTime && !b?.streamStartTime) return 0;
          if (!a?.streamStartTime) return 1;
          if (!b?.streamStartTime) return -1;
          return b?.streamStartTime - a?.streamStartTime;
        });
        break;
      case 'followers':
        filtered?.sort((a, b) => b?.followers - a?.followers);
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.displayName?.localeCompare(b?.displayName));
        break;
      default:
        break;
    }

    setFilteredStreamers(filtered);
    setIsLoading(false);
  }, [searchQuery, filters]);

  const handleWatchClick = (streamer) => {
    console.log('Watching streamer:', streamer?.displayName);
    // In a real app, this would navigate to the streamer's page or open the stream
  };

  const handleFollowClick = (streamer) => {
    console.log('Following/Unfollowing streamer:', streamer?.displayName);
    // In a real app, this would update the follow status
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setFilters({
      language: 'all',
      viewerRange: 'all',
      gameMode: 'all',
      skillLevel: 'all',
      sortBy: 'viewers',
      liveOnly: false
    });
    setSearchQuery('');
  };

  const liveStreamersCount = mockStreamers?.filter(s => s?.isLive)?.length;
  const totalViewers = mockStreamers?.reduce((sum, s) => sum + s?.viewerCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Streamers Directory
                </h1>
                <p className="text-muted-foreground">
                  Discover and watch the best PUBG content creators
                </p>
              </div>
              
              {/* Live Stats */}
              <div className="flex items-center space-x-6 mt-4 lg:mt-0">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-error rounded-full pulse-slow"></div>
                  <span className="text-sm font-mono text-foreground">
                    {liveStreamersCount} Live
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Eye" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-mono text-foreground">
                    {totalViewers?.toLocaleString()} Viewers
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Streamers */}
            <FeaturedStreamers
              featuredStreamers={featuredStreamers}
              onWatchClick={handleWatchClick}
              onFollowClick={handleFollowClick}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Filters */}
              <StreamerFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
                searchQuery={searchQuery}
                onClearFilters={handleClearFilters}
              />

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'All Streamers'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredStreamers?.length} streamers found
                  </p>
                </div>
              </div>

              {/* Streamers Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)]?.map((_, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                      <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-muted rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded mb-2"></div>
                          <div className="h-3 bg-muted rounded w-2/3"></div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-8 bg-muted rounded flex-1"></div>
                        <div className="h-8 bg-muted rounded flex-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredStreamers?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredStreamers?.map((streamer) => (
                    <StreamerCard
                      key={streamer?.id}
                      streamer={streamer}
                      onWatchClick={handleWatchClick}
                      onFollowClick={handleFollowClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No streamers found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <TrendingSidebar
                trendingStreamers={trendingStreamers}
                recentlyFollowed={recentlyFollowed}
                recommendations={recommendations}
                onWatchClick={handleWatchClick}
                onFollowClick={handleFollowClick}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StreamersDirectory;