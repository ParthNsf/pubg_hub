import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityTips = ({ tips }) => {
  const [expandedTip, setExpandedTip] = useState(null);

  const handleToggleExpand = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground flex items-center">
          <Icon name="Users" size={24} className="text-accent mr-3" />
          Community Tips & Strategies
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
        >
          Submit Tip
        </Button>
      </div>
      <div className="grid gap-4">
        {tips?.map((tip) => (
          <div
            key={tip?.id}
            className="bg-card border border-border rounded-xl p-6 gaming-shadow transition-gaming-slow hover:gaming-shadow-green"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                <Image
                  src={tip?.author?.avatar}
                  alt={tip?.author?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-foreground">{tip?.author?.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="text-sm text-muted-foreground">{tip?.author?.rating}</span>
                    </div>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                      {tip?.category}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{tip?.timeAgo}</span>
                </div>

                <h5 className="text-lg font-semibold text-foreground mb-2">{tip?.title}</h5>
                
                <p className="text-muted-foreground mb-4">
                  {expandedTip === tip?.id ? tip?.fullContent : tip?.preview}
                </p>

                {tip?.fullContent?.length > tip?.preview?.length && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleExpand(tip?.id)}
                    iconName={expandedTip === tip?.id ? "ChevronUp" : "ChevronDown"}
                    iconPosition="right"
                    className="mb-4"
                  >
                    {expandedTip === tip?.id ? "Show Less" : "Read More"}
                  </Button>
                )}

                {tip?.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tip?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded border border-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-success transition-gaming">
                      <Icon name="ThumbsUp" size={16} />
                      <span className="text-sm">{tip?.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-gaming">
                      <Icon name="MessageCircle" size={16} />
                      <span className="text-sm">{tip?.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-warning transition-gaming">
                      <Icon name="Share2" size={16} />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-muted"
                    >
                      <Icon name="Bookmark" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-muted"
                    >
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button
          variant="outline"
          iconName="RefreshCw"
          iconPosition="left"
        >
          Load More Tips
        </Button>
      </div>
    </div>
  );
};

export default CommunityTips;