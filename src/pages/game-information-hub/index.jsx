import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MapCard from './components/MapCard';
import WeaponCard from './components/WeaponCard';
import VehicleCard from './components/VehicleCard';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import WeaponComparison from './components/WeaponComparison';
import CommunityTips from './components/CommunityTips';

const GameInformationHub = () => {
  const [activeTab, setActiveTab] = useState('maps');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareWeapons, setCompareWeapons] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Mock data for maps
  const mapsData = [
    {
      id: 1,
      name: "Erangel",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      size: "8x8 km",
      terrain: "Mixed",
      maxPlayers: 100,
      avgDuration: "30-35 min",
      description: "The classic battle royale map with diverse terrain and strategic locations.",
      hotZones: ["School", "Military Base", "Pochinki", "Georgopol"],
      tips: [
        "Land at School for intense early combat and high-tier loot",
        "Military Base offers best weapons but expect heavy competition",
        "Use bridges strategically - they\'re common ambush points",
        "Erangel favors long-range combat due to open terrain"
      ]
    },
    {
      id: 2,
      name: "Sanhok",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      size: "4x4 km",
      terrain: "Tropical",
      maxPlayers: 64,
      avgDuration: "20-25 min",
      description: "Dense jungle map with fast-paced gameplay and close-quarter combat.",
      hotZones: ["Paradise Resort", "Bootcamp", "Ruins", "Quarry"],
      tips: [
        "Dense vegetation provides excellent cover for rotations",
        "SMGs and assault rifles are more effective than snipers",
        "Use the river system for safe rotations",
        "Third-partying is common due to compact map size"
      ]
    },
    {
      id: 3,
      name: "Miramar",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
      size: "8x8 km",
      terrain: "Desert",
      maxPlayers: 100,
      avgDuration: "30-35 min",
      description: "Desert map emphasizing long-range combat and vehicle usage.",
      hotZones: ["Hacienda del Patrón", "Pecado", "Los Leones", "Prison de los Leones"],
      tips: [
        "Vehicles are essential for rotations due to open terrain",
        "Prioritize sniper rifles and DMRs for long-range engagements",
        "Use elevation advantage - high ground is crucial",
        "Compound fighting requires different tactics than other maps"
      ]
    }
  ];

  // Mock data for weapons
  const weaponsData = [
    {
      id: 1,
      name: "AKM",
      image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=300&h=200&fit=crop",
      category: "Assault Rifle",
      rarity: "Common",
      damage: 49,
      range: 75,
      fireRate: 60,
      ammoType: "7.62mm",
      recoil: "High",
      description: "High damage assault rifle with significant recoil but excellent stopping power.",
      attachments: ["Red Dot", "Holographic", "4x Scope", "Compensator", "Flash Hider"]
    },
    {
      id: 2,
      name: "M416",
      image: "https://images.unsplash.com/photo-1544717684-6ad7a2b2c0b5?w=300&h=200&fit=crop",
      category: "Assault Rifle",
      rarity: "Common",
      damage: 43,
      range: 80,
      fireRate: 75,
      ammoType: "5.56mm",
      recoil: "Medium",
      description: "Versatile assault rifle with good balance of damage, range, and controllability.",
      attachments: ["Red Dot", "2x Scope", "4x Scope", "Vertical Grip", "Compensator"]
    },
    {
      id: 3,
      name: "AWM",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      category: "Sniper Rifle",
      rarity: "Legendary",
      damage: 120,
      range: 95,
      fireRate: 20,
      ammoType: ".300 Magnum",
      recoil: "Very High",
      description: "The most powerful sniper rifle capable of one-shot headshot kills through level 3 helmet.",
      attachments: ["8x Scope", "15x Scope", "Cheek Pad", "Extended Mag"]
    },
    {
      id: 4,
      name: "UMP45",
      image: "https://images.unsplash.com/photo-1544717684-6ad7a2b2c0b5?w=300&h=200&fit=crop",
      category: "SMG",
      rarity: "Common",
      damage: 39,
      range: 45,
      fireRate: 85,
      ammoType: ".45 ACP",
      recoil: "Low",
      description: "Reliable submachine gun perfect for close to medium range combat.",
      attachments: ["Red Dot", "Holographic", "Vertical Grip", "Extended Mag"]
    }
  ];

  // Mock data for vehicles
  const vehiclesData = [
    {
      id: 1,
      name: "UAZ",
      image: "https://images.unsplash.com/photo-1544717684-6ad7a2b2c0b5?w=300&h=200&fit=crop",
      type: "SUV",
      fuel: "Gasoline",
      maxSpeed: 104,
      capacity: 4,
      durability: 85,
      acceleration: 65,
      handling: 70,
      offRoad: 90,
      description: "Robust all-terrain vehicle perfect for squad rotations across any map.",
      tacticalTips: [
        "Excellent for crossing rough terrain and hills",
        "High durability makes it ideal for late-game rotations",
        "Can be used as mobile cover in open areas",
        "Slower acceleration but reliable in all conditions"
      ],
      bestTerrain: ["Hills", "Rough Roads", "Off-road", "Desert"]
    },
    {
      id: 2,
      name: "Motorcycle",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      type: "Bike",
      fuel: "Gasoline",
      maxSpeed: 152,
      capacity: 2,
      durability: 45,
      acceleration: 95,
      handling: 85,
      offRoad: 60,
      description: "Fastest vehicle for quick rotations and flanking maneuvers.",
      tacticalTips: [
        "Use for quick repositioning and flanking enemies",
        "Excellent for escaping the blue zone rapidly",
        "Vulnerable to enemy fire - use cover when possible",
        "Perfect for duo teams needing fast mobility"
      ],
      bestTerrain: ["Roads", "Open Fields", "Urban Areas"]
    },
    {
      id: 3,
      name: "Dacia",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop",
      type: "Sedan",
      fuel: "Gasoline",
      maxSpeed: 126,
      capacity: 4,
      durability: 70,
      acceleration: 80,
      handling: 75,
      offRoad: 50,
      description: "Balanced vehicle offering good speed and capacity for squad gameplay.",
      tacticalTips: [
        "Good balance of speed and protection for squads",
        "Performs best on paved roads and flat terrain",
        "Moderate fuel consumption for long rotations",
        "Can ram through fences and small obstacles"
      ],
      bestTerrain: ["Roads", "Urban Areas", "Flat Ground"]
    }
  ];

  // Mock data for community tips
  const communityTips = [
    {
      id: 1,
      title: "Master the Art of Third-Partying",
      preview: "Learn when and how to engage fights that are already in progress to maximize your advantage...",
      fullContent: `Learn when and how to engage fights that are already in progress to maximize your advantage. Third-partying is one of the most effective strategies in PUBG when executed correctly.\n\nKey principles:\n1. Wait for both teams to be heavily engaged\n2. Position yourself with good cover and escape routes\n3. Target the team with lower health first\n4. Always have a backup plan if things go wrong\n\nTiming is everything - engage too early and you'll face two full-health teams, too late and you might miss the opportunity entirely.`,
      author: {
        name: "ProGamer_2024",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.8
      },
      category: "Strategy",
      timeAgo: "2 hours ago",
      likes: 156,
      comments: 23,
      tags: ["combat", "positioning", "timing"]
    },
    {
      id: 2,
      title: "Erangel Bridge Control Guide",
      preview: "Complete guide to controlling and crossing bridges on Erangel safely...",
      fullContent: `Complete guide to controlling and crossing bridges on Erangel safely. Bridges are crucial chokepoints that can make or break your game.\n\nBridge Control Strategy:\n1. Arrive early and set up crossfires\n2. Use vehicles as cover and bait\n3. Always have someone watching flanks\n4. Coordinate utility usage (smokes, frags)\n\nCrossing Safely:\n1. Scout with scopes before approaching\n2. Use smoke grenades for cover\n3. Consider alternative routes (swimming)\n4. Time your crossing with zone movements`,
      author: {
        name: "BridgeMaster",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.9
      },
      category: "Map Control",
      timeAgo: "5 hours ago",
      likes: 203,
      comments: 31,
      tags: ["erangel", "bridges", "positioning", "teamwork"]
    }
  ];

  const tabs = [
    { id: 'maps', label: 'Maps', icon: 'Map', count: mapsData?.length },
    { id: 'weapons', label: 'Weapons', icon: 'Zap', count: weaponsData?.length },
    { id: 'vehicles', label: 'Vehicles', icon: 'Car', count: vehiclesData?.length },
    { id: 'tips', label: 'Community Tips', icon: 'Users', count: communityTips?.length }
  ];

  // Filter data based on search query and active tab
  useEffect(() => {
    let data = [];
    switch (activeTab) {
      case 'maps':
        data = mapsData;
        break;
      case 'weapons':
        data = weaponsData;
        break;
      case 'vehicles':
        data = vehiclesData;
        break;
      case 'tips':
        data = communityTips;
        break;
      default:
        data = [];
    }

    if (searchQuery) {
      data = data?.filter(item =>
        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    setFilteredData(data);
  }, [activeTab, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMapDetails = (map) => {
    console.log('View map details:', map);
  };

  const handleWeaponCompare = (weapon) => {
    const isAlreadyComparing = compareWeapons?.find(w => w?.id === weapon?.id);
    
    if (isAlreadyComparing) {
      setCompareWeapons(compareWeapons?.filter(w => w?.id !== weapon?.id));
    } else if (compareWeapons?.length < 3) {
      setCompareWeapons([...compareWeapons, weapon]);
    }
  };

  const handleRemoveFromComparison = (weaponId) => {
    setCompareWeapons(compareWeapons?.filter(w => w?.id !== weaponId));
  };

  const handleClearComparison = () => {
    setCompareWeapons([]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'maps':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData?.map((map) => (
              <MapCard
                key={map?.id}
                map={map}
                onViewDetails={handleMapDetails}
              />
            ))}
          </div>
        );
      
      case 'weapons':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData?.map((weapon) => (
              <WeaponCard
                key={weapon?.id}
                weapon={weapon}
                onCompare={handleWeaponCompare}
                isComparing={compareWeapons?.some(w => w?.id === weapon?.id)}
              />
            ))}
          </div>
        );
      
      case 'vehicles':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData?.map((vehicle) => (
              <VehicleCard
                key={vehicle?.id}
                vehicle={vehicle}
              />
            ))}
          </div>
        );
      
      case 'tips':
        return <CommunityTips tips={filteredData} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 border border-primary/20">
              <Icon name="BookOpen" size={16} />
              <span>Game Information Hub</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Master PUBG with
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Expert Knowledge</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guides, weapon stats, map strategies, and community insights to dominate the battleground
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-6">
            <div className="max-w-2xl mx-auto">
              <SearchBar
                onSearch={handleSearch}
                placeholder={`Search ${activeTab}...`}
              />
            </div>
            
            <FilterTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabs={tabs}
            />
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-4 text-center gaming-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Map" size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{mapsData?.length}</div>
              <div className="text-sm text-muted-foreground">Battle Maps</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center gaming-shadow">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Zap" size={24} className="text-destructive" />
              </div>
              <div className="text-2xl font-bold text-foreground">{weaponsData?.length}</div>
              <div className="text-sm text-muted-foreground">Weapons</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center gaming-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Car" size={24} className="text-secondary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{vehiclesData?.length}</div>
              <div className="text-sm text-muted-foreground">Vehicles</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center gaming-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Users" size={24} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">{communityTips?.length}</div>
              <div className="text-sm text-muted-foreground">Pro Tips</div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mb-8">
            {filteredData?.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or browse different categories
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              renderContent()
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Training Mode</h3>
                  <p className="text-sm text-muted-foreground">Practice with weapons and vehicles</p>
                </div>
              </div>
              <Button variant="outline" fullWidth>
                Launch Training
              </Button>
            </div>

            <div className="bg-gradient-to-br from-accent/10 to-success/10 border border-accent/20 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Strategy Guides</h3>
                  <p className="text-sm text-muted-foreground">Advanced tactics and positioning</p>
                </div>
              </div>
              <Button variant="outline" fullWidth>
                View Guides
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Weapon Comparison Panel */}
      <WeaponComparison
        weapons={compareWeapons}
        onRemoveWeapon={handleRemoveFromComparison}
        onClearAll={handleClearComparison}
      />
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              © {new Date()?.getFullYear()} PUBG Tournament Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GameInformationHub;