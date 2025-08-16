import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AchievementGallery = ({ achievements }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Achievements', icon: 'Award' },
    { id: 'tournament', name: 'Tournaments', icon: 'Trophy' },
    { id: 'skill', name: 'Skills', icon: 'Target' },
    { id: 'milestone', name: 'Milestones', icon: 'Star' },
    { id: 'special', name: 'Special', icon: 'Crown' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements?.filter(achievement => achievement?.category === selectedCategory);

  const getAchievementRarity = (rarity) => {
    const rarities = {
      'common': 'border-slate-400 bg-slate-400/10 text-slate-400',
      'rare': 'border-primary bg-primary/10 text-primary',
      'epic': 'border-secondary bg-secondary/10 text-secondary',
      'legendary': 'border-warning bg-warning/10 text-warning',
      'mythic': 'border-destructive bg-destructive/10 text-destructive'
    };
    return rarities?.[rarity] || rarities?.common;
  };

  const getRarityIcon = (rarity) => {
    const icons = {
      'common': 'Award',
      'rare': 'Medal',
      'epic': 'Star',
      'legendary': 'Crown',
      'mythic': 'Gem'
    };
    return icons?.[rarity] || 'Award';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 gaming-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4 sm:mb-0">
          <Icon name="Award" size={24} className="text-primary" />
          Achievement Gallery
        </h2>
        
        <div className="text-sm text-muted-foreground">
          {filteredAchievements?.length} of {achievements?.length} achievements
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-gaming ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            {category?.name}
          </button>
        ))}
      </div>
      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements?.map((achievement, index) => (
          <div
            key={index}
            className={`relative bg-muted/30 border-2 rounded-xl p-4 hover:bg-muted/50 transition-gaming group ${
              achievement?.unlocked 
                ? getAchievementRarity(achievement?.rarity)
                : 'border-border/50 bg-muted/10 opacity-60'
            }`}
          >
            {/* Rarity Indicator */}
            <div className="absolute top-2 right-2">
              <Icon 
                name={getRarityIcon(achievement?.rarity)} 
                size={16} 
                className={achievement?.unlocked ? '' : 'text-muted-foreground'} 
              />
            </div>

            {/* Achievement Icon */}
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
                achievement?.unlocked 
                  ? getAchievementRarity(achievement?.rarity)
                  : 'border-border bg-muted/20'
              }`}>
                {achievement?.icon ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={achievement?.icon}
                      alt={achievement?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Icon 
                    name={achievement?.iconName || 'Award'} 
                    size={24} 
                    className={achievement?.unlocked ? '' : 'text-muted-foreground'} 
                  />
                )}
              </div>
            </div>

            {/* Achievement Info */}
            <div className="text-center">
              <h3 className={`font-semibold mb-1 ${
                achievement?.unlocked ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement?.name}
              </h3>
              
              <p className={`text-xs mb-3 ${
                achievement?.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'
              }`}>
                {achievement?.description}
              </p>

              {/* Progress Bar (for incomplete achievements) */}
              {!achievement?.unlocked && achievement?.progress !== undefined && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{achievement?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${achievement?.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Unlock Date */}
              {achievement?.unlocked && achievement?.unlockedDate && (
                <div className="text-xs text-muted-foreground">
                  Unlocked {achievement?.unlockedDate}
                </div>
              )}

              {/* Requirements (for locked achievements) */}
              {!achievement?.unlocked && achievement?.requirement && (
                <div className="text-xs text-muted-foreground">
                  {achievement?.requirement}
                </div>
              )}

              {/* Rarity Badge */}
              <div className="mt-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${
                  achievement?.unlocked 
                    ? getAchievementRarity(achievement?.rarity)
                    : 'bg-muted/20 text-muted-foreground border border-border'
                }`}>
                  {achievement?.rarity}
                </span>
              </div>
            </div>

            {/* Locked Overlay */}
            {!achievement?.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-xl">
                <Icon name="Lock" size={24} className="text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredAchievements?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Award" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Achievements Found</h3>
          <p className="text-muted-foreground">
            No achievements found in the selected category.
          </p>
        </div>
      )}
      {/* Achievement Summary */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {categories?.slice(1)?.map((category) => {
            const categoryAchievements = achievements?.filter(a => a?.category === category?.id);
            const unlockedCount = categoryAchievements?.filter(a => a?.unlocked)?.length;
            
            return (
              <div key={category?.id} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon name={category?.icon} size={16} className="text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {category?.name}
                  </span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  {unlockedCount}/{categoryAchievements?.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.round((unlockedCount / categoryAchievements?.length) * 100) || 0}% complete
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AchievementGallery;