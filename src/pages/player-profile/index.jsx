import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PlayerHeader from './components/PlayerHeader';
import StatisticsCards from './components/StatisticsCards';
import RecentMatches from './components/RecentMatches';
import PerformanceChart from './components/PerformanceChart';
import TeamAffiliation from './components/TeamAffiliation';
import StreamingSection from './components/StreamingSection';
import AchievementGallery from './components/AchievementGallery';
import Icon from '../../components/AppIcon';

const PlayerProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock player data
  const playerData = {
    nickname: "ProGamer2024",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
    region: "North America",
    gameVersion: "PUBG PC",
    rank: "Diamond",
    rankPoints: 4250,
    level: 87,
    totalMatches: 1247,
    totalKills: 8934,
    winRate: 23,
    isOnline: true,
    achievements: [
      { name: "Chicken Dinner", icon: "Trophy" },
      { name: "Headshot King", icon: "Target" },
      { name: "Squad Leader", icon: "Crown" }
    ]
  };

  const statisticsData = {
    matchesPlayed: 1247,
    kdRatio: 2.34,
    winPercentage: 23,
    averageDamage: 1456,
    survivalTime: "18m 32s",
    headshotRate: 34
  };

  const recentMatches = [
    {
      date: "Aug 11, 2025",
      time: "14:30",
      map: "Erangel",
      mapImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
      kills: 8,
      damage: 1834,
      placement: 1,
      duration: "28m 45s",
      mode: "Squad"
    },
    {
      date: "Aug 11, 2025",
      time: "13:15",
      map: "Sanhok",
      mapImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop",
      kills: 5,
      damage: 1245,
      placement: 3,
      duration: "22m 18s",
      mode: "Squad"
    },
    {
      date: "Aug 10, 2025",
      time: "19:45",
      map: "Miramar",
      mapImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=100&h=100&fit=crop",
      kills: 12,
      damage: 2156,
      placement: 2,
      duration: "31m 22s",
      mode: "Squad"
    },
    {
      date: "Aug 10, 2025",
      time: "18:30",
      map: "Vikendi",
      mapImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop",
      kills: 3,
      damage: 987,
      placement: 15,
      duration: "15m 33s",
      mode: "Solo"
    },
    {
      date: "Aug 10, 2025",
      time: "17:20",
      map: "Erangel",
      mapImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
      kills: 7,
      damage: 1678,
      placement: 4,
      duration: "26m 12s",
      mode: "Duo"
    },
    {
      date: "Aug 09, 2025",
      time: "20:15",
      map: "Sanhok",
      mapImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop",
      kills: 9,
      damage: 1923,
      placement: 1,
      duration: "24m 45s",
      mode: "Squad"
    }
  ];

  const performanceData = [
    { date: "Aug 5", kills: 6, damage: 1200, placement: 8, survivalTime: 15 },
    { date: "Aug 6", kills: 8, damage: 1450, placement: 3, survivalTime: 22 },
    { date: "Aug 7", kills: 5, damage: 1100, placement: 12, survivalTime: 18 },
    { date: "Aug 8", kills: 10, damage: 1800, placement: 2, survivalTime: 28 },
    { date: "Aug 9", kills: 7, damage: 1350, placement: 5, survivalTime: 20 },
    { date: "Aug 10", kills: 9, damage: 1650, placement: 4, survivalTime: 25 },
    { date: "Aug 11", kills: 12, damage: 1950, placement: 1, survivalTime: 30 }
  ];

  const currentTeam = {
    name: "Thunder Esports",
    logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=200&fit=crop",
    description: "Professional PUBG team competing in international tournaments",
    role: "IGL",
    joinDate: "March 2024",
    stats: {
      tournaments: 15,
      wins: 8,
      earnings: "25,000",
      ranking: 3
    }
  };

  const previousTeams = [
    {
      name: "Phoenix Gaming",
      logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop",
      role: "Fragger",
      startDate: "Jan 2023",
      endDate: "Feb 2024",
      duration: "1 year 1 month",
      achievements: 12,
      earnings: "18,500"
    },
    {
      name: "Storm Riders",
      logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
      role: "Support",
      startDate: "Jun 2022",
      endDate: "Dec 2022",
      duration: "6 months",
      achievements: 5,
      earnings: "8,200"
    }
  ];

  const streamData = {
    isStreamer: true,
    isLive: false,
    streamerName: "ProGamer2024",
    embedUrl: "https://player.twitch.tv/?channel=progamer2024&parent=localhost",
    currentTitle: "PUBG Ranked Grind - Road to Conqueror",
    description: "Professional PUBG player streaming ranked matches and tournaments. Tips and tricks for improving your gameplay!",
    followers: 45230,
    currentViewers: 0,
    totalHours: 1247,
    lastStream: "2 hours ago",
    socialLinks: {
      twitch: "https://twitch.tv/progamer2024",
      youtube: "https://youtube.com/progamer2024"
    },
    schedule: [
      { day: "Monday", time: "7:00 PM - 11:00 PM EST", content: "Ranked Gameplay" },
      { day: "Wednesday", time: "6:00 PM - 10:00 PM EST", content: "Viewer Games" },
      { day: "Friday", time: "8:00 PM - 12:00 AM EST", content: "Tournament Practice" },
      { day: "Sunday", time: "3:00 PM - 7:00 PM EST", content: "Community Events" }
    ],
    highlights: [
      {
        title: "25 Kill Solo Squad Win",
        date: "Aug 8, 2025",
        duration: "3:45",
        views: 125000,
        likes: 8500
      },
      {
        title: "Clutch 1v4 Final Circle",
        date: "Aug 6, 2025",
        duration: "2:30",
        views: 89000,
        likes: 6200
      },
      {
        title: "Perfect Headshot Compilation",
        date: "Aug 4, 2025",
        duration: "5:20",
        views: 156000,
        likes: 12000
      },
      {
        title: "Tournament Winning Moment",
        date: "Aug 1, 2025",
        duration: "4:15",
        views: 234000,
        likes: 18500
      }
    ]
  };

  const achievements = [
    {
      name: "First Victory",
      description: "Win your first match",
      category: "milestone",
      rarity: "common",
      unlocked: true,
      unlockedDate: "Jan 15, 2023",
      iconName: "Trophy"
    },
    {
      name: "Chicken Dinner Master",
      description: "Win 100 matches",
      category: "milestone",
      rarity: "rare",
      unlocked: true,
      unlockedDate: "Mar 22, 2024",
      iconName: "Crown"
    },
    {
      name: "Headshot King",
      description: "Get 1000 headshot kills",
      category: "skill",
      rarity: "epic",
      unlocked: true,
      unlockedDate: "Jul 8, 2024",
      iconName: "Target"
    },
    {
      name: "Tournament Champion",
      description: "Win a major tournament",
      category: "tournament",
      rarity: "legendary",
      unlocked: true,
      unlockedDate: "Aug 1, 2025",
      iconName: "Medal"
    },
    {
      name: "Survival Expert",
      description: "Survive 30+ minutes in 50 matches",
      category: "skill",
      rarity: "rare",
      unlocked: true,
      unlockedDate: "May 12, 2024",
      iconName: "Clock"
    },
    {
      name: "Team Player",
      description: "Revive teammates 500 times",
      category: "skill",
      rarity: "common",
      unlocked: true,
      unlockedDate: "Apr 3, 2024",
      iconName: "Heart"
    },
    {
      name: "Legendary Warrior",
      description: "Reach Conqueror rank",
      category: "milestone",
      rarity: "mythic",
      unlocked: false,
      progress: 85,
      requirement: "Reach 4500+ rank points",
      iconName: "Gem"
    },
    {
      name: "Perfect Game",
      description: "Win with 20+ kills and 0 damage taken",
      category: "special",
      rarity: "mythic",
      unlocked: false,
      progress: 0,
      requirement: "Complete a flawless victory",
      iconName: "Star"
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'User' },
    { id: 'statistics', name: 'Statistics', icon: 'BarChart3' },
    { id: 'matches', name: 'Match History', icon: 'History' },
    { id: 'achievements', name: 'Achievements', icon: 'Award' },
    { id: 'teams', name: 'Teams', icon: 'Users' },
    { id: 'streaming', name: 'Streaming', icon: 'Video' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Loading Player Profile</h2>
                <p className="text-muted-foreground">Please wait while we fetch the player data...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Player Header */}
          <div className="mb-8">
            <PlayerHeader player={playerData} />
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-gaming ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <>
                <StatisticsCards statistics={statisticsData} />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <RecentMatches matches={recentMatches?.slice(0, 3)} />
                  <PerformanceChart performanceData={performanceData} />
                </div>
              </>
            )}

            {activeTab === 'statistics' && (
              <>
                <StatisticsCards statistics={statisticsData} />
                <PerformanceChart performanceData={performanceData} />
              </>
            )}

            {activeTab === 'matches' && (
              <RecentMatches matches={recentMatches} />
            )}

            {activeTab === 'achievements' && (
              <AchievementGallery achievements={achievements} />
            )}

            {activeTab === 'teams' && (
              <TeamAffiliation 
                currentTeam={currentTeam} 
                previousTeams={previousTeams} 
              />
            )}

            {activeTab === 'streaming' && (
              <StreamingSection streamData={streamData} />
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="var(--color-background)" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  PUBG Tournament Hub
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                The ultimate platform for PUBG competitive gaming. Join tournaments, track your progress, and connect with the gaming community.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-gaming">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-gaming">
                  <Icon name="Youtube" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-gaming">
                  <Icon name="Twitch" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-gaming">
                  <Icon name="Discord" size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/home-dashboard" className="text-muted-foreground hover:text-primary transition-gaming">Home</a></li>
                <li><a href="/tournament-listing" className="text-muted-foreground hover:text-primary transition-gaming">Tournaments</a></li>
                <li><a href="/game-information-hub" className="text-muted-foreground hover:text-primary transition-gaming">Game Info</a></li>
                <li><a href="/streamers-directory" className="text-muted-foreground hover:text-primary transition-gaming">Streamers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-gaming">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-gaming">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-gaming">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-gaming">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} PUBG Tournament Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlayerProfile;